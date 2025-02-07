import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

export function AuthController(
  controllerName: string,
) {
  return applyDecorators(
    Controller(controllerName),
    UseGuards(
      AuthGuard('jwt'),
      RolesGuard
    ),
  );
}
