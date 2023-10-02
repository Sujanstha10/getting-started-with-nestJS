import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Put,
} from '@nestjs/common'; // Import the 'Post' decorator and 'Body' decorator
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users') // This sets the base route for this controller to '/users'
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    let all = this.userService.findAll();
    return all;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post() // Add a POST route for creating users
  async create(@Body() user: User): Promise<User> {
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

     user.password = hash

    return this.userService.create(user);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUser: User) {
    // Pass the id and updateUser object to your service method
    const updatedUser = await this.userService.update(id, updateUser);
    return updatedUser; // You can return the updated user or an appropriate response
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
