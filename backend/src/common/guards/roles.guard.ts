import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Role-based Authorization Guard
 * Checks if user has required roles to access endpoint
 * Usage: @Roles('admin', 'user')
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      return false; // No user in request, deny access
    }

    // Check if user has at least one of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}

