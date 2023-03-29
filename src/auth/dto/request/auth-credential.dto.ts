import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
