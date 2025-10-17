import { Test, TestingModule } from '@nestjs/testing';
import { ThreatsController } from './threats.controller';

describe('ThreatsController', () => {
  let controller: ThreatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreatsController],
    }).compile();

    controller = module.get<ThreatsController>(ThreatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
