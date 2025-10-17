import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  @IsOptional()
  @IsDateString()
  acknowledgedAt?: string;

  @IsOptional()
  @IsDateString()
  resolvedAt?: string;
}
