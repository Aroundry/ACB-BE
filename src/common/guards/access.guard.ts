import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CustomJwtService } from 'src/common/custom-jwt/custom-jwt.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private jwtService: CustomJwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(req: Request) {
    const jwtString = req.cookies['accessToken'];
    if (!jwtString) {
      return false;
    }
    this.jwtService.verifyAccessToken(jwtString);
    return true;
  }
}
