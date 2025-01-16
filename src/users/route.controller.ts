import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';

import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role/user-role.guard';


@Controller('route')
export class RouteController {

  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('private0')
  @UseGuards(AuthGuard())
  testRoute0() {
    return {
      ok: true,
      message: 'User Login',
    }
  }

  @Get('private1')
  @UseGuards(AuthGuard())
  testRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      message: 'User Login',
      user,
      userEmail,
      rawHeaders
    }
  }


  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.user)
  privateRoute3(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }
}

