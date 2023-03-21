import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';
import { DataSource, Repository } from 'typeorm';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionStatus } from './reception-status.enum';
import { Reception } from './reception.entity';

@Injectable()
export class ReceptionRepository extends Repository<Reception> {
  constructor(
    private dataSource: DataSource,
    private userRepository: UserRepository,
  ) {
    super(Reception, dataSource.createEntityManager());
  }

  async createReception(createReceptionDto: CreateReceptionDto): Promise<void> {
    const {
      masterId,
      name,
      phoneNumber,
      address,
      laundryItem,
      requestMemo,
      collectionDate,
    } = createReceptionDto;

    const user = await this.userRepository.findOne({
      where: { master_id: masterId },
    });

    const reception = this.create({
      name,
      phone_number: phoneNumber,
      address,
      laundry_item: laundryItem,
      request_memo: requestMemo,
      collection_date: collectionDate,
      status: ReceptionStatus.RECEPTION,
      user: user,
    });

    await this.save(reception);
  }
}
