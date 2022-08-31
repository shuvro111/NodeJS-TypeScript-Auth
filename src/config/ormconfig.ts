import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import User from '../user/entities/User';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  subscribers: [],
};

export const AppDataSource = new DataSource(options);
