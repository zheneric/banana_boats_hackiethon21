import React, { useState, Component, Children } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import "./App.css";

function App() {
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="App">
      <Router>
        <div>
          <p>hello world!</p>

          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/page2">Page 2</Link>
          </p>
          <p>
            <Link to="/page3">Page 3</Link>
          </p>
        </div>

        <hr />
        <Switch>
          <Route path="/page2">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowText(!showText)}
            >
              click here to show text
            </Button>
            {showText && (
              <p>
                FOO BAR HSJKGDLJSLKDJDGSLDSKJLJGDKSLJGDSKJGSDLKDGjklfjgdkldfjgkl
              </p>
            )}
          </Route>
          <Route path="/page3">
            <p>PAGE 3</p>
          </Route>
          <Route path="/">
            <p>HOME PAGE</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
