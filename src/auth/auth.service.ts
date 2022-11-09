import { Usuario } from './../usuario/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserToken } from './models/user-token.model';
import { UsuarioPayload } from './models/user-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<Usuario> {
    const user = await this.usuarioService.findByEmail(email, true);

    if (user) {
      const isPasswordValid = await compareSync(pass, user.senha);
      if (isPasswordValid) {
        const { senha, ...result } = user;
        return result as Usuario;
      }
    }

    return null;
  }

  async login(user: Usuario): Promise<UserToken> {
    const payload: UsuarioPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
    };
  }
}
