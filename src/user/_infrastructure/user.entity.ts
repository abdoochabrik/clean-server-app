import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Entity, Column,Unique, OneToMany } from 'typeorm';
import {
  IsEmail,
} from "class-validator"
import { UserModel } from '../_business/user.model';
import { ProfileEntity } from '../../profile/_infrastructure/profile.entity';

@Entity({ name: 'user' })
@Unique(['email','username'])
export class UserEntity extends BaseEntity implements UserModel{

  @Column({ type: 'varchar', length: 10,unique: true })
  username?: string;

  @Column({ type: 'varchar', length: 20,unique: true })
  @IsEmail()
  email?: string;

  @Column({ type: 'varchar', length: 300 })
  password?: string;

  @Column({ type: 'boolean', default:false })
  isConnected?:boolean;

  @OneToMany(() => ProfileEntity, (profile) => profile.user)
  profiles?:ProfileEntity[]
}