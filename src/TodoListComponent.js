//shortcut if youre using vscode + ES7 snippets ext is 'rfce', and will create your component defs

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import Button from "@material-ui/core/Button";
import db from "./firebase";


function TodoListComponent(props) {
    return (
        <div>
            <ListItem>
                <ListItemIcon>
                    <KeyboardArrowRightRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={props.taskObj.task} secondary='📑Todo Details here...'/>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={event => db.collection('todos').doc(props.taskObj.id).delete()}
                >
                    🗑Delete
                </Button>
            </ListItem>
        </div>
    );
}

export default TodoListComponent;
