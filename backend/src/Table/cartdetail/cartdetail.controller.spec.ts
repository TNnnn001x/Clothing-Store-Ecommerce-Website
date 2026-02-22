import { Test, TestingModule } from '@nestjs/testing';
import { CartdetailController } from './cartdetail.controller';

describe('CartdetailController', () => {
  let controller: CartdetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartdetailController],
    }).compile();

    controller = module.get<CartdetailController>(CartdetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
