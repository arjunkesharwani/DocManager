import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(documentId: string): Promise<any> {
    try {
      // Replace below URL with actual python service URL
      const url = 'http://localhost:5000/ingest';
      const response = await firstValueFrom(
        this.httpService.post(url, { documentId }),
      );

      this.logger.log(`Ingestion triggered for document ID: ${documentId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Ingestion trigger failed', error.message);
      throw error;
    }
  }
}
