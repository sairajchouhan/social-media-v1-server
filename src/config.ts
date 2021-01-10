// Config that is common to more than one part of the app.

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Comment, Like, Post, Profile, User } from './entity';

const devConnection: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'aunzbedi',
  database: 'sm1',
  synchronize: true,
  logging: false,
  entities: [Comment, Like, Post, Profile, User],
};

export { devConnection };
