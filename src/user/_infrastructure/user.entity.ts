import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import {
  IsEmail,
} from "class-validator"

@Entity({ name: 'user' })
@Unique(['email','username'])
export class UserEntity extends BaseEntity{

  @Column({ type: 'varchar', length: 10,unique: true })
  username: string;

  @Column({ type: 'varchar', length: 20,unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'boolean', default:false })
  isConnected?:boolean;
}