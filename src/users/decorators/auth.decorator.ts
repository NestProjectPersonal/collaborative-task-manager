import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from "../interfaces";
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';




export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected( ...roles ),
      UseGuards(AuthGuard()),

    );
  }