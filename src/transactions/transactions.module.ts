import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionsRepository } from './transactions.repository';
import { BalanceCalculatorService } from './balance-calculator.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, BalanceCalculatorService],
})
export class TransactionsModule {}
