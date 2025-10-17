import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private sourcesRepository: Repository<Source>,
  ) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = this.sourcesRepository.create(createSourceDto);
    return await this.sourcesRepository.save(source);
  }

  async findAll(): Promise<Source[]> {
    return await this.sourcesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Source> {
    const source = await this.sourcesRepository.findOne({
      where: { id },
      relations: ['threats'],
    });

    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }

    return source;
  }

  async update(id: string, updateSourceDto: UpdateSourceDto): Promise<Source> {
    const source = await this.findOne(id);
    Object.assign(source, updateSourceDto);
    return await this.sourcesRepository.save(source);
  }

  async remove(id: string): Promise<void> {
    const source = await this.findOne(id);
    await this.sourcesRepository.remove(source);
  }

  async syncSource(id: string): Promise<Source> {
    const source = await this.findOne(id);
    source.lastSync = new Date();
    return await this.sourcesRepository.save(source);
  }

  async getActiveSource(): Promise<Source[]> {
    return await this.sourcesRepository.find({
      where: { status: 'active' },
    });
  }
}
