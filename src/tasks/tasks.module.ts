import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Tasks
    ]),
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports:[
    TasksService,
    TypeOrmModule
  ]
})
export class TasksModule {}
