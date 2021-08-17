import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTodoDto{

    @IsString()
    @IsOptional()
    @MaxLength(20)
    title:string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    description:string;

    @IsBoolean()
    @IsOptional()
    isComplete:boolean;

}