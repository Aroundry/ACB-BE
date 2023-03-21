import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ReceptionStatus } from '../reception-status.enum';

export class ReceptionStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    ReceptionStatus.RECEPTION,
    ReceptionStatus.COMPLETE,
    ReceptionStatus.REMOVE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
