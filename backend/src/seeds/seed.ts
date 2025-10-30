import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Book } from '../books/entities/book.entity';

type SeedUser = { email: string; password: string; role: 'user' | 'admin' };
type SeedTag = { name: string };
type SeedBook = {
  title: string;
  seller?: string;
  description?: string;
  image?: string;
  price: number;
  discountedPrice?: number | null;
  tags?: string[];
};

function loadEnvFromDotenv() {
  const envPath = path.resolve(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const value = trimmed.slice(idx + 1);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function readJson<T>(fileName: string): T {
  const filePath = path.resolve(__dirname, 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

async function main() {
  loadEnvFromDotenv();

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'bookstore',
    entities: [User, Tag, Book],
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);
  const tagRepo = dataSource.getRepository(Tag);
  const bookRepo = dataSource.getRepository(Book);

  // Seed users
  const users = readJson<SeedUser[]>('users.json');
  for (const u of users) {
    const existing = await userRepo.findOne({ where: { email: u.email } });
    if (existing) continue;
    const hashed = await bcrypt.hash(u.password, 10);
    const user = userRepo.create({ email: u.email, password: hashed, role: u.role });
    await userRepo.save(user);
  }

  // Seed tags
  const tags = readJson<SeedTag[]>('tags.json');
  for (const t of tags) {
    const existing = await tagRepo.findOne({ where: { name: t.name } });
    if (existing) continue;
    await tagRepo.save(tagRepo.create({ name: t.name }));
  }

  // Seed books and relations
  const books = readJson<SeedBook[]>('books.json');
  for (const b of books) {
    const existing = await bookRepo.findOne({ where: { title: b.title } });
    if (existing) continue;
    const imageUrl = b.image ? `/images/${b.image}` : null;
    const book = bookRepo.create({
      title: b.title,
      seller: b.seller || null,
      description: b.description || null,
      price: b.price,
      discountedPrice: b.discountedPrice ?? null,
      imageUrl: imageUrl as any,
    });
    if (b.tags && b.tags.length > 0) {
      book.tags = await tagRepo.find({ where: { name: (b.tags as string[]).map((n) => n) } });
    }
    await bookRepo.save(book);
  }

  await dataSource.destroy();
  console.log('Seeding completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


