import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generatedToken() {
    if (this.token) {
      return;
    }
    this.token = uuidv4();
  }
}

export default UserToken;
