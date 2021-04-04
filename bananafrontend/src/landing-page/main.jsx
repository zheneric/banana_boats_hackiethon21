import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { AppBar, Collapse } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import example_cal from "./img/example_cal2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    height: "100vh",
    fontFamily: "Poppins",
    backgroundColor: "#091232",
  },
  appbar: {
    background: "none",
    backgroundColor: "#091232",
    padding: "1rem",
  },
  appbarTitle: {
    color: "#FFF",
    fontSize: "2rem",
    flexGrow: "1",
    width: "80%",
    margin: "0 auto",
    textAlign: "left",
  },
  columnLeft: {
    margin: "100px",
  },
  mainText: {
    color: "#FFF",
    fontSize: "4rem",
    flexGrow: "1",
    textAlign: "left",
  },
  column: {
    margin: "6rem",
  },
  demoPageRoot: {
    minHeight: "100vh",
    alignItems: "center",
    // display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    padding: "5rem",
    backgroundColor: "#FFF",
  },
  demoVideo: {
    textAlign: "center",
  },
}));

function SignInButton() {
  return (
    <Button variant="contained" color="#FFF">
      Sign in with Google
    </Button>
  );
}

export function LandingPage() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <AppBar className={classes.appbar} elevation={0}>
          <h1 margin="96" className={classes.appbarTitle}>
            Timeit.
          </h1>
        </AppBar>

        <Collapse
          in={checked}
          {...(checked ? { timeout: 1500 } : {})}
          collapsedHeight={50}
        >
          <div className={classes.container}>
            <Grid className={classes.column} container spacing={6}>
              <Grid item xs={6}>
                <h1 className={classes.mainText}>
                  Unlock your calendar's full potential today.
                </h1>
                <br></br>
                <SignInButton />
              </Grid>
              <Grid item xs={6}>
                <img src={example_cal} alt="Logo" />
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </div>
      <div className={classes.demoPageRoot}>
        <h1 style={({ color: "#000" }, { textAlign: "left" })}>
          The simple, easy and fun way to get stuff done.
        </h1>
        <h1>Put a video/image here ?</h1>
        <SignInButton />
      </div>
    </div>
  );
}
