import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertsRepository.create(createAlertDto);
    return await this.alertsRepository.save(alert);
  }

  async findAll(filters?: {
    status?: string;
    priority?: string;
  }): Promise<Alert[]> {
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.priority) where.priority = filters.priority;

    return await this.alertsRepository.find({
      where,
      relations: ['threat', 'assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Alert> {
    const alert = await this.alertsRepository.findOne({
      where: { id },
      relations: ['threat', 'assignedTo'],
    });

    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }

    return alert;
  }

  async update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    const alert = await this.findOne(id);
    Object.assign(alert, updateAlertDto);
    return await this.alertsRepository.save(alert);
  }

  async remove(id: string): Promise<void> {
    const alert = await this.findOne(id);
    await this.alertsRepository.remove(alert);
  }

  async acknowledge(id: string, userId: string): Promise<Alert> {
    const alert = await this.findOne(id);
    alert.status = 'acknowledged';
    alert.acknowledgedAt = new Date();
    alert.assignedToId = userId;
    return await this.alertsRepository.save(alert);
  }

  async resolve(id: string): Promise<Alert> {
    const alert = await this.findOne(id);
    alert.status = 'resolved';
    alert.resolvedAt = new Date();
    return await this.alertsRepository.save(alert);
  }

  async getPendingAlerts(): Promise<Alert[]> {
    return await this.alertsRepository.find({
      where: { status: 'pending' },
      relations: ['threat'],
      order: { priority: 'DESC', createdAt: 'DESC' },
    });
  }
}
