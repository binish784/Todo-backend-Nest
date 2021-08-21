import { IsNotEmpty, IsString,  MinLength } from "class-validator";

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string;
}