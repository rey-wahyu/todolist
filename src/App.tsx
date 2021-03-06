import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./Models";

const useStyle = makeStyles({
  app: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2f74c0',
    fontFamily: '"Neucha", cursive',
  },

  heading: {
    textTransform: 'uppercase',
    fontSize: '40px',
    margin: '30px',
    color: 'white',
    zIndex: 1,
    textAlign: 'center'
  }
})

const App:React.FC = () => {
  const classes = useStyle()
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  console.log(todos)
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box component="div" className={classes.app}>
        <Box component="span" className={classes.heading}>Taskify</Box>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </Box>
    </DragDropContext>
  ) 
}

export default App;
