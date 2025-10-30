import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { UsersService } from '../users/users.service';
import { OrdersService } from '../orders/orders.service';
import { BooksService } from '../books/books.service';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly booksService: BooksService,
  ) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Update user role (Admin only)' })
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: string,
  ) {
    return this.usersService.updateRole(id, role);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  async getAllOrders() {
    return this.ordersService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get aggregated stats (Admin only)' })
  async stats() {
    const [usersTotal, booksTotal, report] = await Promise.all([
      this.usersService.countAll(),
      this.booksService.countAll(),
      this.ordersService.getReportStats(),
    ]);
    return {
      usersTotal,
      booksTotal,
      ordersTotal: report.total_orders,
      totalSales: report.total_sales,
      totalBooksSold: report.total_books_sold,
    };
  }
}

