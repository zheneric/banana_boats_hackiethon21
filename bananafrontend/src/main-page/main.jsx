import React, { useState } from "react";

import { TaskPanel } from "./task-panel";
import { DragDropCal } from "./calendar";

import { useCollectionData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

export function MainPage(props) {
  const { firebase } = props;

  const classes = useStyles();

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [taskPanelOpen, setTaskPanelOpen] = useState(true);

  const user = auth.currentUser;
  const timeStamp = new Date("2021-04-01");

  // Load all valid tasks belonging to User
  const tasksRef = firestore.collection("tasks");
  const query = tasksRef
    .where("uid", "==", user.uid)
    .where("scheduled", ">=", timeStamp);

  // Load tasks
  const [tasks, loading] = useCollectionData(query, { idField: "id" });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskLength, setNewTaskLength] = useState(1);

  // Create a new task
  const createTask = async (e) => {
    e.preventDefault();

    const undefinedDate = new Date("2100-01-01");
    const uid = user.uid;

    await tasksRef.add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      scheduled: undefinedDate,
      title: newTaskTitle,
      length: newTaskLength,
      uid,
    });

    setNewTaskTitle("");
    setNewTaskLength(1);
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
            variant="permanent"
          >
            <form onSubmit={createTask}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Length"
                variant="outlined"
                required
                type="number"
                step="0.5"
                endAdornment={
                  <InputAdornment position="end">Hr</InputAdornment>
                }
                onChange={(e) => setNewTaskLength(e.target.value)}
              />

              <Button variant="contained" color="primary" type="submit">
                Create new task
              </Button>
            </form>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setTaskPanelOpen(!taskPanelOpen)}
            >
              Open/Close Side Panel
            </Button>
          </Drawer>
        </Grid>
        <Grid item xs>
          <TaskPanel
            isOpen={taskPanelOpen}
            setIsOpen={setTaskPanelOpen}
            tasks={tasks}
            loading={loading}
          />
        </Grid>
        <Grid item xs>
          <DragDropCal />
        </Grid>
      </Grid>
    </div>
  );
}
