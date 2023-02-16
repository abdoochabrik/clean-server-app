import { Controller, Get,Post,Body, ParseUUIDPipe,Param,} from '@nestjs/common'
import { UserModel } from '../_business/user.model'
import { UserServiceImpl } from '../_business/user.service.implementation'
import { CreateUserUseCase } from './add_user/add_user.use-case'
import { CreateUserRequestDto } from './add_user/create-user-request.dto'

@Controller('/user')
export class UserController {
  constructor(private readonly createUserUseCase:CreateUserUseCase) {}

  @Get(':id')
  getUser(@Param('id') userId: string){
    //return  this.userService.getUser(userId) 
  }
  @Post()
  createUser(@Body() user:CreateUserRequestDto ):Promise<UserModel> {
    return  this.createUserUseCase.createUser(user)
  }
}