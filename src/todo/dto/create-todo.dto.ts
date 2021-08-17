import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTodoDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    title:string;

    @MaxLength(100)
    @IsString()
    description:string;

    @IsBoolean()
    isComplete:boolean;

}