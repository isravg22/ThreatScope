import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ThreatsService } from './threats.service';
import { CreateThreatDto } from './dto/create-threat.dto';
import { UpdateThreatDto } from './dto/update-threat.dto';

@Controller('threats')
export class ThreatsController {
  constructor(private readonly threatsService: ThreatsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createThreatDto: CreateThreatDto) {
    return this.threatsService.create(createThreatDto);
  }

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('severity') severity?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.threatsService.findAll({ type, severity, status, search });
  }

  @Get('stats/by-type')
  getStatsByType() {
    return this.threatsService.getStatsByType();
  }

  @Get('stats/by-severity')
  getStatsBySeverity() {
    return this.threatsService.getStatsBySeverity();
  }

  @Get('recent')
  getRecentThreats(@Query('limit') limit?: string) {
    return this.threatsService.getRecentThreats(
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreatDto: UpdateThreatDto) {
    return this.threatsService.update(id, updateThreatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.threatsService.remove(id);
  }
}

