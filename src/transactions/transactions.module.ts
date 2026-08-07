import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionsRepository } from './transactions.repository';
import { BalanceCalculatorService } from './balance-calculator.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, BalanceCalculatorService, JwtService],
})
export class TransactionsModule {}
