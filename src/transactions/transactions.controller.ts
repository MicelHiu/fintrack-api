import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Get()
  getAllTransactions(@CurrentUser() user: { sub: number }) {
    return this.transactionsService.getAllTransactions(user.sub);
  }

  @Get(':id')
  getTransactionById(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { sub: number }) {
    return this.transactionsService.getTransactionById(id, user.sub);
  }

  @Post()
  createTransaction(@Body() dto: CreateTransactionDto, @CurrentUser() user: { sub: number }) {
    return this.transactionsService.createTransactions(dto, user.sub);
  }

  @Patch(':id')
  updateTransaction(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransactionDto, @CurrentUser() user: { sub: number }) {
    return this.transactionsService.updateTransactions(dto, id, user.sub);
  }

  @Delete(':id')
  deleteTransaction(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { sub: number }) {
    return this.transactionsService.deleteTransaction(id, user.sub);
  }
}
