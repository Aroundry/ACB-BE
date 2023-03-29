import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ResponseEntity } from 'src/common/response/response.entity';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionStatusValidationPipe } from './pipes/reception-status-validation.pipe';
import { ReceptionStatus } from './reception-status.enum';
import { ReceptionService } from './reception.service';

@Controller('reception')
export class ReceptionController {
  constructor(private receptionService: ReceptionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createReception(@Body() createReceptionDto: CreateReceptionDto) {
    await this.receptionService.createReception(createReceptionDto);

    return ResponseEntity.OK();
  }

  @Get('/:phonenumber')
  async getCustomerReceptions(@Param('phonenumber') phoneNumber: string) {
    const reception = await this.receptionService.getCustomerReception(
      phoneNumber,
    );

    return ResponseEntity.OK_WITH_DATA(reception);
  }

  @Get('')
  @UseGuards(AuthGuard())
  // @Body() body로 masterId를 가져오는게 처음 방식이었음, 하지만 토큰을 쓰기 때문에 로그인 이후 토큰값을 통해 가져오게함
  async getReceptionsByMaster(@GetUser() user: User) {
    const receptions = await this.receptionService.getReceptionByMaster(
      user.master_id,
    );

    return ResponseEntity.OK_WITH_DATA(receptions);
  }

  @Patch('/:receptionid/status')
  @UseGuards(AuthGuard())
  async updateReceptionStatus(
    @Param('receptionid') receptionId: string,
    @Body('status', ReceptionStatusValidationPipe) status: ReceptionStatus,
  ) {
    const reception = await this.receptionService.updateReceptionStatus(
      receptionId,
      status,
    );

    return ResponseEntity.OK_WITH_DATA(reception);
  }
}
