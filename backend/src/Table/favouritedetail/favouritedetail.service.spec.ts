import { Test, TestingModule } from '@nestjs/testing';
import { FavouritedetailService } from './favouritedetail.service';

describe('FavouritedetailService', () => {
  let service: FavouritedetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouritedetailService],
    }).compile();

    service = module.get<FavouritedetailService>(FavouritedetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
