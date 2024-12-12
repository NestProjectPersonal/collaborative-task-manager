import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser } from './decorators';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

@Patch(':id')
update(
  @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
  
 @Post('login')
 loginUser(@Body() loginUserDto: LoginUserDto) {
   return this.usersService.login(loginUserDto);
  }
  
  /* 
  @Get('privateroute')
  @Auth(ValidRoles.admin)
  privateRoute(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }
  
  @Get(':ruta')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {

  return {
      ok: true,
      message: 'hola',
      
      
    }
  }
  */

}

