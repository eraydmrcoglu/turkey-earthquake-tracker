import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DepremModule } from './deprem/deprem.module';
import { Deprem } from './deprem/deprem.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Deprem],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    DepremModule,
  ],
})
export class AppModule {}
