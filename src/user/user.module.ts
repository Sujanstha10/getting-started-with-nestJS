import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]),UsersModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],

  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}