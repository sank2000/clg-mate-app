import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "react-bootstrap";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from '@material-ui/icons/Close';
import AuthApi from "../auth/AuthApi";
import { updateAccount } from "../auth/RouteAccess";
import { signin } from "../auth/RouteAccess";
import Alert from '../messages/alerts/alert';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#ff1a1a',
  },
});

export default function Detail() {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });

  const handleDialogOpen = () => { setDialogOpen(true); };

  const handleDialogClose = () => { setDialogOpen(false); };

  const submitPassword = async () => {
    setLoad(true);
    const res = await signin({ unique_id: user.unique_id, password: password });
    setLoad(false);
    if (res.data.auth) {
      handleDialogClose();
      handleShow();
    }
    else {
      setMsg({
        content: "Incorrect Password",
        type: "error"
      });
      setOpen(true);
    }
  }

  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const intialValues = {
    name: user.name,
    url: user.url,
    email: user.email
  };

  const submit = async (values) => {
    setLoad(true);
    const res = await updateAccount(values);
    setLoad(false);
    if (res.data.done) {
      setMsg({
        content: res.data.message,
        type: "success"
      });
      setOpen(true);
      authApi.setAuth({ ...user, ...values });
      handleShow();
    }
    else {
      setMsg({
        content: res.data.message,
        type: "error"
      });
      setOpen(true);
    }
  };

  const ValidationSchema = Yup.object({
    name: Yup.string()
      .required("Field required !")
      .min(3),
    email: Yup.string()
      .required("Field required !")
      .email("Invalid Email"),
    url: Yup.string().url()
  });

  const formik = useFormik({
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      submit(values);
    }
  });

  const MDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const MDialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const MDialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  return (
    <>
      <IconButton
        style={{ float: "right", outline: "none" }}
        onClick={handleDialogOpen}
      >
        <EditOutlinedIcon />
      </IconButton>
      <Dialog onClose={handleClose} scroll='body' aria-labelledby="customized-dialog-title" open={show}>
        <MDialogTitle disableTypography id="customized-dialog-title" onClose={handleClose}>
          <Typography component="span" variant="h5"> Edit </Typography>
        </MDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <MDialogContent dividers style={{ padding: '15px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  {...formik.getFieldProps("name")}
                  helperText={formik.touched.name && formik.errors.name}
                  error={
                    formik.touched.name && formik.errors.name !== undefined
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  {...formik.getFieldProps("email")}
                  helperText={formik.touched.email && formik.errors.email}
                  error={
                    formik.touched.email && formik.errors.email !== undefined
                  }
                  size="small"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="url"
                  helperText={formik.touched.url && formik.errors.url}
                  error={formik.touched.url && formik.errors.url !== undefined}
                  {...formik.getFieldProps("url")}
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Image URL"
                />
              </Grid>
            </Grid>
          </MDialogContent>
          <MDialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit &nbsp;
              {load && <Spinner animation="border" size="sm" />}
            </Button>
          </MDialogActions>
        </form>
      </Dialog>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm your password to edit your information
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitPassword} color="primary">
            Ok  {load && <Spinner animation="border" size="sm" />}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
