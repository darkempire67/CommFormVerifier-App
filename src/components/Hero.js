import React, { useEffect } from "react";
import { makeStyles, formatMs } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { purple, blue, red, green, pink } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";
import { findByLabelText } from "@testing-library/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import HHero from "./Hero";
import CommForm from "./CommForm";
import LogIn from "./LogIn";
function Hero(props) {
  const { handleLogOut, getCommForms, commForms, user } = props;
  useEffect(() => {
    getCommForms();
    //console.log(commForms);
  }, []);

  const delCommForm = async (id) => {
    try {
      const url_ = process.env.REACT_APP_URL_GET + "/" + id;
      console.log(url_);
      const getCommForm = await axios.delete(url_);
      const item = await getCommForm.json();
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  };
  const useStyles = makeStyles((theme) => ({
    blue: {
      color: "#fff",
      backgroundColor: blue[500],
    },
    red: {
      color: "#fff",
      backgroundColor: red[500],
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      padding: "0 2rem 2rem 2rem",
      minWidth: 800,
      display: "block",
      overflow: "auto",
      maxHeight: 800,
      flexDirection: "column",
      margin: "0 3rem 3rem 3rem",
    },
    link: {
      textDecoration: "none",
      color: "#a1c4fd",
    },
    title: {
      color: "white",
      position: "sticky",
      top: 0,
      display: "block",
      zIndex: 1,
      background: "#273c75",
      padding: "0 2rem 2rem 2rem",
      justifyContent: "center",
      borderRadius: "10px",

      margin: "3rem 3rem 0 3rem",
    },
  }));
  const classes = useStyles();

  const callDel = (id) => (e) => {
    delCommForm(id);
    getCommForms();
  };

  return (
    <Router>
      <Switch>
        <Route path='/commform/:id' component={CommForm} />

        <section className='hero'>
          <nav>
            <h2>Welcome Equity Smart Staff</h2>
            <button onClick={handleLogOut}>Logout</button>
          </nav>
          <Grid item xs={12}>
            <div className={classes.title}>
              <button onClick={getCommForms}>refresh</button>
              <Typography variant='h5' align='center'>
                Commission Forms Submitted
              </Typography>
            </div>
            <div className={classes.demo}>
              <List>
                {commForms.map((form) => (
                  <ListItem
                    button
                    key={form._id}
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={form.verified ? classes.green : classes.blue}
                      >
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Link
                      className={classes.link}
                      to={`/commform/${form._id}`}
                      key={form._id}
                    >
                      <ListItemText
                        color='primary'
                        className={classes.link}
                        button='true'
                        primary={[form.firstName, " ", form.lastName]}
                        secondary={form.fundedDate}
                      />{" "}
                    </Link>
                    <Avatar className={classes.avatar_blue}>
                      {String(form.firstName).charAt(0)}
                      {String(form.lastName).charAt(0)}
                    </Avatar>

                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={callDel(form._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>{" "}
            </div>
          </Grid>
        </section>
      </Switch>
    </Router>
  );
}
export default Hero;
