import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import TextField from "@mui/material/TextField";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { auth, Providers } from "../../firebase.config";
import CustomTabPanel from "./CustomTabPanel";

export default function AuthDialog({ onClose, open, defaultOpenTab }) {
  const [activeTab, setActiveTab] = useState(defaultOpenTab);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [formSignIn, setFormSignIn] = useState({ email: "", password: "" });
  const [formSignUp, setFormSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setActiveTab(defaultOpenTab);
  }, [defaultOpenTab]);

  useEffect(() => {
    if (
      formSignUp.confirmPassword !== "" &&
      formSignUp.password !== formSignUp.confirmPassword
    ) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }, [formSignUp.password, formSignUp.confirmPassword]);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const signInWithPassword = () => {
    setDisabled(true);
    signInWithEmailAndPassword(auth, formSignIn.email, formSignIn.password)
      .then(() => {
        setDisabled(false);
        setErrorMessage("");
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setDisabled(false);
      });
  };

  const signUpWithPassword = () => {
    if (formSignUp.password !== formSignUp.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    setDisabled(true);
    createUserWithEmailAndPassword(auth, formSignUp.email, formSignUp.password)
      .then(() => {
        setDisabled(false);
        setErrorMessage("");
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setDisabled(false);
      });
  };

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(() => {
        setDisabled(false);
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setDisabled(false);
      });
  };

  return (
    <Dialog onClose={onClose} open={open} className="auth-dialog">
      <Box sx={{ width: "100%", p: 2 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CustomTabPanel value={activeTab} index={0}>
          <Button
            onClick={signInWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            disabled={disabled}
            className="google-btn"
          >
            Sign in with Google
          </Button>
          <hr className="divider" />
          <TextField
            name="email"
            onChange={(e) => handleInputChange(e, setFormSignIn)}
            value={formSignIn.email}
            label="Email"
            variant="outlined"
            fullWidth
            className="auth-input"
          />
          <TextField
            name="password"
            onChange={(e) => handleInputChange(e, setFormSignIn)}
            value={formSignIn.password}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="auth-input"
          />
          <Button
            onClick={signInWithPassword}
            variant="contained"
            disabled={disabled}
            fullWidth
            className="auth-btn"
          >
            Sign In
          </Button>
          <p className="error-message">{errorMessage}</p>
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <Button
            onClick={signInWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            disabled={disabled}
            className="google-btn"
          >
            Sign up with Google
          </Button>
          <hr className="divider" />
          <TextField
            name="email"
            onChange={(e) => handleInputChange(e, setFormSignUp)}
            value={formSignUp.email}
            label="Email"
            variant="outlined"
            fullWidth
            className="auth-input"
          />
          <TextField
            name="password"
            onChange={(e) => handleInputChange(e, setFormSignUp)}
            value={formSignUp.password}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="auth-input"
          />
          <TextField
            name="confirmPassword"
            onChange={(e) => handleInputChange(e, setFormSignUp)}
            value={formSignUp.confirmPassword}
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            className="auth-input"
          />
          <Button
            onClick={signUpWithPassword}
            variant="contained"
            disabled={disabled}
            fullWidth
            className="auth-btn"
          >
            Sign Up
          </Button>
          <p className="error-message">{errorMessage}</p>
        </CustomTabPanel>
      </Box>
    </Dialog>
  );
}
