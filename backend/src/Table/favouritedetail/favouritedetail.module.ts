import { Module } from '@nestjs/common';
import { FavouritedetailController } from './favouritedetail.controller';
import { FavouritedetailService } from './favouritedetail.service';
import { favouritedetail } from './favouritedetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([favouritedetail])],
  controllers: [FavouritedetailController],
  providers: [FavouritedetailService]
})
export class FavouritedetailModule {}
