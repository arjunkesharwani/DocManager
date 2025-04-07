import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionProcess } from './ingestion-process.entity';
import { User } from '../user/user.entity';
import { Document } from '../document/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngestionProcess, User, Document]),
    HttpModule,
  ],
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
