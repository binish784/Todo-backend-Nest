import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "src/types/response.type";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController{
    constructor(private readonly todoService:TodoService){};

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
    
    
}