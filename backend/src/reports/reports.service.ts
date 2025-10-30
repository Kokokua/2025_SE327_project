import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(dto);
    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async delete(id: number): Promise<void> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    await this.reportRepository.remove(report);
  }
}


