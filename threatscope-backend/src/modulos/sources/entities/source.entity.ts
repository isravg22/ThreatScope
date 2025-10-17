import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Threat } from '../../threats/entities/threat.entity';

@Entity('sources')
export class Source {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 150 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: ['feed', 'api', 'manual', 'honeypot', 'siem'],
    default: 'feed'
  })
  type: string;

  @Column({ length: 500, nullable: true })
  url: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'error'],
    default: 'active'
  })
  status: string;

  @Column('simple-json', { nullable: true })
  config: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  lastSync: Date;

  @Column({ default: 0 })
  totalThreats: number;

  @OneToMany(() => Threat, threat => threat.source)
  threats: Threat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
