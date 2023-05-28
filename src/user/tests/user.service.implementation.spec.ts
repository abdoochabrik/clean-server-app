import { Test, TestingModule } from '@nestjs/testing';
import {  UserServiceImpl } from '../_business/user.service.implementation';
import { UserRepository } from '../_infrastructure/user.repo';

describe('UserServiceImpl', () => {
  let service: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceImpl, UserRepository],
    }).compile();

    service = module.get<UserServiceImpl>(UserServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

