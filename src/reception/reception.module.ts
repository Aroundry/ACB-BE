import { Module } from '@nestjs/common';
import { ReceptionController } from './reception.controller';
import { Reception } from './reception.entity';
import { ReceptionService } from './reception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionRepository } from './reception.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reception]), AuthModule],
  controllers: [ReceptionController],
  providers: [ReceptionService, ReceptionRepository, UserRepository],
  exports: [ReceptionService, ReceptionRepository],
})
export class ReceptionModule {}
