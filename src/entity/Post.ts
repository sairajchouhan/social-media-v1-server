import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import Base from './Base';
import User from './User';
import Comment from './Comment';
import Like from './Like';

@Entity('posts')
export default class Post extends Base {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
