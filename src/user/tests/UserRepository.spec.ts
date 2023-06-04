import { Test, TestingModule } from '@nestjs/testing';
import {  UserRepository } from '../_infrastructure/user.repo';
import { AppModule } from '../../app.module';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});

