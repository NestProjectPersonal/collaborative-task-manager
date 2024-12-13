import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TasksService {

  constructor(

    @InjectRepository(Tasks)
    private readonly tasksRepository:Repository<Tasks>

  ){}


  async create(createTaskDto: CreateTaskDto) {

    const task = this.tasksRepository.create(createTaskDto)
    return this.tasksRepository.save(task)
   
  }

  async findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    const tasks = await this.tasksRepository.find({
      take: limit,
      skip: offset//omitir los primeros(indicativo)
    });

    return tasks;
  }

  findOne(id: string) {
    return this.tasksRepository.findOneBy({ id })
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task)

    return `User with id: ${id} was deleted`
  }
}
