import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/types/response.type';
import { CreateUserDTO } from './dto/createUserDto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Post()
    async createUser(
        @Body() createUserDto:CreateUserDTO
    ) : Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let userData:User = await this.userService.create(createUserDto.username,createUserDto.password);
            payload = {success:true,data:userData,message:"User Created"};
        }catch(err){
            let message = err.message || "Server error"
            payload = {success:false,data:null,message:message};
        }
        return payload;
    }

    // @Get(":id")
    // async getUser(
    //     @Param("id") id:string
    // ){
    //     let payload:ApiResponse;
    //     try{
    //         let user:User = await this.userService.findById(id);
    //         payload = { success:false, data: user, message: "User found"};
    //     }catch(err){
    //         let message = err.message || "Server error";
    //         payload = {success:false,data:null,message};
    //     }
    //     return payload;
    // }


}
