import { classToPlain, Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

export default abstract class Base extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUUID() {
    this.id = uuid();
  }
  toJSON() {
    return classToPlain(this);
  }
}
