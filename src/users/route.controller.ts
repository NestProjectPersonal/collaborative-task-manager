import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth, GetUser } from './decorators';

import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { UsersService } from './users.service';


@Controller('route')
export class RouteController {

  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }


  @Get('private')
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

