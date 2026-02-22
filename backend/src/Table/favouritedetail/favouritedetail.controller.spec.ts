import { Test, TestingModule } from '@nestjs/testing';
import { FavouritedetailController } from './favouritedetail.controller';

describe('FavouritedetailController', () => {
  let controller: FavouritedetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouritedetailController],
    }).compile();

    controller = module.get<FavouritedetailController>(FavouritedetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
