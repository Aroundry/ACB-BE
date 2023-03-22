import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
// import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userId } = payload;
    const user: User = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
