import { Entity, Column, ManyToOne } from 'typeorm';
import { Post, User } from '.';

import Base from './Base';

@Entity('likes')
export default class Like extends Base {
  @Column()
  liker: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;
}
