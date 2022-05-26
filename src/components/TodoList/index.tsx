import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../Models";
import SingleTodo from "../SingleTodo";

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const useStyle = makeStyles({
  container: {
    display: 'flex',
    width: '95%',
    marginTop: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  todos: {
    display: 'flex',
    width: '47.5%',
    flexDirection: 'column',
    padding: '15px',
    borderRadius: '15px',
    backgroundColor: 'rgb(50, 195, 205)',
  },

  todosHeading: {
    fontSize: '30px',
    color: 'white',
  },

  remove: {
    backgroundColor: 'rgb(235, 103, 80)',
  },

  dragactive: {
    backgroundColor: 'rgb(0, 221, 236)'
  },

  dragcomplete: {
    backgroundColor: 'rgb(255, 38, 0)',
  },
})

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  const classes = useStyle()
  return (
    <Box component="div" className={classes.container}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <Box component="div" className={`${classes.todos} ${snapshot.isDraggingOver ? `${classes.dragactive}` : ""}`} ref={provided.innerRef} {...provided.droppableProps} >
            <Box component="span" className={classes.todosHeading}>Active Tasks</Box>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <Box component="div" ref={provided.innerRef} {...provided.droppableProps} className={`${classes.todos}  ${
            snapshot.isDraggingOver ? `${classes.dragcomplete}` : `${classes.remove}`
          }`}>
            <Box component="span" className={classes.todosHeading}>Completed Tasks</Box>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default TodoList;
