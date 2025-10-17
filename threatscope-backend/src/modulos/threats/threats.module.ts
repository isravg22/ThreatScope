import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreatsController } from './threats.controller';
import { ThreatsService } from './threats.service';
import { Threat } from './entities/threat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Threat])],
  controllers: [ThreatsController],
  providers: [ThreatsService],
  exports: [ThreatsService],
})
export class ThreatsModule {}
