import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import * as fs from 'fs';
import * as config from 'config';
import { Reception } from 'src/reception/reception.entity';

// const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME,
  port: parseInt(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}', User, Reception],
  synchronize: true,
};
