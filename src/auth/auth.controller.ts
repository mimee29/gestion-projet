import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponseDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: 'Connexion de l\'utilisateur' })
  @ApiBody({type: LoginDto})
  @ApiResponse({ status: 201, description: 'Utilisateur connecté avec succès.' })
  @ApiResponse({ status: 401, description: 'Échec de l\'authentification.' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
}
