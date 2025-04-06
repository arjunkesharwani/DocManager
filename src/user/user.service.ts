import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async createUser(
    username: string,
    password: string,
    role: UserRole = UserRole.VIEWER,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { username } });
    return user || undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
