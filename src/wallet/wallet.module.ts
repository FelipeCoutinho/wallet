import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from '../prisma/prisma.service';
import { WalletRepository } from './prisma/wallet.repository';
import { PrismaWalletRepository } from './prisma/prisma.wallet.repository';
import { PrismaTransactionRepository } from '../transactions/prisma.transaction.repository';
import { TransactionRepository } from '../transactions/Transaction.repository';
import { CreditCardRepository } from '../creditcard/creditcard.repository';
import { PrismaCreditCardRepository } from '../creditcard/prisma.creditcard.repository';
import { PaymentService } from '../payment/payment.service';
import { ChargebackService } from '../chargeback/chargeback.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    PrismaService,
    {
      provide: WalletRepository,
      useClass: PrismaWalletRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: CreditCardRepository,
      useClass: PrismaCreditCardRepository,
    },
    PaymentService,
    ChargebackService,
    UserService,
  ],
})
export class WalletModule {}
