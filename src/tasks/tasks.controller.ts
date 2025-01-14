import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/users/entities/user.entity';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
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
    @Request() req: Express.Request) {
    const user = req.user as User;
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneTask(@Param('id') id: string, @Request() req: Express.Request) {
    const user = req.user as User;
    return this.tasksService.findOne(id, user);
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
