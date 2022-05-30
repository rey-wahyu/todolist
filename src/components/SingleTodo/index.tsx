import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../Models";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const IMG_URL = "https://1.bp.blogspot.com/-gY1guSlZ3v4/XuYXPDmJZlI/AAAAAAAAGCY/ARvmPMwTTsQ4jChWrcI4zV9aZdidP8wjQCLcBGAsYHQ/s1920/abstrak-gunung-cat-air.jpg";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const useStyle = makeStyles({
  todosSingleText: {
    flex: '1',
    padding: '5px',
    border: 'none',
    fontSize: '20px',

    '&focus': {
      outline: 'none'
    }
  },

  todosSingle: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    padding: '20px',
    marginTop: '15px',
    backgroundImage: `url(${IMG_URL})`,
    transition: '0.2s',

    '&hover': {
      boxShadow: '0 0 5px black',
      transform: 'scale(1.03)'
    }
  },

  icon: {
    marginLeft: '10px',
    fontSize: '25px',
    cursor: 'pointer',
  }
})

const SingleTodo: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(props.todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  const classes = useStyle()

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    props.setTodos(
      props.todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    props.setTodos(props.todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    props.setTodos(
      props.todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={props.todo.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <form
          data-testid='form-todo'
          onSubmit={(e) => handleEdit(e, props.todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${classes.todosSingle} ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <TextField size="small" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className={classes.todosSingleText} ref={inputRef}/>
          ) : props.todo.isDone ? (
            <Box component="s" className={classes.todosSingleText}>{props.todo.todo}</Box>
          ) : (
            <Box component="span" className={classes.todosSingleText}>{props.todo.todo}</Box>
          )}
          <Box component="div">
            <Box data-testid="btn-edit" component="span" className={classes.icon} onClick={() => {
              if (!edit && !props.todo.isDone) {
                setEdit(!edit);
              }
              }}><AiFillEdit />
            </Box>
            <Box data-testid="btn-delete" component="span" className={classes.icon} onClick={() => handleDelete(props.todo.id)}><AiFillDelete /></Box>
            <Box data-testid="btn-done" component="span" className={classes.icon} onClick={() => handleDone(props.todo.id)}><MdDone /></Box>
          </Box>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
