import { cleanup } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import TodoList from '../index';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

afterEach(cleanup)

const completedTodos = [{id: Date.now(), todo:"test", isDone: false}]
const todos = [{id: Date.now(), todo:"test", isDone: false}]
const setTodos = jest.fn()
const setCompletedTodos = jest.fn()

const props = {
    completedTodos,
    todos,
    setTodos,
    setCompletedTodos
}

const wrapper = shallow(<TodoList {...props} />)

describe('Todolist', () => {
    describe("Rendering", () => {
        test("Render component", () => {
            expect(wrapper).toHaveLength(1)
        })
        test("Render active task", () => {
            const activeTask = wrapper.find({ "data-testid": "active-task" })
            expect(activeTask).toHaveLength(1)
        })
        test("Render complete task", () => {
            const activeTask = wrapper.find({ "data-testid": "complete-task" })
            expect(activeTask).toHaveLength(1)
        })
    })

    test("coba", () => {
        console.log(wrapper.find({ "data-testid": "complete-task" }).debug())
    })
})