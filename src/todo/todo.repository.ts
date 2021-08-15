import { Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ToDo, TodoModel } from "./schemas/todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoRepository{

    constructor( @InjectModel(TodoModel.name) private todoModel: Model<ToDo> ){}

    async find(todoFilterQuery:FilterQuery<ToDo>):Promise<ToDo[]>{
        return this.todoModel.find(todoFilterQuery);
    }

    async findOne(todoFilterQuery:FilterQuery<ToDo>):Promise<ToDo>{
        return this.todoModel.findOne(todoFilterQuery);
    }

    async create(todo:CreateTodoDto){
        let newTodo:ToDo = new this.todoModel(todo);
        let response = newTodo.save();
        return response;
    }

    async deleteOne(todoFilterQuery:FilterQuery<ToDo>){
        return this.todoModel.deleteOne(todoFilterQuery);
    }

    async findAndUpdate(todoFilterQuery:FilterQuery<ToDo>,todo:Partial<ToDo>){
        return this.todoModel.findOneAndUpdate(todoFilterQuery,todo,{new:true});
    }

}