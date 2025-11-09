import { Test, TestingModule } from '@nestjs/testing';
import { DepremController } from './deprem.controller';

describe('DepremController', () => {
  let controller: DepremController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepremController],
    }).compile();

    controller = module.get<DepremController>(DepremController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
