import { Controller, Get,Post,Body, ParseUUIDPipe,Param, UsePipes, ValidationPipe, Patch,} from '@nestjs/common'
import { Delete, UseGuards } from '@nestjs/common/decorators'
import { RolesGuard } from '../../role/_business/roles.guard'
import { Role } from '../../role/_business/role.enum'
import { Roles } from '../../role/_business/roles.decorator'
import { MyError } from '../../_core/_business/baseError.error'
import { UserModel } from '../_business/user.model'
import { CreateUserUseCase } from './add_user/add_user.use-case'
import { CreateUserRequestDto } from './add_user/create-user-request.dto'
import { DeleteUserUseCase } from './delete_user/delete_user.use-case'
import { GetUserByIdUseCase } from './get_user/get_user.use-case'
import { PaginateUsersUseCase } from './paginate_users/paginate_users.use-case'
import { UpdateUserRequestDto } from './update_user/update-user-request.dto'
import { UpdateUserUseCase } from './update_user/update_user.use-case'

@Controller('/user')
export class UserController {
  constructor(private readonly createUserUseCase:CreateUserUseCase,
              private readonly deleteUserUseCase:DeleteUserUseCase,
              private readonly getUserByIdUseCase:GetUserByIdUseCase,
              private readonly updateUserUseCase:UpdateUserUseCase,
              private readonly paginateUsersUseCase:PaginateUsersUseCase) {}

  @Roles(Role.Admin,Role.Author,Role.Customer)
  @UseGuards(RolesGuard)            
  @Post()
  async createUser(@Body() user:CreateUserRequestDto ):Promise<MyError | UserModel> {
    console.log(user)
    return  await  this.createUserUseCase.createUser(user)
  }


  @Roles(Role.Admin,Role.Author,Role.Customer)
  @UseGuards(RolesGuard) 
  @Delete(':id')
  async deleteUser(@Param('id',ParseUUIDPipe) userId:string):Promise<MyError | boolean> {
    return  await  this.deleteUserUseCase.deleteUser(userId)
  }

  @Roles(Role.Admin,Role.Author,Role.Customer)
  @UseGuards(RolesGuard) 
  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) userId:string) : Promise<MyError | UserModel> {
      return await this.getUserByIdUseCase.getUserById(userId);
  }

  @Roles(Role.Admin,Role.Author,Role.Customer)
  @UseGuards(RolesGuard) 
  @Get()
  async getUsers(): Promise<MyError | UserModel[]> {
      return await this.paginateUsersUseCase.paginateUsers()
  }

  @Roles(Role.Admin,Role.Author,Role.Customer)
  @UseGuards(RolesGuard) 
  @Patch(':id')
  async updateUser(@Param('id',ParseUUIDPipe) userId:string, @Body()  user:UpdateUserRequestDto): Promise<MyError | UserModel> {
      return await this.updateUserUseCase.updateUser(userId,user)
  }

}