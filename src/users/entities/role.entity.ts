import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ length: 100 })
  role_name: string; // e.g., 'customer', 'admin', 'seller'

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn()
  created_at: Date;
}
