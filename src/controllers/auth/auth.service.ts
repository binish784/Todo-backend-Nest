import  * as bcrypt from "bcrypt";
import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    
    constructor( 
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async validateUser( username:string, pass:string ){
        let targetUser = await this.userService.findByUsername(username,true);
        
        if(targetUser){
            let validPassword = await bcrypt.compare(pass,targetUser.password);
            if(validPassword){
                let {password, ...rest} = targetUser;
                return rest;
            }
            return null;
        }        
        return null;
    }

    async getUserToken(user:any):Promise<String>{
        let payload = {username:user.username,id:user.id};
        let access_token = await this.jwtService.sign(payload);
        return access_token;
    }

}
