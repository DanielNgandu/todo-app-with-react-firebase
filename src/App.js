import React, {useState} from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

function App() {
//declare constants
    const [todos, setTodos] = useState(['Read the bible', 'Sweep the room', 'Go to the market', 'Exercise']);
    const [input, setInput] = useState('');

//submit method
    const addTodo = (event) => {
        //fire up logic here
        //prevent refresh after submit
        event.preventDefault()
        setTodos([...todos, input])//add new input value to array
        setInput('')//reset form to empty
    }

    return (
        <div className="App">
            <FormControl>
                <TextField
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder="enter item"
                    id="outlined-basic"
                    label="Add Item"
                    variant="outlined"/>
            </FormControl>
            <Button disabled={!input} variant="contained" color="primary" onClick={addTodo}>Add</Button>


            <ul>
                <li>Read the bible</li>
                <li>{todos.map(todo => (
                    <li>{todo}</li>
                ))}</li>
            </ul>
        </div>
    );
}

export default App;
