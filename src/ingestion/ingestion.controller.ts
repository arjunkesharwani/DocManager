import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';
import { IngestionService } from './ingestion.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Controller('ingestion')
@UseGuards(AuthGuard('jwt'))
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async trigger(
    @Req() req: Request,
    @Body() body: TriggerIngestionDto,
  ): Promise<any> {
    const user = req.user as User;
    const { id } = user;
    const { documentId } = body;
    return await this.ingestionService.triggerIngestion(documentId, id);
  }

  @Get()
  async getAll() {
    return this.ingestionService.getAllIngestions();
  }

  @Get('by-document')
  async getByDocument(@Query('documentId') documentId: string) {
    return this.ingestionService.getIngestionByDocumentId(documentId);
  }
}
