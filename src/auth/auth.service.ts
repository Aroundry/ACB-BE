import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: CustomJwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ statusCode: number; message: string }> {
    await this.userRepository.createUser(authCredentialsDto);
    return { statusCode: 200, message: 'login success' };
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
    statusCode: number;
    accessToken: string;
    refreshToken: string;
  }> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login failed');
    }
    const accessToken = await this.getAccessToken(userId);
    const refreshToken = await this.getRefreshToken(userId);
    return { statusCode: 200, accessToken, refreshToken };

    // ToDo 추후 Redis 연결시 토큰 캐싱 추가
  }

  async getAccessToken(userId: string) {
    const token = await this.jwtService.createAccessToken(userId);
    return token;
  }

  async getRefreshToken(userId: string) {
    const token = await this.jwtService.createRefreshToken(userId);
    return token;
  }

  verifyAccessToken(jwtString: string) {
    const payload = this.jwtService.verifyAccessToken(jwtString);
    return payload;
  }

  verifyRefreshToken(jwtString: string) {
    const payload = this.jwtService.verifyRefreshToken(jwtString);
    return payload;
  }
}
