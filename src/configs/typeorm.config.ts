import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import * as fs from 'fs';
import * as config from 'config';
import { Reception } from 'src/reception/reception.entity';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: process.env.RDS_TYPE || dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  ssl: {
    ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}', User, Reception],
  synchronize: process.env.RDS_SYNCHRONIZE || dbConfig.synchronize,
};
