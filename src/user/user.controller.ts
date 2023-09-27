import { Controller, Get, Post, Param, Delete, Body, ParseIntPipe } from '@nestjs/common'; // Import the 'Post' decorator and 'Body' decorator
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users') // This sets the base route for this controller to '/users'
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    let all = this.userService.findAll()
    console.log(all)
    return all;
    // console.log this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post() // Add a POST route for creating users
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
