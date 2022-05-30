import { cleanup, render, fireEvent, screen, getByTestId } from '@testing-library/react';
import InputField from "../index";
import renderer from "react-test-renderer";

afterEach(cleanup)

const dataTestId = "addTodo"
const handleAdd = jest.fn(e => e.preventDefault())
const setTodo = jest.fn
const todo = ""

it('Should be render in window', () => {
    render(<InputField handleAdd={handleAdd} setTodo={setTodo} todo={todo} />)
})

it("Form field should be render", () => {
    const todoInput = "test"

    render(<InputField handleAdd={handleAdd} setTodo={setTodo} todo={todoInput} />)
    const input = screen.getByTestId(dataTestId)
    expect(input).toBeInTheDocument
})

it("Render with empty value", () => {
    const { getByText } = render(<InputField handleAdd={handleAdd} setTodo={setTodo} todo={todo} />)

    expect(getByText(/GO/i)).toBeDisabled
})

it('Success to add new todolist', () => {
    const handleAdd = jest.fn(e => e.preventDefault())
    const setTodos = jest.fn()
    const todo = "testing"

    const { getByPlaceholderText, getByText } = render(<InputField handleAdd={handleAdd} setTodo={setTodos} todo={todo} />)

    fireEvent.change(getByPlaceholderText(/Enter a Task/i), { target: { value: todo}})
    fireEvent.click(getByText(/GO/i))

    expect(handleAdd).toBeCalled()
})

it("Get a snapshot", () => {
    const tree = render(<InputField handleAdd={handleAdd} setTodo={setTodo} todo={todo} />)
    tree.getByTestId(dataTestId)
    expect(tree).toMatchSnapshot()
});