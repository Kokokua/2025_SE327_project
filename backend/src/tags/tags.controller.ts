import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles, Public } from '../common/decorators';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all tags' })
  async findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get tag by ID' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tag (Admin only)' })
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update tag by ID (Admin only)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete tag by ID (Admin only)' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.tagsService.delete(id);
    return { message: 'Tag deleted successfully' };
  }
}

