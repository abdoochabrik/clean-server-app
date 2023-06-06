import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserServiceImpl } from '../_business/user.service.implementation';
import { INestApplication } from '@nestjs/common';
import { PaginateUsersUseCase } from '../_use-cases/paginate_users/paginate_users.use-case';
import { GetUserByIdUseCase } from '../_use-cases/get_user/get_user.use-case';

describe('Users', () => { 
 
    let paginateUsersUseCase: PaginateUsersUseCase;
    let getUserUseCase: GetUserByIdUseCase
    let app: INestApplication;

    beforeEach(async () => {
  
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      paginateUsersUseCase = moduleFixture.get<PaginateUsersUseCase>(PaginateUsersUseCase);
      getUserUseCase = moduleFixture.get<GetUserByIdUseCase>( GetUserByIdUseCase);
      app = moduleFixture.createNestApplication();
      await app.init();
    });

     /* it(`/GET users`, async () => {
        return request(app.getHttpServer())
          .get('/user')
          .expect(200)
          .expect({
            data: await paginateUsersUseCase.paginateUsers(),
          });
      });*/ 
      it(`/GET user by id`, async () => {
        return request(app.getHttpServer())
          .get('/user/033b91b6-06ab-4783-a4ad-ba218007e100')
          .expect(200)
          .expect({
            data: await getUserUseCase.getUserById('033b91b6-06ab-4783-a4ad-ba218007e100')
          });
      });   
})