import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Spinner } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { signin } from "./RouteAccess"
import AuthApi from "./AuthApi";
import Alert from '../messages/alerts/alert';

import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Collegemate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  const authApi = React.useContext(AuthApi);
  const [user, setUser] = useState({
    unique_id: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [Aopen, setAOpen] = useState(false);
  const [PassValues, setPassValues] = useState({
    password: "",
    showPassword: false
  });

  const PassHandleChange = prop => event => {
    setPassValues({ ...PassValues, [prop]: event.target.value });
    handleChange(event);
  };

  const handleClickShowPassword = () => {
    setPassValues({ ...PassValues, showPassword: !PassValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const AhandleClick = () => {
    setAOpen(true);
  };

  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  const submit = async (e) => {
    setLoad(true);
    e.preventDefault(); 
    const res = await signin(user);
    if (res.data.auth) {
      authApi.setAuth(true);
    }
    else {
      setLoad(false);
      AhandleClick();
    }
  };
  return (
    <>
      <div
        className="outer-container"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          height: "100vh",
          background: "#fff"
        }}
      >
        <div
          className="inner-container"
          style={{
            display: "block",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Container component="main" spacing={2} maxWidth="xs">
            <LockOpenOutlinedIcon
              style={{
                padding: "10px",
                background: "#009688",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "3rem"
              }}
            />
            <Typography style={{ margin: "10px" }} component="h1" variant="h4">
              Sign In
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="unique_id"
                    name="unique_id"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    label="ID Number"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth required={true} >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                     </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={PassValues.showPassword ? "text" : "password"}
                      value={PassValues.password}
                      fullWidth
                      name="password"
                      onChange={PassHandleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {PassValues.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#009688", color: "#fff" }}
                    onClick={submit}
                  >
                    Sign In &nbsp;{load && <Spinner animation="border" size="sm" />}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/signup" variant="body2" style={{ display: 'block' }}>
                    Don't have an account? Sign Up
                  </Link>
                  <Link href="/forgot" variant="body2" style={{ display: 'block' }}>
                    Forgot Password?
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
              <Alert onClose={AhandleClose} severity="error">
                ID Number or Password is Invalid!
              </Alert>
            </Snackbar>
          </Container>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </div>
    </>
  );
}

export default SignIn;