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
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionStatusValidationPipe } from './pipes/reception-status-validation.pipe';
import { ReceptionStatus } from './reception-status.enum';
import { Reception } from './reception.entity';
import { ReceptionService } from './reception.service';

@Controller('reception')
export class ReceptionController {
  constructor(private receptionService: ReceptionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createReception(
    @Body() createReceptionDto: CreateReceptionDto,
  ): Promise<void> {
    return this.receptionService.createReception(createReceptionDto);
  }

  @Get('/:phonenumber')
  getCustomerReceptions(
    @Param('phonenumber') phoneNumber: string,
  ): Promise<Reception[]> {
    console.log(phoneNumber);
    return this.receptionService.getCustomerReception(phoneNumber);
  }

  @Get('')
  @UseGuards(AuthGuard())
  // @Body() body로 masterId를 가져오는게 처음 방식이었음, 하지만 토큰을 쓰기 때문에 로그인 이후 토큰값을 통해 가져오게함
  getReceptionsByMaster(@GetUser() user: User): Promise<Reception[]> {
    console.log(user.master_id);
    return this.receptionService.getReceptionByMaster(user.master_id);
  }

  @Patch('/:receptionid/status')
  @UseGuards(AuthGuard())
  updateReceptionStatus(
    @Param('receptionid') receptionId: string,
    @Body('status', ReceptionStatusValidationPipe) status: ReceptionStatus,
  ) {
    return this.receptionService.updateReceptionStatus(receptionId, status);
  }
}
