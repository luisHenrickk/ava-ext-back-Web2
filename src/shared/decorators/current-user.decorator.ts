import { Usuario } from './../../usuario/entities/usuario.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUsuario = createParamDecorator(
  (data: never, ctx: ExecutionContext): Usuario => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
