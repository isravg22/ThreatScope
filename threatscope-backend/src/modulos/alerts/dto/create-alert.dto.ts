import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateAlertDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(['critical', 'high', 'medium', 'low', 'info'])
  priority: string;

  @IsOptional()
  @IsEnum(['pending', 'acknowledged', 'investigating', 'resolved', 'dismissed'])
  status?: string;

  @IsOptional()
  @IsUUID()
  threatId?: string;

  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
