import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Threat } from '../threats/entities/threat.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { Source } from '../sources/entities/source.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Threat)
    private threatsRepository: Repository<Threat>,
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
    @InjectRepository(Source)
    private sourcesRepository: Repository<Source>,
  ) {}

  async getDashboardStats() {
    const [
      totalThreats,
      activeThreats,
      totalAlerts,
      pendingAlerts,
      totalSources,
      activeSources,
    ] = await Promise.all([
      this.threatsRepository.count(),
      this.threatsRepository.count({ where: { status: 'active' } }),
      this.alertsRepository.count(),
      this.alertsRepository.count({ where: { status: 'pending' } }),
      this.sourcesRepository.count(),
      this.sourcesRepository.count({ where: { status: 'active' } }),
    ]);

    return {
      threats: {
        total: totalThreats,
        active: activeThreats,
      },
      alerts: {
        total: totalAlerts,
        pending: pendingAlerts,
      },
      sources: {
        total: totalSources,
        active: activeSources,
      },
    };
  }

  async getThreatsByType() {
    const stats = await this.threatsRepository
      .createQueryBuilder('threat')
      .select('threat.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('threat.type')
      .getRawMany();

    return stats.map((stat) => ({
      type: stat.type,
      count: parseInt(stat.count, 10),
    }));
  }

  async getThreatsBySeverity() {
    const stats = await this.threatsRepository
      .createQueryBuilder('threat')
      .select('threat.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .groupBy('threat.severity')
      .getRawMany();

    return stats.map((stat) => ({
      severity: stat.severity,
      count: parseInt(stat.count, 10),
    }));
  }

  async getThreatsBySource() {
    const stats = await this.threatsRepository
      .createQueryBuilder('threat')
      .leftJoin('threat.source', 'source')
      .select('source.name', 'source')
      .addSelect('COUNT(*)', 'count')
      .groupBy('source.name')
      .getRawMany();

    return stats.map((stat) => ({
      source: stat.source || 'Unknown',
      count: parseInt(stat.count, 10),
    }));
  }

  async getAlertsByPriority() {
    const stats = await this.alertsRepository
      .createQueryBuilder('alert')
      .select('alert.priority', 'priority')
      .addSelect('COUNT(*)', 'count')
      .groupBy('alert.priority')
      .getRawMany();

    return stats.map((stat) => ({
      priority: stat.priority,
      count: parseInt(stat.count, 10),
    }));
  }

  async getAlertsByStatus() {
    const stats = await this.alertsRepository
      .createQueryBuilder('alert')
      .select('alert.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('alert.status')
      .getRawMany();

    return stats.map((stat) => ({
      status: stat.status,
      count: parseInt(stat.count, 10),
    }));
  }

  async getRecentActivity() {
    const recentThreats = await this.threatsRepository.find({
      take: 10,
      order: { createdAt: 'DESC' },
      relations: ['source'],
    });

    const recentAlerts = await this.alertsRepository.find({
      take: 10,
      order: { createdAt: 'DESC' },
      relations: ['threat'],
    });

    return {
      threats: recentThreats,
      alerts: recentAlerts,
    };
  }
}
