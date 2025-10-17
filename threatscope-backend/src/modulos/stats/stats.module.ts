import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Threat } from '../threats/entities/threat.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { Source } from '../sources/entities/source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Threat, Alert, Source])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
