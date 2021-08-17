import { Body, Controller, Delete, Get ,Param,Patch,Post } from "@nestjs/common";

import { ApiResponse } from "src/types/response.type";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/Todo.entity";
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
            let todo:Todo = await this.todoService.fetchTodo(id);
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
            let todos:Todo[] = await this.todoService.fetchTodos();
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
            
            if(!createTodoDto.title) throw Error("Title is required");
            
            let todo:Todo = await this.todoService.createTodo(
                createTodoDto.title,
                createTodoDto.description,
                createTodoDto.isComplete
            );
            payload = {success:true, data:todo, message:"Todo Created"};
        }catch(err){
            console.log(err);
            let msg:string = err.message || "Failed to create todo";
            payload = {success:false, data:null, message:msg};
        }
        return payload;
    }    
    
    @Delete(":id")
    async delete(
        @Param("id") id:string,
    ):Promise<ApiResponse>{
        let payload:ApiResponse;
        try{
            let response:boolean = await this.todoService.deleteTodo(id);
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
            let response:Todo = await this.todoService.updateTodo(id,updateTodoDto);
            payload = {success:true,data:response,message:"Update Successful"}
        }catch(err){
            console.log(err);
            payload = {success:false,data:null,message:"Failed to update todo"};
        }
        return payload;
    }

}