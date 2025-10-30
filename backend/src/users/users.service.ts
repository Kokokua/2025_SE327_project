import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
    });
  }

  async countAll(): Promise<number> {
    return this.userRepository.count();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: 'user',
    });
    return this.userRepository.save(user);
  }

  async updateRole(id: number, role: string): Promise<User> {
    const user = await this.findById(id);
    user.role = role;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}
