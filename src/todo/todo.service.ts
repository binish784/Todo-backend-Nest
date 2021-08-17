import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { TodoModel, TodoDocument } from './schemas/todo.schema';
import { Todo } from './entities/Todo.entity';

@Injectable()
export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    async fetchTodo(id:string):Promise<Todo>{
        try{
            let todo:TodoDocument = await this.todoRepository.findOne({_id:id});
            return {id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete};
        }catch(err){
            throw err;
        }
    }

    async fetchTodos(): Promise<Todo[]> {
        try{
            let todos:TodoDocument[] = await this.todoRepository.find({});
            let response:Todo[] = todos.map((todo:TodoDocument)=><Todo>{id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete});
            return response;
        }catch(err){
            throw err;
        }
    }

    async createTodo(title:string, description:string, isComplete:boolean):Promise<Todo>{
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

    async deleteTodo(id:string):Promise<boolean>{
        try{
            let response = await this.todoRepository.deleteOne({_id:id});
            return true;
        }catch(err){
            throw err;
        }
    }

    async updateTodo(id:string,updateTodoDto:Partial<TodoDocument>):Promise<Todo>{
        try{
            let response:TodoDocument = await this.todoRepository.findAndUpdate({_id:id},updateTodoDto);
            return {id:response._id,title:response.title, description : response.description, isComplete: response.isComplete};
        }catch(err){
            throw err;
        }
    }

}