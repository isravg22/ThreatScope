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
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.alertsService.findAll({ status, priority });
  }

  @Get('pending')
  getPendingAlerts() {
    return this.alertsService.getPendingAlerts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Post(':id/acknowledge')
  acknowledge(@Param('id') id: string, @Body('userId') userId: string) {
    return this.alertsService.acknowledge(id, userId);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.alertsService.resolve(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.alertsService.remove(id);
  }
}
