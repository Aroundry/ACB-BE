import { Expose, plainToInstance } from 'class-transformer';

export class RefreshResponseDto {
  @Expose()
  private accessToken: string;

  static from(data: { accessToken: string }) {
    return plainToInstance(RefreshResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
