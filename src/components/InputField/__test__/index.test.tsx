import React from "react";
import {render, fireEvent } from '@testing-library/react';
import InputField from "../index";

it('Add new todolist', () => {
    const handleAdd = jest.fn()
    const setTodos = jest.fn()
    const todo = "testing"

    const { getByPlaceholderText, getByText } = render(<InputField handleAdd={handleAdd} setTodo={setTodos} todo={todo} />)

    fireEvent.change(getByPlaceholderText(/Enter a Task/i), { target: { value: todo}})
    fireEvent.click(getByText(/GO/i))

    expect(handleAdd).toBeCalled()
})