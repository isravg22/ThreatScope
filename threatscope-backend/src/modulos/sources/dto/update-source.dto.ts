import { PartialType } from '@nestjs/mapped-types';
import { CreateSourceDto } from './create-source.dto';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateSourceDto extends PartialType(CreateSourceDto) {
  @IsOptional()
  @IsDateString()
  lastSync?: string;

  @IsOptional()
  @IsNumber()
  totalThreats?: number;
}
