import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel,TodoSchema } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [MongooseModule.forFeature([{name:TodoModel.name,schema:TodoSchema}])],
  controllers: [TodoController],
  providers: [TodoService],
  exports:[TodoService]
})
export class TodoModule {}
