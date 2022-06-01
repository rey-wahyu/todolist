import { cleanup } from '@testing-library/react';
import InputField from "../index";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

afterEach(cleanup)

const handleAdd = jest.fn(e => e.preventDefault())
const setTodo = jest.fn
const todo = ""

// jest.mock('../index')

const props = {
    handleAdd,
    setTodo,
    todo,
}

const wrapper = shallow(<InputField {...props} />)

describe("<InputField /> rendering", () => {
    test("Should be render in window", () => {
        expect(wrapper).toHaveLength(1)
    })

    test("Form field should be render", () => {
        const input = wrapper.find("form").debug()
        expect(input).toBeInTheDocument
    })

    test("Should 0 length value i input field after Go Button clicked", () => {
        wrapper.find("ForwardRef(Button)").simulate('click')
        const input = wrapper.find("ForwardRef(InputBase)")
        expect(input.text().length).toBe(0)
    })

    describe("Testing input", () => {
        test("Button should be disamble if Input with empty value", () => {
            expect(wrapper.find("ForwardRef(Button)")).toBeDisabled
        })
    
        test("Success add new todolist ", () => {
            const todo = "testing"
    
            wrapper.find("ForwardRef(InputBase)").simulate('change', { target: { value: todo}}) 
            wrapper.find("ForwardRef(Button)").simulate('click')
            expect(handleAdd).toHaveLength(1)
        })
    })

    test("Get a snapshop", () => {
        expect(wrapper.debug()).toMatchSnapshot();
    })
})
