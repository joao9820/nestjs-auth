import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

//O guardião funciona quando o usuário já tem acesso a aplicação, e precisamos validar o seu acesso pela controller
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //extraindo metadata de role
    //O contexto é a instância do controller
    //Guard serve para fazer validações antes de chegar na controller
    //O CanActivate exige que a resposta seja um boolean, para continuar a ação do controller, se false bloqueia o acesso
    const role = this.reflector.get('role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return user.role === role;
  }
}
