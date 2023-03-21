import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessGuard } from 'src/guards/access.guard';
import { RefreshGuard } from 'src/guards/refresh.guard';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(authCredentialsDto);

    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return { token };
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.cookies['refreshToken']);
    console.log(req['cookies']['refreshToken']);
    const jwtString = req['cookies']['refreshToken'];
    const { userId } = this.authService.verifyRefreshToken(jwtString);
    const accessToken = await this.authService.getAccessToken(userId);
    const refreshToken = await this.authService.getRefreshToken(userId);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return { statusCode: 200, accessToken, refreshToken };
  }

  @Get('/logout')
  @UseGuards(AccessGuard)
  async logoutUser(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('accessToken', {
      maxAge: 0,
    });
    res.cookie('refreshToken', {
      maxAge: 0,
    });

    return { statusCode: 200 };
  }
}
