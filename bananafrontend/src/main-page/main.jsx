import React, { useState } from "react";

import { TaskPanel } from "./task-panel";
import { dragDropCal } from "./calendar";

import { useCollectionData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

export function MainPage(props) {
  const { firebase } = props;

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

  // Turn the tasks into components to show on screen
  const taskCards =
    !loading && tasks
      ? tasks.map((task) => {
          return (
            <Card>
              <CardContent>
                <Typography>Task: {task.title}</Typography>
                <Typography>Length: {task.length}</Typography>
              </CardContent>
            </Card>
          );
        })
      : [<p>No tasks</p>];

  return (
    <div>
      <dragDropCal />
      <TaskPanel isOpen={taskPanelOpen} setIsOpen={setTaskPanelOpen} />
      <div>{taskCards}</div>

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
          endAdornment={<InputAdornment position="end">Hr</InputAdornment>}
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
    </div>
  );
}
