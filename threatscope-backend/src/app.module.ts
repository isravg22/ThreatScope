import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AlertsModule } from './modulos/alerts/alerts.module';
import { AuthModule } from './modulos/auth/auth.module';
import { UsersModule } from './modulos/users/users.module';
import { ThreatsModule } from './modulos/threats/threats.module';
import { SourcesModule } from './modulos/sources/sources.module';
import { StatsModule } from './modulos/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'threatscope',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    ThreatsModule,
    SourcesModule,
    AlertsModule,
    StatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
