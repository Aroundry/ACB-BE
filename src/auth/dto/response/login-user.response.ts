import { Expose, plainToInstance } from 'class-transformer';

export class LoginUserResponseDto {
  @Expose()
  private accessToken: string;

  static from(data: { accessToken: string }) {
    return plainToInstance(LoginUserResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
