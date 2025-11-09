import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DepremService } from './deprem.service';
import { Deprem } from './deprem.entity';

@Controller('depremler')
export class DepremController {
  constructor(private readonly depremService: DepremService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDepremler(): Promise<Deprem[]> {
    return await this.depremService.getDepremler();
  }

  @Get('sync')
  @HttpCode(HttpStatus.OK)
  async syncDepremler() {
    await this.depremService.fetchAndSaveDepremler();
    return { message: 'Deprem verileri senkronize edildi.' };
  }
}
