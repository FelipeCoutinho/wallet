import { Controller, Get, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  chargebackDTO,
  paymentDTO,
} from './dto/create-wallet.dto';
import { PaymentService } from '../payment/payment.service';
import { ChargebackService } from '../chargeback/chargeback.service';
import { UserService } from '../user/user.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService,
    private readonly chargebackService: ChargebackService,
    private readonly userService: UserService,
  ) {}

  @Get('/list')
  async walletList() {
    try {
      return this.walletService.list();
    } catch (error) {
      return error.stack;
    }
  }
  @Post()
  creat(@Body() body: CreateWalletDto) {
    try {
      return Promise.all([this.walletService.create(body)]);
    } catch (error) {
      return error.stack;
    }
  }
  @Post('createUser')
  creatUser(@Body() body) {
    try {
      return Promise.all([this.userService.createUser(body)]);
    } catch (error) {
      return error.stack;
    }
  }
  @Get('/users')
  async userList() {
    try {
      return this.userService.list();
    } catch (error) {
      return error.stack;
    }
  }

  @Post('/deposit')
  async deposit(@Body() body: any) {
    try {
      const { walletId, amount } = body;
      return this.walletService.deposit(walletId, amount);
    } catch (error) {
      return error;
    }
  }

  @Get('/withdraw')
  async withdraw(@Body() body: any) {
    try {
      const { walletId, amount } = body;
      return this.walletService.withdraw(walletId, amount);
    } catch (error) {
      return error.stack;
    }
  }

  @Post('/payment')
  payment(@Body() payment: paymentDTO) {
    try {
      return this.paymentService.handlerPayment(
        payment.walletId,
        payment.amount,
        payment.typePayment,
      );
    } catch (error) {
      return error;
    }
  }

  @Post('chargeback')
  chargeback(@Body() chargeback: chargebackDTO) {
    try {
      return this.chargebackService.handlerChargeback(
        chargeback.walletId,
        chargeback.amount,
        chargeback.typePayment,
      );
    } catch (error) {
      return error.stack;
    }
  }
}
