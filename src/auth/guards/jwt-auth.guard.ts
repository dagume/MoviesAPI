import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    // Heredamos lo de AuthGuard('jwt')
    super();
  }
  canActivate(context: ExecutionContext) {
    // validar si viene metedata con decorador public
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    // valida lo que hay en la herencia AuthGuard('jwt')
    return super.canActivate(context);
  }
}
