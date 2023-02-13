import { Controller, Get, ParseUUIDPipe,Param,} from '@nestjs/common'
import { UserServiceImpl } from '../_business/user.service.implementation'

@Controller('/user')
export class UserController {
  constructor(private readonly userService:UserServiceImpl) {}

  @Get(':id')
  getUser(@Param('id') userId: string): string {
    return  this.userService.getUser(userId) 
  }
}