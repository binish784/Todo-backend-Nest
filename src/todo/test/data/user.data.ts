import { TodoModel } from "src/todo/schemas/todo.schema";

export const getTodoDummy = ():TodoModel =>{
    let todoDummy: TodoModel = {
        title:"Hello There",    
        description:"Description",
        isComplete : true
    }
    return todoDummy;
}