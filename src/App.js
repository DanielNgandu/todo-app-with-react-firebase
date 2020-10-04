import React, {useEffect, useState} from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TodoListComponent from "./TodoListComponent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {classes} from "istanbul-lib-coverage";
import Divider from "@material-ui/core/Divider";
import db from "./firebase";
import * as firebase from "firebase";

function App() {
  //declare constants
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
 //when app loads, get db values and add to setTodos
    //useEffect runs when app loads, has functions and dependencies
    //useEffect is short for 'use side effect'. Effects are when our application reacts with the outside world, like working with an API.
    useEffect(()=>{
        db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id:doc.id,task:doc.data().task})))
            // console.log(snapshot.docs.map(doc => doc.data().task))
        })
    },[]);
  //submit method
  const addTodo = (event) => {
    //fire up logic here
    //prevent refresh after submit
    event.preventDefault();

    db.collection('todos').add({
        task:input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]); //add new input value to array
    setInput(""); //reset form to empty
  };

  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h3" className={classes.title}>
                    TO-DO List App
                    <Typography variant="h6" className={classes.title}>
                        made with ReactJS
                    </Typography>
                </Typography>
            </Toolbar>
        </AppBar>
        <Divider light />
      <FormControl>
        <InputLabel>📌Add A To-Do</InputLabel>
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
        {todos.map((taskObj) => (
          <TodoListComponent taskObj={taskObj} />
        ))}
      </List>
    </div>
  );
}

export default App;
