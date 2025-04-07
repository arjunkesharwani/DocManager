import { Controller, Post, Body } from '@nestjs/common';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async trigger(@Body() body: TriggerIngestionDto): Promise<any> {
    const { documentId } = body;
    return await this.ingestionService.triggerIngestion(documentId);
  }
}
