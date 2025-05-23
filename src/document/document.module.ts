import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { User } from '../user/user.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
