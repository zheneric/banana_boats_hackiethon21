import React, { useState, Component, Children } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { MainPage } from "./main-page";

import "./App.css";

function App() {
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="App">
      if the user is logged in show the main page else if the use is not logged
      in show the login page
      <MainPage />
    </div>
  );
}

export default App;
