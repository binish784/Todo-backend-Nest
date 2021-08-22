import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTodoDto{

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    title:string;

    
    @ApiProperty({required:true})
    @MaxLength(100)
    @IsString()
    description:string;

    
    @ApiProperty({required:false,default:false})
    @IsBoolean()
    isComplete:boolean;

    @ApiProperty({required:false})
    userId:string;

}