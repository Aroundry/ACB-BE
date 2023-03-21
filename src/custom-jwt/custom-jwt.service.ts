import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class CustomJwtService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(userId: string) {
    const token = this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_ACCESS_SECRET || jwtConfig.accessSecret,
        expiresIn:
          process.env.JWT_ACCESS_EXPIRESIN || jwtConfig.accessExpiresIn,
      },
    );
    return token;
  }

  async createRefreshToken(userId: string) {
    const token = this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_REFRESH_SECRET || jwtConfig.refreshSecret,
        expiresIn:
          process.env.JWT_REFRESH_EXPIRESIN || jwtConfig.refreshExpiresIn,
      },
    );
    return token;
  }

  verifyAccessToken(jwtString: string) {
    const payload = this.jwtService.verify(jwtString, {
      secret: process.env.JWT_ACCESS_SECRET || jwtConfig.accessSecret,
    });
    const { userId } = payload;
    return { userId };
  }

  verifyRefreshToken(jwtString: string) {
    const payload = this.jwtService.verify(jwtString, {
      secret: process.env.JWT_REFRESH_SECRET || jwtConfig.refreshSecret,
    });
    const { userId } = payload;
    return { userId };
  }
}
