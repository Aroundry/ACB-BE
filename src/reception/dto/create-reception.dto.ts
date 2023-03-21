import { IsNotEmpty } from 'class-validator';

export class CreateReceptionDto {
  @IsNotEmpty()
  masterId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  laundryItem: string;

  @IsNotEmpty()
  requestMemo: string;

  @IsNotEmpty()
  collectionDate: string;
}
