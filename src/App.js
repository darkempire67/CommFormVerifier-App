import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import fire from "./fire";
import "./App.css";
import LogIn from "./components/LogIn";
import Hero from "./components/Hero";
import axios from "axios";
import CommForm from "./components/CommForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [officeKey, setOfficeKey] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [officeKeyError, setOfficeKeyError] = useState("");
  const [commForms, setCommForms] = useState([]);
  const [dataError, setDataError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setOfficeKey("");
  };
  const clearError = () => {
    setEmailError("");
    setPasswordError("");
    setOfficeKeyError("");
  };
  const handleLogIn = () => {
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearError();
    if (!(officeKey === process.env.REACT_APP_OFFICE_KEY)) {
      setOfficeKeyError("Check with Admin for the Key");
      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };
  const handleLogOut = () => {
    fire.auth().signOut();
  };
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
    // see if it keeps getting new values
  }, []);

  async function getCommForms() {
    try {
      const res = await axios.get(process.env.REACT_APP_URL_GET);
      setCommForms(res.data);
    } catch (err) {
      setDataError(err);
    }
  }
  return (
    <div className='App'>
      {user ? (
        <Hero
          handleLogOut={handleLogOut}
          getCommForms={getCommForms}
          commForms={commForms}
          user={user}
        />
      ) : (
        <LogIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogIn={handleLogIn}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          officeKey={officeKey}
          setOfficeKey={setOfficeKey}
          officeKeyError={officeKeyError}
        />
      )}
    </div>
  );
}

export default App;
