import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id/role')
  @Roles(UserRole.ADMIN)
  async updateUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
    const updated = await this.userService.updateRole(id, role);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.userService.deleteUser(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
