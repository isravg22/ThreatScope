import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Threat } from '../../threats/entities/threat.entity';
import { User } from '../../users/entities/user.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  message: string;

  @Column({ 
    type: 'enum', 
    enum: ['critical', 'high', 'medium', 'low', 'info'],
    default: 'info'
  })
  priority: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'acknowledged', 'investigating', 'resolved', 'dismissed'],
    default: 'pending'
  })
  status: string;

  @ManyToOne(() => Threat, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'threatId' })
  threat: Threat;

  @Column({ nullable: true })
  threatId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: User;

  @Column({ nullable: true })
  assignedToId: string;

  @Column({ type: 'timestamp', nullable: true })
  acknowledgedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
