import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: 'admin@gmail.com', description: 'Email de l\'utilisateur a conneter' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({example: 'admin123', description: 'Mot de passe de l\'utilisateur a connecter' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'YBFD&jk9nD12!R7sLx@5fZ#L$5n2Q6rY' })
  readonly accessToken: string;
}
