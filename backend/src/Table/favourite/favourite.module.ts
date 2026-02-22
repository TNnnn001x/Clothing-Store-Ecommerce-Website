import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';
import { favourite } from './favourite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([favourite])],
  controllers: [FavouriteController],
  providers: [FavouriteService]
})
export class FavouriteModule {}
