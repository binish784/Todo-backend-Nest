import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoModel,TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:TodoModel.name,schema:TodoSchema}])],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoRepository,
  ],
})
export class TodoModule {}
