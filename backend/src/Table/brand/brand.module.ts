import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { brand } from './brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([brand])],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
