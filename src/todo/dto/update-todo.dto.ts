import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTodoDto{

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @MaxLength(20)
    title:string;

    
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @MaxLength(100)
    description:string;

    
    @ApiProperty({required:false})
    @IsBoolean()
    @IsOptional()
    isComplete:boolean;

}