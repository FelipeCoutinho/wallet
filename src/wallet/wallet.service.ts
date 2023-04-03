import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}
  async create(wallet: CreateWalletDto) {
    try {
      return this.walletRepository.create(wallet);
    } catch (error) {
      throw InternalServerErrorException;
    }
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  value = 50;
  getValue(): number {
    //TODO PEGA O VALOR DO BANCO
    return this.value;
  }

  setValue(value) {
    return (this.value += value);
  }
  deposit(value: number): Promise<any> {
    return this.setValue(value);
  }

  withdraw(value: number) {
    if (this.getValue() < value) {
      return `Seu saldo não é suficiente para este saque
              saldo:${this.getValue()}        
              `;
    }
    return {
      saldo: this.getValue() - value,
      saque: value,
    };
  }

  payment(value: number) {
    return value;
  }

  chargeback(value: number) {
    return { ok: true, value: value };
  }
}
