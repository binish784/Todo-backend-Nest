import { BadRequestException, Injectable,  NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { TodoModel, TodoDocument } from './schemas/todo.schema';
import { Todo } from './entities/Todo.entity';

@Injectable()
export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    async fetchTodo(id:string):Promise<Todo>{
        let todo:TodoDocument;
        try{
            todo = await this.todoRepository.findOne({_id:id});
        }catch(err){
            throw new BadRequestException({success:false,message:"Bad Request"});
        }
        if(!todo) throw new NotFoundException({success:false,message:"Todo Not Found"});
        return {id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete};
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
        let response ;
        try{
            response = await this.todoRepository.deleteOne({_id:id});
        }catch(err){
            throw new BadRequestException({success:false,message:"Bad Request"});
        }
        if(!response.deletedCount) throw new NotFoundException({success:false,message:"Todo Not Found"});
        return true;
        
    }

    async updateTodo(id:string,updateTodoDto:Partial<TodoDocument>):Promise<Todo>{
        let response:TodoDocument ;
        try{
            response = await this.todoRepository.findAndUpdate({_id:id},updateTodoDto);
        }catch(err){
            throw new BadRequestException({success:false,message:"Bad Request"});
        }
        if(!response) throw new NotFoundException({success:false,message:"Todo Not Found"});
        return {id:response._id,title:response.title, description : response.description, isComplete: response.isComplete};
        
    }

}