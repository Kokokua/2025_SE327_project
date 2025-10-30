import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [UsersModule, OrdersModule, BooksModule],
  controllers: [AdminController],
})
export class AdminModule {}

