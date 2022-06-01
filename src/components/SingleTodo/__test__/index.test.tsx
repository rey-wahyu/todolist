import {render, cleanup} from '@testing-library/react';
import SingleTodo from "../index";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

afterEach(cleanup)

const index = Date.now()
const setTodos = jest.fn()
const todo = {id: index, todo:"test", isDone: false}
const todos = [{id: index, todo:"test", isDone: false}]

const props = {
    index,
    setTodos,
    todo,
    todos
}

const wrapper = shallow(<SingleTodo {...props} />)

describe('Single Todo', () => {
    test("Test functionality of button", () => {
        expect(wrapper).toHaveLength(1)
    })

    test("Form field should be render", () => {
        const input = wrapper.find("form").debug()
        expect(input).toBeInTheDocument
    })


})

it("Should be 3", () => {
    const a = 1
    const b = 2
    expect(a+b).toBe(3)
})