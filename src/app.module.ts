import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ReceptionModule } from './reception/reception.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, ReceptionModule],
})
export class AppModule {}
