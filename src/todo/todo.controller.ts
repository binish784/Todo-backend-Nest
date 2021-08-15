import { Body, Controller, Delete, Get ,Param,Patch,Post, Put } from "@nestjs/common";
import { ApiResponse } from "src/types/response.type";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { ToDo } from "./schemas/todo.schema";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController{
    constructor(private readonly todoService:TodoService){};

    @Get(":id")
    async getOne(
        @Param("id") id:string,
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let todo = await this.todoService.fetchTodo(id);
            payload = {success:true,data:todo,message:"Todo Found"};
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Server Error"}
        }
        return payload;
    }

    @Get()
    async getAll():Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let todos= await this.todoService.fetchTodos();
            let message:string = todos.length ? "Todos Listed" : "Todos Empty";
            payload = {success:true,data:todos,message};
            return payload;
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Server Error"};
            return payload;
        }
    }

    @Post()
    async create(
        @Body() createTodoDto: CreateTodoDto
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let todo = await this.todoService.createTodo(
                createTodoDto.title,
                createTodoDto.description,
                createTodoDto.isComplete
            );
            payload = {success:true, data:todo, message:"Todo Created"};
        }catch(err){
            console.log(err);
            payload = {success:false, data:null, message:"Failed to create todo"};
        }
        return payload;
    }    
    
    @Delete(":id")
    async delete(
        @Param("id") id:string,
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let response = await this.todoService.deleteTodo(id);
            payload = {success:true,data:null,message:"Todo Deleted"};
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Failed to delete todo"};
        }
        return payload;
    }

    @Patch(":id")
    async update(
        @Param("id") id:string,
        @Body() updateTodoDto : UpdateTodoDto
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let response:ToDo = await this.todoService.updateTodo(id,updateTodoDto);
            payload = {success:true,data:null,message:"Update Successful"}
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Failed to update todo"};
        }
        return payload;
    }

}