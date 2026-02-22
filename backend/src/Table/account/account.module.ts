import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { account } from './account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([account])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService, TypeOrmModule],
})
export class AccountModule {}
