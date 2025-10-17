import { IsString, IsEnum, IsOptional, IsUrl, IsObject } from 'class-validator';

export class CreateSourceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['feed', 'api', 'manual', 'honeypot', 'siem'])
  type: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'error'])
  status?: string;

  @IsOptional()
  @IsObject()
  config?: Record<string, any>;
}
