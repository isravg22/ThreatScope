import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Source } from '../../sources/entities/source.entity';

@Entity('threats')
export class Threat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  description: string;

  @Column({ 
    type: 'enum', 
    enum: ['malware', 'phishing', 'ransomware', 'ddos', 'data_breach', 'zero_day', 'apt', 'other'],
    default: 'other'
  })
  type: string;

  @Column({ 
    type: 'enum', 
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  })
  severity: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'monitoring', 'mitigated', 'resolved'],
    default: 'active'
  })
  status: string;

  @Column('simple-array', { nullable: true })
  indicators: string[];

  @Column('simple-array', { nullable: true })
  affectedSystems: string[];

  @Column({ nullable: true })
  cveId: string;

  @Column('text', { nullable: true })
  mitigation: string;

  @ManyToOne(() => Source, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sourceId' })
  source: Source;

  @Column({ nullable: true })
  sourceId: string;

  @Column({ type: 'timestamp', nullable: true })
  detectedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
