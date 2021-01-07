import { Entity, Column } from 'typeorm';

import Base from './Base';

@Entity('profile')
export default class Profile extends Base {
  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  photo: string;
}
