import React, { useState } from "react";

import { TaskPanel } from "./task-panel";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

export function MainPage(props) {
  const [taskPanelOpen, setTaskPanelOpen] = useState(true);

  return (
    <div>
      <CssBaseline />
      <TaskPanel isOpen={taskPanelOpen} setIsOpen={setTaskPanelOpen} />
      <Button onClick={() => setTaskPanelOpen(!taskPanelOpen)}>
        Open close
      </Button>
    </div>
  );
}
