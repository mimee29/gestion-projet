import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
 
export class CreateUserDto {
  @ApiProperty({ description: 'Le nom de l\'utilisateur', example: 'Admin Admin',})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'L\'email de l\'utilisateur', example: 'admin@gmail.com',})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Le mot de passe de l\'utilisateur', example: 'admin123', })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ description: 'Le rôle de l\'utilisateur', example: 'user', enum: UserRole, })
  @IsNotEmpty()
  @IsEnum(UserRole)
  readonly role: UserRole;
}
