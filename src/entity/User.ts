import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

import Base from './Base';
import Comment from './Comment';
import Post from './Post';
import Like from './Like';
import { Profile } from '.';

@Entity('users')
export default class User extends Base {
  @Length(3, 255)
  @Index()
  @Column({ unique: true })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Length(6, 255)
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
