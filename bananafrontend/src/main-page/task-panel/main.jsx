import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import { Appointments, DragDropProvider } from "@devexpress/dx-react-scheduler";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#091232",
    color: "#ffffff",
    position: "relative",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  taskCard: {
    margin: "20px",
  },
}));

export function TaskPanel(props) {
  const classes = useStyles();

  const { isOpen, setIsOpen, tasks, loading } = props;

  // Turn the tasks into components to show on screen
  const taskCards =
    !loading && tasks
      ? tasks.map((task) => {
          return (
            <Card className={classes.taskCard}>
              <CardContent>
                <Typography>Task: {task.title}</Typography>
                <Typography>Length: {task.length}</Typography>
              </CardContent>
            </Card>
          );
        })
      : [<p>No tasks</p>];

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        variant="persistent"
        open={isOpen}
      >
        <p>Task panel</p>
        <div>{taskCards}</div>
        <Button onClick={() => setIsOpen(!isOpen)}>Open Close too</Button>
      </Drawer>
    </nav>
  );
}
