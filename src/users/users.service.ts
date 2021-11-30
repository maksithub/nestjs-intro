import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(name?: string): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByid(userId: number): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(userId);
      return user;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newuser = this.usersRepository.create(createUserDto); // const newUser =  new User(); newUser.name = name
    return this.usersRepository.save(newuser); //INSERT
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.findByid(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findByid(id);
    return this.usersRepository.remove(user);
  }
}
