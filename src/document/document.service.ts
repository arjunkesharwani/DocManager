import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private docRepo: Repository<Document>,
  ) {}

  async create(file: Express.Multer.File, description: string, user: User) {
    const doc = this.docRepo.create({
      filename: file.filename,
      originalName: file.originalname,
      description,
      owner: user,
    });
    return this.docRepo.save(doc);
  }

  async findAll(user: User) {
    return user.role === UserRole.ADMIN
      ? this.docRepo.find({ relations: ['owner'] })
      : this.docRepo.find({ where: { owner: { id: user.id } } });
  }

  async findOne(id: string) {
    return this.docRepo.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async update(id: string, description: string, user: User) {
    const doc = await this.findOne(id);
    if (!doc) return null;
    if (doc.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    doc.description = description;
    return this.docRepo.save(doc);
  }

  async delete(id: string, user: User) {
    const doc = await this.findOne(id);
    if (!doc) return null;
    if (doc.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    await this.docRepo.softDelete(id);
    return true;
  }
}
