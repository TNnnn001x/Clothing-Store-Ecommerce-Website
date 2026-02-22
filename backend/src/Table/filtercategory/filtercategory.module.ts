import { Module } from '@nestjs/common';
import { FiltercategoryController } from './filtercategory.controller';
import { FiltercategoryService } from './filtercategory.service';
import { filtercategory } from './filtercategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([filtercategory])],
  controllers: [FiltercategoryController],
  providers: [FiltercategoryService]
})
export class FiltercategoryModule {}
