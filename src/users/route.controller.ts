import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth, GetUser } from './decorators';

import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('route')
export class RouteController {

  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('private1')
  @UseGuards(AuthGuard())
  testRoute(
    @GetUser() user: User
  ){
    
    return {
      ok: true,
      message: 'Mostrar User',
      user
    }
  }


  @Get('private2')
  @Auth(ValidRoles.admin)
  privateRoute(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

}

