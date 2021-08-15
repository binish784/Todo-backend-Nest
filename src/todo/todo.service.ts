import { Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo, TodoModel,TodoDocument } from './schemas/todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(TodoModel.name) private todoModel: Model<ToDo>
    ){}

    async fetchTodo(id:string){
        try{
            let todo:ToDo = await this.todoModel.findOne({_id:id});
            return {id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete};
        }catch(err){
            throw err;
        }
    }

    async fetchTodos(): Promise<ToDo[]> {
        try{
            let todos:TodoDocument[] = await this.todoModel.find({});
            let response:ToDo[] = todos.map((todo:TodoDocument)=><ToDo>{id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete});
            return response;
        }catch(err){
            throw err;
        }
    }

    async createTodo(title:string, description:string, isComplete:boolean){
        try{    
            let todo = new this.todoModel({title,description,isComplete});
            let saved:ToDo =  await todo.save();
            return {
                id:saved.id,
                title:saved.title,
                description:saved.description,
                isComplete:saved.isComplete
            };   
        }catch(err){
            throw err;
        }
    }

    async deleteTodo(id:string){
        try{
            let response = await this.todoModel.deleteOne({_id:id})
            return response;
        }catch(err){
            throw err;
        }
    }

    async updateTodo(id:string,updateTodoDto:Partial<ToDo>){
        try{
            let response = await this.todoModel.findOneAndUpdate({_id:id},updateTodoDto,{new:true});
            return response;
        }catch(err){
            throw err;
        }
    }

}
