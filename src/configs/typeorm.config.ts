import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Reception } from 'src/reception/reception.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT as any,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  entities: [User, Reception],
  synchronize: true,
};
