import *  as bcrypt from "bcrypt";
import { FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor( private userRepository:UserRepository){}

    async create (username:string,password:string):Promise<User> {

        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(password,salt);

        let userResponse = await this.userRepository.createUser({username,password:passwordHash});
        let targetUser;
        if(userResponse){
            targetUser = { id : userResponse._id, username : userResponse.username };
        }
        return targetUser;
    }

    async findByUsername(username:string, showPassword = false):Promise<User>{
        let filterQuery:FilterQuery<UserDocument> = {username};
        let userResponse = await this.userRepository.findOne(filterQuery);
        let targetUser;
        if(userResponse){
            targetUser = { id : userResponse.id, username:userResponse.username };
            if(showPassword) targetUser.password = userResponse.password;
        }
        return targetUser;
    }

    async findById(userId:string):Promise<User>{
        let filterQuery:FilterQuery<UserDocument> = {_id:userId};
        let userResponse = await this.userRepository.findOne(filterQuery);
        let targetUser;
        if(userResponse){
            targetUser = { id : userResponse.id, username:userResponse.username };
        }
        return targetUser;
    }

}
