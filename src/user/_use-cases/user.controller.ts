import { Controller, Get,Post,Body, ParseUUIDPipe,Param, UsePipes, ValidationPipe,} from '@nestjs/common'
import { MyError } from 'src/_core/_business/baseError.error'
import { UserModel } from '../_business/user.model'
import { UserServiceImpl } from '../_business/user.service.implementation'
import { CreateUserUseCase } from './add_user/add_user.use-case'
import { CreateUserRequestDto } from './add_user/create-user-request.dto'

@Controller('/user')
export class UserController {
  constructor(private readonly createUserUseCase:CreateUserUseCase) {}

  @Post()
  async createUser(@Body() user:CreateUserRequestDto ):Promise<MyError | UserModel> {
    return  await  this.createUserUseCase.createUser(user)
  }
}