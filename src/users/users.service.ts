import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserServices');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const user = this.userRepository.create(createUserDto)
      await this.userRepository.save(user)
      return user

    } catch (error) {

      this.handleExceptions(error)

    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto
    const users = await this.userRepository.find({
      take: limit,
      skip: offset//omitir los primeros(indicativo)
    });

    return users;
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
