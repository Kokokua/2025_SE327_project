import { Controller, Get, UseGuards, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards';
import { CurrentUser } from '../common/decorators';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('total')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get total number of users (admin only)' })
  async total() {
    const total = await this.usersService.countAll();
    return { total };
    }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  async remove(@Param('id') id: string) {
    await this.usersService.delete(Number(id));
    return { success: true };
  }
}
