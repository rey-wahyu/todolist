import { cleanup, render } from '@testing-library/react';
import TodoList from '../index';

afterEach(cleanup)

const completedTodos = [{id: 1, todo:"test", isDone: false}]
const todos = [{id: 1, todo:"test", isDone: false}]
const setTodos = jest.fn()
const setCompletedTodos = jest.fn()

it("Should be render", () => {
    const input = render(<TodoList completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} setTodos={setTodos} todos={todos}/>)
    console.log(input)
})