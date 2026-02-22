import { Module } from '@nestjs/common';
import { StyleController } from './style.controller';
import { StyleService } from './style.service';
import { style } from './style.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([style])],
  controllers: [StyleController],
  providers: [StyleService]
})
export class StyleModule {}
