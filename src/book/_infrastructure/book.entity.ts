import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { BookModel } from '../_business/book.model';
import { UserEntity } from '../../user/_infrastructure/user.entity';
import { ProfileModel } from 'src/profile/_business/profile.model';
import { UserModel } from 'src/user/_business/user.model';
import { ProfileEntity } from 'src/profile/_infrastructure/profile.entity';

@Entity({ name: 'book' })
export class BookEntity extends BaseEntity implements BookModel{
  
  @Column({ type: 'varchar', length: 20, nullable:false})  
  name: string;

  @Column({ type: 'number', length: 20, nullable:false})
  nbrPage: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.books)
  profile?: ProfileEntity;

}