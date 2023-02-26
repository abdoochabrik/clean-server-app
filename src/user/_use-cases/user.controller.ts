import { Controller, Get,Post,Body, ParseUUIDPipe,Param, UsePipes, ValidationPipe, Patch,} from '@nestjs/common'
import { Delete } from '@nestjs/common/decorators'
import { MyError } from 'src/_core/_business/baseError.error'
import { UserModel } from '../_business/user.model'
import { UserServiceImpl } from '../_business/user.service.implementation'
import { CreateUserUseCase } from './add_user/add_user.use-case'
import { CreateUserRequestDto } from './add_user/create-user-request.dto'
import { DeleteUserUseCase } from './delete_user/delete_user.use-case'
import { GetUserByIdUseCase } from './get_user/get_user.use-case'
import { PaginateUsersUseCase } from './paginate_users/paginate_users.use-case'
import { UpdateUserUseCase } from './update_user/update_user.use-case'

@Controller('/user')
export class UserController {
  constructor(private readonly createUserUseCase:CreateUserUseCase,
              private readonly deleteUserUseCase:DeleteUserUseCase,
              private readonly getUserByIdUseCase:GetUserByIdUseCase,
              private readonly updateUserUseCase:UpdateUserUseCase,
              private readonly paginateUsersUseCase:PaginateUsersUseCase) {}

  @Post()
  async createUser(@Body() user:CreateUserRequestDto ):Promise<MyError | UserModel> {
    return  await  this.createUserUseCase.createUser(user)
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseUUIDPipe) userId:string):Promise<MyError | boolean> {
    return  await  this.deleteUserUseCase.deleteUser(userId)
  }

  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) userId:string) : Promise<MyError | UserModel> {
      return await this.getUserByIdUseCase.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<MyError | UserModel[]> {
      return await this.paginateUsersUseCase.paginateUsers()
  }

  @Patch(':id')
  async updateUser(@Param('id',ParseUUIDPipe) userId:string, @Body()  user:CreateUserRequestDto): Promise<MyError | UserModel> {
      return await this.updateUserUseCase.updateUser(userId,user)
  }

}