import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { IngestionProcess, status } from './ingestion-process.entity';
import { Repository } from 'typeorm';
import { Document } from '../document/document.entity';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    @InjectRepository(IngestionProcess)
    private ingestionRepo: Repository<IngestionProcess>,
    @InjectRepository(Document)
    private documentRepo: Repository<Document>,
    private readonly httpService: HttpService,
  ) {}

  async triggerIngestion(
    documentId: string,
    triggeredBy: string,
  ): Promise<any> {
    const document = await this.documentRepo.findOne({
      where: { id: documentId },
    });
    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    const ingestion = this.ingestionRepo.create({
      document,
      status: status.IN_PROGRESS,
      triggeredBy,
    });
    try {
      this.logger.log(`Ingestion triggered for document ID: ${documentId}`);
      await this.ingestionRepo.save(ingestion);

      // Replace below URL with actual python service URL
      const url = 'http://localhost:5000/ingest';
      const response = await firstValueFrom(
        this.httpService.post(url, { documentId }),
      );

      ingestion.status = status.COMPLETED;
      await this.ingestionRepo.save(ingestion);

      return { message: 'Ingestion completed', data: response.data };
    } catch (error) {
      ingestion.status = status.FAILED;
      ingestion.errorMessage = error.message;
      await this.ingestionRepo.save(ingestion);
      this.logger.error('Ingestion trigger failed', error.message);
      throw error;
    }
  }

  async getAllIngestions() {
    return this.ingestionRepo.find({ order: { updatedAt: 'DESC' } });
  }

  async getIngestionByDocumentId(documentId: string) {
    return this.ingestionRepo.find({
      where: {
        document: {
          id: documentId,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }
}
