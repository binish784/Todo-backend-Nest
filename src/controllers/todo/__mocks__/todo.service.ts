import { getTodoDummy } from "../test/data/user.data";

export const TodoService  = jest.fn().mockReturnValue({
    fetchTodo : jest.fn().mockResolvedValue(getTodoDummy()),
    fetchTodos : jest.fn().mockResolvedValue([getTodoDummy()]),
    deleteTodo : jest.fn().mockResolvedValue(true),
    updateTodo : jest.fn().mockResolvedValue(getTodoDummy())
})