import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { DocumentService } from './document.service';
import { multerConfig } from './multer.config';
import { User, UserRole } from 'src/user/user.entity';

@Controller('documents')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body('description') description: string,
  ) {
    const user = req.user as User;
    return this.documentService.create(file, description, user);
  }

  @Get()
  async getAll(@Req() req: Request) {
    const user = req.user as User;
    return this.documentService.findAll(user);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    const doc = await this.documentService.findOne(id);
    if (!doc) throw new NotFoundException();
    if (doc.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    return doc;
  }

  @Patch(':id')
  async updateDoc(
    @Param('id') id: string,
    @Body('description') description: string,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.documentService.update(id, description, user);
  }

  @Delete(':id')
  async deleteDoc(@Param('id') id: string, @Req() req: Request) {
    const deleted = await this.documentService.delete(id, req.user as User);
    if (!deleted) throw new NotFoundException('Document not found');
    return { message: 'Document deleted successfully' };
  }
}
