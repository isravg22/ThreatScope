import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateThreatDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum([
    'malware',
    'phishing',
    'ransomware',
    'ddos',
    'data_breach',
    'zero_day',
    'apt',
    'other',
  ])
  type: string;

  @IsEnum(['critical', 'high', 'medium', 'low'])
  severity: string;

  @IsOptional()
  @IsEnum(['active', 'monitoring', 'mitigated', 'resolved'])
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  indicators?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  affectedSystems?: string[];

  @IsOptional()
  @IsString()
  cveId?: string;

  @IsOptional()
  @IsString()
  mitigation?: string;

  @IsOptional()
  @IsUUID()
  sourceId?: string;

  @IsOptional()
  @IsDateString()
  detectedAt?: string;
}
