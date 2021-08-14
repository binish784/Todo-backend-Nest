import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo, TodoModel,TodoDocument } from '../../schemas/todo.schema';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(TodoModel.name) private todoModel: Model<TodoDocument>
    ){}

    async fetchTodos(): Promise<ToDo[]> {
        try{
            let todos:TodoDocument[] = await this.todoModel.find({});
            let response:ToDo[] = todos.map((todo:TodoDocument)=><ToDo>{id:todo._id,title:todo.title,description:todo.description,isComplete:todo.isComplete});
            return response;
        }catch(err){
            throw err;
        }
    }
}
