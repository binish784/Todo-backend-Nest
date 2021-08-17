import { Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TodoDocument, TodoModel } from "./schemas/todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoRepository{

    constructor( @InjectModel(TodoModel.name) private todoModel: Model<TodoDocument> ){}

    async find(todoFilterQuery:FilterQuery<TodoDocument>):Promise<TodoDocument[]>{
        return this.todoModel.find(todoFilterQuery);
    }

    async findOne(todoFilterQuery:FilterQuery<TodoDocument>):Promise<TodoDocument>{
        return this.todoModel.findOne(todoFilterQuery);
    }

    async create(todo:CreateTodoDto){
        let newTodo:TodoDocument = new this.todoModel(todo);
        let response = newTodo.save();
        return response;
    }

    async deleteOne(todoFilterQuery:FilterQuery<TodoDocument>){
        return this.todoModel.deleteOne(todoFilterQuery);
    }

    async findAndUpdate(todoFilterQuery:FilterQuery<TodoDocument>,todo:Partial<TodoDocument>){
        return this.todoModel.findOneAndUpdate(todoFilterQuery,todo,{new:true});
    }

}