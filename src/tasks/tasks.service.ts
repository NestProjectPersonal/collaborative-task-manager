import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {

  constructor(

    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) { }


  async create(createTaskDto: CreateTaskDto, user: User) {
    // Crear la tarea asociada al usuario autenticado
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user, // Relación directa con el usuario autenticado
    });


    return this.tasksRepository.save(task);
  }

  async findAll(user: User) {
    return this.tasksRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) throw new NotFoundException('Task not found');

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) throw new NotFoundException('Task not found');

    const taskid = await this.tasksRepository.remove(task);
    return {
      message: "The task was deleted: ",
    }
  }
}
