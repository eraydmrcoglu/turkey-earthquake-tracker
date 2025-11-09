import { Test, TestingModule } from '@nestjs/testing';
import { DepremService } from './deprem.service';

describe('DepremService', () => {
  let service: DepremService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepremService],
    }).compile();

    service = module.get<DepremService>(DepremService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
