import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deprem } from './deprem.entity';
import { DepremService } from './deprem.service';
import { DepremController } from './deprem.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Deprem]), HttpModule],
  providers: [DepremService],
  controllers: [DepremController],
})
export class DepremModule {}
