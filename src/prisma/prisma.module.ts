import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService] //eksport global pakai middleware, dieskport biar bisa diimport di product module
})
export class PrismaModule {}
