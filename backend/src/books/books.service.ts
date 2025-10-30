import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Book } from './entities/book.entity';
import { Tag } from '../tags/entities/tag.entity';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(
    search?: string,
    tagIds?: number[],
    minPrice?: number,
    maxPrice?: number,
  ): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.tags', 'tag');

    if (search) {
      query.andWhere(
        '(book.title LIKE :search OR book.description LIKE :search OR book.seller LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (tagIds && tagIds.length > 0) {
      query.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }

    if (minPrice !== undefined) {
      query.andWhere('book.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('book.price <= :maxPrice', { maxPrice });
    }

    return query.getMany();
  }

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { tagIds, ...bookData } = createBookDto;

    const book = this.bookRepository.create(bookData);

    if (tagIds && tagIds.length > 0) {
      book.tags = await this.tagRepository.findByIds(tagIds);
    }

    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);
    const { tagIds, ...bookData } = updateBookDto;

    Object.assign(book, bookData);

    if (tagIds !== undefined) {
      book.tags = tagIds.length > 0
        ? await this.tagRepository.findByIds(tagIds)
        : [];
    }

    return this.bookRepository.save(book);
  }

  async delete(id: number): Promise<void> {
    const book = await this.findById(id);
    await this.bookRepository.remove(book);
  }
}

