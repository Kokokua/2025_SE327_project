import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const totalAmount = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = this.orderRepository.create({
      userId,
      items: createOrderDto.items,
      totalAmount,
      status: 'pending',
    });

    return this.orderRepository.save(order);
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.findById(id);
    order.status = updateOrderStatusDto.status;
    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<void> {
    const order = await this.findById(id);
    await this.orderRepository.remove(order);
  }

  async getOrderStats(): Promise<{ total: number; recent: Array<{ id: number; userEmail: string; totalAmount: number; createdAt: Date }> }> {
    const total = await this.orderRepository.count();
    const recentOrders = await this.orderRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
    });

    const recent = recentOrders.map((o) => ({
      id: o.id,
      userEmail: o.user?.email ?? '',
      totalAmount: Number(o.totalAmount),
      createdAt: o.createdAt,
    }));

    return { total, recent };
  }

  async getReportStats(): Promise<{ total_orders: number; total_sales: number; total_books_sold: number }> {
    const orders = await this.orderRepository.find();
    const total_orders = orders.length;
    const total_sales = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
    const total_books_sold = orders.reduce((sum, o) => {
      const items = (o.items || []) as Array<{ quantity: number }>;
      return sum + items.reduce((s, it) => s + Number(it.quantity || 0), 0);
    }, 0);

    return { total_orders, total_sales, total_books_sold };
  }
}

