import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deprem } from './deprem.entity';
import { firstValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DepremService implements OnModuleInit {
  private readonly logger = new Logger(DepremService.name);
  private readonly apiUrl = 'https://deprem-api.vercel.app';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Deprem)
    private readonly depremRepository: Repository<Deprem>,
  ) {}

  async onModuleInit() {
    this.logger.log('🚀 Servis başlatıldı, ilk deprem verileri çekiliyor...');
    await this.fetchAndSaveDepremler();
  }

  async fetchDepremData(): Promise<any[]> {
    try {
      this.logger.log(`🌍 API'den veriler alınıyor: ${this.apiUrl}`);
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));
      return response.data.earthquakes;
    } catch (error) {
      this.logger.error('❌ Deprem verileri çekilemedi:', error);
      return [];
    }
  }

  @Cron('*/1 * * * *')
  async fetchAndSaveDepremler(): Promise<void> {
    try {
      const depremler = await this.fetchDepremData();

      if (!Array.isArray(depremler) || depremler.length === 0) {
        this.logger.warn('⚠️ Son depremler listesi boş döndü.');
        return;
      }

      const bugun = new Date().toISOString().split('T')[0].replace(/-/g, '.');

      const bugunkuDepremler = depremler.filter((deprem) => {
        if (!deprem.date) return false;
        const [tarih] = deprem.date.split(' ');
        return tarih === bugun;
      });

      if (bugunkuDepremler.length === 0) {
        this.logger.warn('⚠️ Bugüne ait deprem bulunamadı.');
        return;
      }

      this.logger.log(
        `📦 ${bugunkuDepremler.length} adet deprem bulundu, veritabanına kaydediliyor...`,
      );

      for (const deprem of bugunkuDepremler) {
        const [tarih, saat] = deprem.date.split(' ');

        if (
          !tarih ||
          !saat ||
          !deprem.latitude ||
          !deprem.longitude ||
          !deprem.depth ||
          !deprem.size?.ml ||
          !deprem.location
        ) {
          this.logger.warn(`Eksik veri atlandı: ${JSON.stringify(deprem)}`);
          continue;
        }

        const existingDeprem = await this.depremRepository.findOne({
          where: { tarih, saat },
        });

        if (!existingDeprem) {
          const newDeprem = this.depremRepository.create({
            tarih,
            saat,
            enlem: deprem.latitude.toString(),
            boylam: deprem.longitude.toString(),
            derinlik: deprem.depth.toString(),
            buyukluk: deprem.size.ml.toString(),
            yer: deprem.location,
          });

          await this.depremRepository.save(newDeprem);
          this.logger.log(
            `✅ Kaydedildi: ${newDeprem.yer} (${newDeprem.buyukluk})`,
          );
        }
      }

      await this.depremRepository.query(
        `DELETE FROM deprem WHERE id NOT IN (SELECT id FROM deprem ORDER BY tarih DESC, saat DESC LIMIT 20)`,
      );

      this.logger.log(
        '🧹 Eski veriler temizlendi, güncel deprem verisi hazır.',
      );
    } catch (error) {
      this.logger.error('❌ Veritabanına kayıt işlemi başarısız:', error);
    }
  }

  async getDepremler(): Promise<Deprem[]> {
    return await this.depremRepository.find({
      order: { tarih: 'DESC', saat: 'DESC' },
    });
  }
}
