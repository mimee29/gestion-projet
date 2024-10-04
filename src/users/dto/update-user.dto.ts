import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from './create-user.dto';

export class UpdateUserDto {
  @ApiProperty({ description: 'Le nom de l\'utilisateur', example: 'admin admin', required: false, })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: 'L\'email de l\'utilisateur', example: 'admin@gmail.com', required: false, })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ description: 'Le mot de passe de l\'utilisateur min(6)',  example: 'admin123', required: false, })
  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;

  @ApiProperty({ description: 'Le rôle de l\'utilisateur', example: 'user', enum: UserRole, required: false,})
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
