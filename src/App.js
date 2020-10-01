import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TodoListComponent from "./TodoListComponent";

function App() {
  //declare constants
  const [todos, setTodos] = useState([
    "Read the bible",
    "Sweep the room",
    "Go to the market",
    "Exercise",
  ]);
  const [input, setInput] = useState("");

  //submit method
  const addTodo = (event) => {
    //fire up logic here
    //prevent refresh after submit
    event.preventDefault();
    setTodos([...todos, input]); //add new input value to array
    setInput(""); //reset form to empty
  };

  return (
    <div className="App">
      <FormControl>
        <InputLabel>Write A To-Do</InputLabel>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="enter item"
        />
      </FormControl>
      <Button
        disabled={!input}
        variant="contained"
        color="primary"
        onClick={addTodo}
      >
        Add
      </Button>

      <List>
        {todos.map((todo) => (
          <TodoListComponent todoItem={todo} />
        ))}
      </List>
    </div>
  );
}

export default App;
