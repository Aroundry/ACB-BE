import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionStatus } from './reception-status.enum';
import { Reception } from './reception.entity';
import { ReceptionRepository } from './reception.repository';

@Injectable()
export class ReceptionService {
  constructor(private receptionRepository: ReceptionRepository) {}
  async createReception(createReceptionDto: CreateReceptionDto): Promise<void> {
    return await this.receptionRepository.createReception(createReceptionDto);
  }

  async getCustomerReception(phoneNumber: string): Promise<Reception[]> {
    const query = this.receptionRepository.createQueryBuilder('reception');

    console.log(phoneNumber);
    query.where('reception.phone_number = :phoneNumber', {
      phoneNumber: phoneNumber,
    });

    const customerReceptions = await query.getMany();

    return customerReceptions;
  }

  async getReceptionByMaster(masterId: string): Promise<Reception[]> {
    const query = this.receptionRepository.createQueryBuilder('reception');

    // status 상태에 따라 하기 위해서는 쿼리문을 status 조건을 추가해줘야함
    query.where('reception.master_id = :masterId', {
      masterId: masterId,
    });

    const Receptions = await query.getMany();

    return Receptions;
  }

  async getReceptionById(receptionId: string): Promise<Reception> {
    const foundReception = await this.receptionRepository.findOne({
      where: { reception_id: receptionId },
    });

    if (!foundReception) {
      throw new NotFoundException(
        `Can't find Reception with id ${receptionId}`,
      );
    }

    return foundReception;
  }

  async updateReceptionStatus(
    receptionId: string,
    status: ReceptionStatus,
  ): Promise<Reception> {
    const reception = await this.getReceptionById(receptionId);

    reception.status = status;
    await this.receptionRepository.save(reception);

    return reception;
  }
}
