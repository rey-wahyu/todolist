import { Button, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const useStyles = makeStyles({
  input: {
    display: 'flex',
    width: '95%',
    position: 'relative',
    alignItems: 'center'
  },

  inputSubmit: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    margin: '12px',
    borderRadius: '50px',
    right: '0px',
    border: 'none',
    fontSize: '15px',
    backgroundColor: '#2f74c0',
    color: 'white',
    transition: '0.2s all',
    boxShadow: '0 0 10px black',

    '&:hover': {
      backgroundColor: '#388ae2'
    },

    '&:active': {
      transform: 'scale(0.8);',
      boxShadow: '0 0 5px black'
    }
  },

  inputBox: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    borderRadius: '50px',
    padding: '15px 30px',
    fontSize: '25px',
    border: 'none',
    transition: '0.2s',
    boxShadow: 'inset 0 0 5px black',

    '&:focus': {
      boxShadow: '0 0 10px 1000px rgba(0, 0, 0, 0.5)',
      outline: 'none'
    }
  }
})

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  return (
    <form
      className={classes.input} onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
      <InputBase
        type="text"
        size="small"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className={classes.inputBox}
      />
      <Button type="submit" variant="text" className={classes.inputSubmit}>Go</Button>
    </form>
  );
};

export default InputField;
