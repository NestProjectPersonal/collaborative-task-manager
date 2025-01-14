import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/users/entities/user.entity';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
