import { TodoModel } from "src/todo/schemas/todo.schema";

export const getTodoDummy = () =>{
    let todoDummy = {
        _id:"asdasd",
        title:"Hello There",    
        description:"Description",
        isComplete : true
    }
    return todoDummy;
}