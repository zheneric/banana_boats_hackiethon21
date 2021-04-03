import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function TaskPanel(props) {
  const classes = useStyles();

  const { isOpen, setIsOpen } = props;

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
        <Button onClick={() => setIsOpen(!isOpen)}>Open Close too</Button>
      </Drawer>
    </nav>
  );
}
