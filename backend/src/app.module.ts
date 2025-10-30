import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  imports: [
    // TODO: Add ConfigModule for environment variables
    // TODO: Add TypeOrmModule or PrismaModule for database
    // TODO: Add feature modules (users, books, orders, etc.)
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

