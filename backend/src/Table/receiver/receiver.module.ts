import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { receiver } from './receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([receiver])],
  controllers: [ReceiverController],
  providers: [ReceiverService]
})
export class ReceiverModule {}
