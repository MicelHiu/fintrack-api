import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body  } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
    @Get() 
    getAllAccounts() {
      return this.accountsService.getAllAccounts();
    }

    @Get(':id')
    getAccountById(@Param('id', ParseIntPipe) id: number) {
      return this.accountsService.getAccountById(id);
    }

    @Post()
    createAccount(dto: CreateAccountDto) {
      return this.accountsService.createAccount(dto);
    }

    @Patch(':id')
    updateAccount(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccountDto) {
      return this.accountsService.updateAccount(dto, id);
    }

    @Delete(':id')
    deleteAccount(@Param('id', ParseIntPipe) id: number) {
      return this.accountsService.deleteAccount(id);
    }
}
