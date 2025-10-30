import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findById(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: { name: createTagDto.name },
    });
    if (existingTag) {
      throw new ConflictException('Tag already exists');
    }

    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findById(id);
    Object.assign(tag, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async delete(id: number): Promise<void> {
    const tag = await this.findById(id);
    await this.tagRepository.remove(tag);
  }
}

