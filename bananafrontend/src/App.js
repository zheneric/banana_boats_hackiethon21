import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  const [userIsAuth, setUserIsAuth] = useState(false);

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
            <p>PAGE 2</p>
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
