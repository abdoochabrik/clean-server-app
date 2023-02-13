import { Controller, Get, ParseUUIDPipe,Param,} from '@nestjs/common'

@Controller('/user')
export class UserController {
  constructor() {}

  @Get(':id')
  getUser(@Param('id') userId: string): string {
    return  `get user ${userId}` 
  }
}