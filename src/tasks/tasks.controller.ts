import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { Auth } from '../users/decorators';
import { ValidRoles } from '../users/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TaskPriority, TaskStatus } from 'src/enums';
import { FilterDto } from 'src/common/dtos/filter.dto';


@Controller('tasks')

export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  //@Auth(ValidRoles.admin) => Segun la sea el requerimiento de proteccion de ruta
  @UseGuards(AuthGuard('jwt')) // Protege la ruta con JWT
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: Express.Request, // El usuario autenticado está disponible aquí
  ) {
    const user = req.user as User; // Extrae el usuario autenticado del request
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllTasks(
    @Query() paginationDto: PaginationDto,) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneTask(@Param('id') id: string, @Request() req: Express.Request) {
    const user = req.user as User;
    return this.tasksService.findOne(id, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findFilter(
    @Query() filterDto: FilterDto,) {
      console.log('Filter DTO:', filterDto);
    return this.tasksService.findFilter(filterDto);
  }


  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: Express.Request,
  ) {
    const user = req.user as User;
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Param('id') id: string, @Request() req: Express.Request) {
    const user = req.user as User;
    return this.tasksService.remove(id, user);
  }
}
