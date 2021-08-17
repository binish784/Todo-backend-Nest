import dbConfig from "../../config/database";
import { MongooseModule } from "@nestjs/mongoose";
import { Test,TestingModule } from "@nestjs/testing";
import { TodoDocument, TodoModel, TodoSchema } from "../schemas/todo.schema";
import { TodoController } from "../todo.controller";
import { TodoService } from "../todo.service";
import { TodoRepository } from "../todo.repository";
import { ApiResponse } from "src/types/response.type";
import { getTodoDummy } from "./data/user.data";

jest.mock('../todo.service');

describe('TodoController', () => {
    let todoController: TodoController;
    let todoService : TodoService;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [MongooseModule.forRoot(dbConfig.connectionString), MongooseModule.forFeature([{name:TodoModel.name,schema:TodoSchema}])],
        controllers: [TodoController],
        providers: [TodoService,TodoRepository],
      }).compile();
  
      todoController = app.get<TodoController>(TodoController);
      todoService = app.get<TodoService>(TodoService);
      jest.clearAllMocks();
    });
    

    // testing get todos
    describe('getTodos', () => {
      describe('when getTodos is called', ()=>{

        let response:ApiResponse;

        beforeEach( async ()=>{
          response = await todoController.getAll();
        })
  
        test('then it should call todoService',()=>{
          expect(todoService.fetchTodos);
        })      
      })

    });

    // testing get single todo
    describe("getTodo",()=>{
      describe("when getTodo is called", ()=>{
        let response:ApiResponse;

        beforeEach(async()=>{
          response = await todoController.getOne(getTodoDummy()._id);
        })

        test("then it should call todoService",()=>{
          expect(todoService.fetchTodo).toBeCalledWith(getTodoDummy()._id);
        })
      })    
    })

});
  