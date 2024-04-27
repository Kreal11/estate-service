// import { User } from 'src/user/entities/user.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  //   JoinColumn,
  //   ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Estate {
  @PrimaryGeneratedColumn({ name: 'estate_id' })
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.estates)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
