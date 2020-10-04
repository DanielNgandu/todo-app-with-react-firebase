//shortcut if youre using vscode + ES7 snippets ext is 'rfce', and will create your component defs

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';


function TodoListComponent(props) {
    return (
        <div>
            <ListItem>
                <ListItemIcon>
                    <KeyboardArrowRightRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={props.todoItem} secondary='Todo Details here...'/>
            </ListItem>
        </div>
    );
}

export default TodoListComponent;
