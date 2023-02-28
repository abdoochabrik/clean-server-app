import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { ProfileModel } from '../_business/profile.model';
import { profileType } from '../_business/profile.enum';
import { UserEntity } from '../../user/_infrastructure/user.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements ProfileModel{

  @Column({ type: 'varchar', length: 20, nullable:true})  
  livesIn?: string;

  @Column({type: 'enum', enum: profileType})
  profileType?: profileType;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  user?:UserEntity

}