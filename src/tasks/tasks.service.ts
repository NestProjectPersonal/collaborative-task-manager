import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TaskPriority, TaskStatus } from 'src/enums';
import { FilterDto } from 'src/common/dtos/filter.dto';

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

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto
    const tasks = this.tasksRepository.find({
      take: limit,
      skip: offset//omitir los primeros(indicativo)
    });

    return tasks

  }

  async findOne(id: string, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async findFilter(filterDto: FilterDto) {

    const { status, priority } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    const tasksFilter = await query.getMany();

    return tasksFilter;

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
