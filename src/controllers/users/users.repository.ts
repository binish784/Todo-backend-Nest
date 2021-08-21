import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateUserDTO } from "./dto/createUserDto";
import { UserDocument, UserModel } from "./schemas/user.schema";

@Injectable()
export class UserRepository{

    constructor(@InjectModel(UserModel.name) private userModel:Model<UserDocument> ){}

    async createUser(createUserDto:CreateUserDTO): Promise<UserDocument>{
        let userModel:UserDocument = new this.userModel(createUserDto)
        let response = await userModel.save();
        return response;
    }

    async findOne(filterquery:FilterQuery<UserDocument>):Promise<UserDocument>{
        let targetUser:UserDocument = await this.userModel.findOne(filterquery);
        return targetUser;
    }

}