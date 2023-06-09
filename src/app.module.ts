import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { PrismaModule } from './prisma/prisma.module';
import { BankstatemantModule } from './bankstatemant/bankstatemant.module';

@Module({
  imports: [WalletModule, PrismaModule, BankstatemantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
