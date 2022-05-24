import React from "react";
import { Todo } from "../../Models";
import SingleTodo from "../SingleTodo";
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos-heading">Active Tasks</span>
        {todos.map((todo) => {
          return (
            <SingleTodo
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          );
        })}
      </div>
      <div className="todos remove">
        <span className="todos-heading">Complete Tasks</span>
        {todos.map((todo) => {
          return (
            <SingleTodo
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;