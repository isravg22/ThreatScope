import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Threat } from './entities/threat.entity';
import { CreateThreatDto } from './dto/create-threat.dto';
import { UpdateThreatDto } from './dto/update-threat.dto';

@Injectable()
export class ThreatsService {
  constructor(
    @InjectRepository(Threat)
    private threatsRepository: Repository<Threat>,
  ) {}

  async create(createThreatDto: CreateThreatDto): Promise<Threat> {
    const threat = this.threatsRepository.create(createThreatDto);
    return await this.threatsRepository.save(threat);
  }

  async findAll(filters?: {
    type?: string;
    severity?: string;
    status?: string;
    search?: string;
  }): Promise<Threat[]> {
    const where: FindOptionsWhere<Threat> = {};

    if (filters?.type) where.type = filters.type;
    if (filters?.severity) where.severity = filters.severity;
    if (filters?.status) where.status = filters.status;
    if (filters?.search) {
      return await this.threatsRepository.find({
        where: [
          { title: Like(`%${filters.search}%`) },
          { description: Like(`%${filters.search}%`) },
        ],
        relations: ['source'],
        order: { createdAt: 'DESC' },
      });
    }

    return await this.threatsRepository.find({
      where,
      relations: ['source'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Threat> {
    const threat = await this.threatsRepository.findOne({
      where: { id },
      relations: ['source'],
    });

    if (!threat) {
      throw new NotFoundException(`Threat with ID ${id} not found`);
    }

    return threat;
  }

  async update(id: string, updateThreatDto: UpdateThreatDto): Promise<Threat> {
    const threat = await this.findOne(id);
    Object.assign(threat, updateThreatDto);
    return await this.threatsRepository.save(threat);
  }

  async remove(id: string): Promise<void> {
    const threat = await this.findOne(id);
    await this.threatsRepository.remove(threat);
  }

  async getStatsByType(): Promise<any> {
    const stats = await this.threatsRepository
      .createQueryBuilder('threat')
      .select('threat.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('threat.type')
      .getRawMany();

    return stats;
  }

  async getStatsBySeverity(): Promise<any> {
    const stats = await this.threatsRepository
      .createQueryBuilder('threat')
      .select('threat.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .groupBy('threat.severity')
      .getRawMany();

    return stats;
  }

  async getRecentThreats(limit: number = 10): Promise<Threat[]> {
    return await this.threatsRepository.find({
      relations: ['source'],
      order: { detectedAt: 'DESC' },
      take: limit,
    });
  }
}
