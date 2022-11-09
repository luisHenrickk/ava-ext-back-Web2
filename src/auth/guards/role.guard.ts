import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const total_roles = roles.filter((role) => role === user.role);
    if (total_roles.length >= 1) {
      return true;
    } else {
      return false;
    }
  }
}
