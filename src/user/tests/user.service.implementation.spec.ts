import { Test, TestingModule } from '@nestjs/testing';
import {  UserServiceImpl } from '../_business/user.service.implementation';
import { AppModule } from '../../app.module';

describe('UserServiceImpl', () => {
  let service: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    service = module.get<UserServiceImpl>(UserServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
