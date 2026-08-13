import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body, UseGuards  } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
    @Roles('admin')
    @Get() 
    getAllAccounts(@CurrentUser() user: { sub: number }) {
      return this.accountsService.getAllAccounts();
    }

    @Get(':id')
    getAccountById(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { sub: number }) {
      return this.accountsService.getAccountById(id, user.sub);
    }

    @Post()
    createAccount(@CurrentUser() user: { sub: number }, @Body()dto: CreateAccountDto) {
      return this.accountsService.createAccount(user.sub, dto);
    }

    @Patch(':id')
    updateAccount(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccountDto, @CurrentUser() user: { sub: number }) {
      return this.accountsService.updateAccount(dto, id, user.sub);
    }

    @Delete(':id')
    deleteAccount(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { sub: number }) {
      return this.accountsService.deleteAccount(id, user.sub);
    }
}
