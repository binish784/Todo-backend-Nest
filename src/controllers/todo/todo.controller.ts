import { Body, Controller, Delete, Get,Param,Patch,Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../../decorators/public.decorator";
import { ApiResponse } from "src/types/response.type";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/Todo.entity";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "src/guards/jwt-authGuards";

@ApiTags("Todo")
@Controller("todo")
export class TodoController{
    constructor(private readonly todoService:TodoService){};

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getOne(
        @Param("id") id:string,
        @Request() req
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        let userId = req.user.id;
        let todo:Todo = await this.todoService.fetchTodo(id,userId);
        payload = {success:true,data:todo,message:"Todo Found"};
        return payload;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(
        @Request() req
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let userId:string = req.user.id;
            let todos:Todo[] = await this.todoService.fetchTodosByUser(userId);
            let message:string = todos.length ? "Todos Listed" : "Todos Empty";
            payload = {success:true,data:todos,message};
            return payload;
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Server Error"};
            return payload;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createTodoDto: CreateTodoDto,
        @Request() req
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            
            if(!createTodoDto.title) throw Error("Title is required");
            
            let todo:Todo = await this.todoService.createTodo(
                createTodoDto.title,
                createTodoDto.description,
                createTodoDto.isComplete,
                req.user.id
            );
            payload = {success:true, data:todo, message:"Todo Created"};
        }catch(err){
            console.log(err);
            let msg:string = err.message || "Failed to create todo";
            payload = {success:false, data:null, message:msg};
        }
        return payload;
    }    
    
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(
        @Param("id") id:string,
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        let response:boolean = await this.todoService.deleteTodo(id);
        payload = {success:true,data:null,message:"Todo Deleted"};
        return payload;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async update(
        @Param("id") id:string,
        @Body() updateTodoDto : UpdateTodoDto
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        let response:Todo = await this.todoService.updateTodo(id,updateTodoDto);
        payload = {success:true,data:response,message:"Update Successful"}
        return payload;
    }

}