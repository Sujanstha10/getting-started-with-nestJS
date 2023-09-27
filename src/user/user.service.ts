import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      findAll(): Promise<User[]> {
        console.log (this.usersRepository.find())
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
      }
      async create(user: User): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
      }
    
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
