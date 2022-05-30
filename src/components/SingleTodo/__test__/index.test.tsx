import {render, cleanup} from '@testing-library/react';
import SingleTodo from "../index";

afterEach(cleanup);

const index = 1
const setTodos = jest.fn()
const todo = {id: index, todo:"test", isDone: false}
const todos = [{id: index, todo:"test", isDone: false}]

it("Should be render on window", () => {
    render(<SingleTodo index={index} setTodos={setTodos} todo={todo} todos={todos} />)
});