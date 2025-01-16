import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'

import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserServices');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto; 

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)
      delete user.password
      return {
        ...user,
        token: this.getJwtToken({id: user.id})
      }

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })
    if (!user) throw new NotFoundException(`Users with id:${id} not found`)

    try {
      await this.userRepository.save(user)
      return user

    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user)

    return `User with id: ${id} was deleted`
  }


  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id:true }
    })
    if (!user)
      throw new UnauthorizedException('Credential are not valid (email)')

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credential are not valid (password)')

    return {
      ...user,
      token: this.getJwtToken({id: user.id})
    }
  }

  private getJwtToken(payload: JwtPayload){

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleExceptions(error: any):never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
