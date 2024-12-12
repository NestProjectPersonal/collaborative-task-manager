import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
    ]),
    PassportModule.register({ defaultStrategy:'jwt'}),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          singOptions: {
            expiresIn: '2h'
          } 
        }
      }
    })
  ],
  exports: [
    UsersService,
    TypeOrmModule,
    PassportModule,
    JwtModule,
    JwtStrategy
  ]
})
export class UsersModule {}
