import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.statsService.getDashboardStats();
  }

  @Get('threats/by-type')
  getThreatsByType() {
    return this.statsService.getThreatsByType();
  }

  @Get('threats/by-severity')
  getThreatsBySeverity() {
    return this.statsService.getThreatsBySeverity();
  }

  @Get('threats/by-source')
  getThreatsBySource() {
    return this.statsService.getThreatsBySource();
  }

  @Get('alerts/by-priority')
  getAlertsByPriority() {
    return this.statsService.getAlertsByPriority();
  }

  @Get('alerts/by-status')
  getAlertsByStatus() {
    return this.statsService.getAlertsByStatus();
  }

  @Get('recent-activity')
  getRecentActivity() {
    return this.statsService.getRecentActivity();
  }
}
