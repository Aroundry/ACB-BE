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
import { AccessGuard } from 'src/common/guards/access.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';
import { ResponseEntity } from 'src/common/response/response.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/request/auth-credential.dto';
import { LoginUserResponseDto } from './dto/response/login-user.response';
import { RefreshResponseDto } from './dto/response/refresh.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    await this.authService.signUp(authCredentialsDto);

    return ResponseEntity.OK();
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signIn(authCredentialsDto);
    const loginUserResponseDto = LoginUserResponseDto.from({
      accessToken: data.accessToken,
    });

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return ResponseEntity.OK_WITH_DATA(loginUserResponseDto);
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwtString = req['cookies']['refreshToken'];
    const { userId } = this.authService.verifyRefreshToken(jwtString);
    const accessToken = await this.authService.getAccessToken(userId);
    const refreshToken = await this.authService.getRefreshToken(userId);
    const refreshResponseDto = RefreshResponseDto.from({ accessToken });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return ResponseEntity.CREATED_WITH_DATA(refreshResponseDto);
  }

  @Get('/logout')
  @UseGuards(AccessGuard)
  async logoutUser(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('refreshToken', {
      maxAge: 0,
    });

    return ResponseEntity.OK();
  }
}
