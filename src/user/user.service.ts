import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        // private readonly jwtService: JwtService,
      ) {}
    
      findAll(): Promise<User[]> {
        console.log("-----")
        console.log (this.usersRepository.find())
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
      }

      async update(id: number, updatedData: Partial<User>): Promise<User | null> {
        try {
          // Find the user by ID in the database
          const user = await this.usersRepository.findOne( { where: { id } });
    
          if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
          }
    
          // Update the user's data with the provided updatedData
          this.usersRepository.merge(user, updatedData);
    
          // Save the updated user entity
          const updatedUser = await this.usersRepository.save(user);
    
          return updatedUser;
        } catch (error) {
          // Handle errors, log, and optionally rethrow or return null
          return null;
        }
      }


      async create(user: User): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
      }
      async login(email: string, password: string): Promise<{ message: string }> {
        try {
          const user = await this.usersRepository.findOne({ where: { email } });
    
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
            //   const payload = {id: user.id, email: user.email };
            //   const token = this.jwtService.sign(payload, { expiresIn: '7d' });
    
              return { message: 'Login successful!' };
            }
          }
    
          return { message: 'Invalid credentials!' };
        } catch (error) {
          throw new Error(`Error during login: ${error.message}`);
        }
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }

}