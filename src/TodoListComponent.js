//shortcut if youre using vscode + ES7 snippets ext is 'rfce', and will create your component defs

import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import Button from "@material-ui/core/Button";
import db from "./firebase";
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import * as firebase from "firebase";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function TodoListComponent(props) {
    const [input, setInput] = useState("");


    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    const updateTask = () =>{
        db.collection('todos').doc(props.taskObj.id).set({
            task:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true})
        setOpen(false);


    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <FormControl>
                        <InputLabel>📌Edit Task</InputLabel>
                        <Input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={props.taskObj.task}
                        />
                    </FormControl>
                    <Button
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        onClick={updateTask}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
            <ListItem>
                <ListItemIcon>
                    <KeyboardArrowRightRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={props.taskObj.task} secondary='📑Todo Details here...'/>
                <Button
                    variant="contained"
                    onClick={event => setOpen(true)}
                >
                    📝Edit
                </Button>
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
