import { MongooseModule } from "@nestjs/mongoose";
import { Test,TestingModule } from "@nestjs/testing";
import { TodoSchema,TodoModel } from "./schemas/todo.schema";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

describe('TodoController', () => {
    let todoController: TodoController;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports:[MongooseModule.forFeature([{name:TodoModel.name,schema:TodoSchema}])],
        controllers: [TodoController],
        providers: [TodoService],
      }).compile();
  
      todoController = app.get<TodoController>(TodoController);
    });
  
    describe('Testing Todo Controller', () => {

        it('/todo GET - returns all todos',async ()=>{
            let response = await todoController.getAll();
            expect(response.success).toBe(true);
            if(response.success && response.data.length>0){
              expect(response.message).toBe("Todos Listed");
            }else{
              expect(response.message).toBe("Todos Empty");
            }
        })

    });
});
  