import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CurrentUsuario, IsPublic } from 'src/shared/decorators';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@CurrentUsuario() usuario: Usuario) {
    return this.authService.login(usuario);
  }

  @Get('user')
  getUser(@CurrentUsuario() user: Usuario) {
    return user;
  }
}
