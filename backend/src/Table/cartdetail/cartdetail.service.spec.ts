import { Test, TestingModule } from '@nestjs/testing';
import { CartdetailService } from './cartdetail.service';

describe('CartdetailService', () => {
  let service: CartdetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartdetailService],
    }).compile();

    service = module.get<CartdetailService>(CartdetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
