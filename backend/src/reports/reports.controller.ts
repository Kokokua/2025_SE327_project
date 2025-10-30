import { Controller, Post, Body, Get, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto';
import { Public, Roles } from '../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../common/guards';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Submit a report/feedback (public)' })
  async create(@Body() dto: CreateReportDto) {
    return this.reportsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all reports (Admin only)' })
  async findAll() {
    return this.reportsService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a report (Admin only)' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.reportsService.delete(id);
    return { success: true };
  }
}


