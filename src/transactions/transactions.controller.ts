import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Get()
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get(':id') 
  getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTransactionById(id);
  }
}
