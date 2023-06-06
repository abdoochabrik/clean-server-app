import { Test, TestingModule } from '@nestjs/testing';
import {  UserRepository } from '../_infrastructure/user.repo';
import { AppModule } from '../../app.module';
import { UserEntity } from '../_infrastructure/user.entity';
import { Role } from '../../role/_business/role.enum';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
      //providers:[UserRepository]
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  let user:UserEntity  = {
    username: "atlas",
    email: "atlas@gmail.com",
    password: "atlas",
    role: {
        id: "4e3556fe-10c8-4f3d-bf97-90175535b01c",
        createdAt: new Date("2023-04-10T02:29:31.567Z"),
        updatedAt: new Date("2023-04-10T02:29:31.567Z"),
        version: 1,
        role:  Role.Author
    },
    id: "57f4f007-c0a8-4abc-b031-ffefba152d05",
    createdAt:  new Date("2023-06-04T13:07:04.732Z"),
    updatedAt:  new Date("2023-06-04T13:07:04.732Z"),
    version: 1,
    isConnected: false
}
  it('should return a user', async () => {

      jest.spyOn(repository, 'getEntityById').mockImplementation(async () => user);

      expect(await repository.getEntityById(user.id)).toBe(user);
  })

  it('should return update user and return it', async () => {

    user.username = "atlooo"
    //jest.spyOn(repository, 'updateUser').mockImplementation(async () => user);

    //expect((await repository.updateUser("91769702-b360-4bc2-987b-b3e8f18cb2ad",{ username: "atlooo"})).raw).toBe(user);
})
  

});
