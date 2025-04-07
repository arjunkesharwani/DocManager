import { IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateRoleDto {
  @IsEnum(UserRole, { message: 'Role must be admin, editor, or viewer' })
  role: UserRole;
}
