import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { TodoModel, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    async fetchTodo(id:string){
        try{
            let todo:TodoDocument = await this.todoRepository.findOne({_id:id});
            return {id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete};
        }catch(err){
            throw err;
        }
    }

    async fetchTodos(): Promise<TodoDocument[]> {
        try{
            let todos:TodoDocument[] = await this.todoRepository.find({});
            let response:TodoDocument[] = todos.map((todo:TodoDocument)=><TodoDocument>{id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete});
            return response;
        }catch(err){
            throw err;
        }
    }

    async createTodo(title:string, description:string, isComplete:boolean){
        try{
            let todo = await this.todoRepository.create({title,description,isComplete});
            return {
                id:todo.id,
                title:todo.title,
                description:todo.description,
                isComplete:todo.isComplete
            };   
        }catch(err){
            throw err;
        }
    }

    async deleteTodo(id:string){
        try{
            let response = await this.todoRepository.deleteOne({_id:id});
            return true;
        }catch(err){
            throw err;
        }
    }

    async updateTodo(id:string,updateTodoDto:Partial<TodoDocument>){
        try{
            let response = await this.todoRepository.findAndUpdate({_id:id},updateTodoDto);
            return response;
        }catch(err){
            throw err;
        }
    }

}