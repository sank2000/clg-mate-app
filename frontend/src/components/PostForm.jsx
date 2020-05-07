import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Btn from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { useHistory } from 'react-router';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'


function PostForm(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const applyMargin = {
    margin: "7px"
  };

  useEffect(handleShow);

  function handleC() {
    handleClose();
    history.push("/");
  }

  return (
    <>
      {/* <Button className="newPost" variant="outline-info" onClick={handleShow}>
        New Post
      </Button> */}

      <Modal show={show} onHide={handleC} centered size="lg" dialogClassName="border-radius-1" >
        <Modal.Header> {/* Remove this default close button and add custom one */}
          <h1 className="modal-title w-100 text-center">New Post</h1>
          <IconButton variant="outlined" onClick={handleC}><CloseOutlinedIcon style={{ color: "#e53935" }} /></IconButton>
        </Modal.Header>
        <Modal.Body>
          <div className="uploadform">
            <form action="/newpost" method="post">
              <TextField style={applyMargin}
                variant="outlined"
                required type="text"
                name="title"
                fullWidth
                label="Title" />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="author"
                fullWidth
                margin="dense"
                label="Author (To be removed after setting Login options)"
                size="small" />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="subName"
                label="Subject"
                className="halfWidth"
                size="small"
              />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="postType"
                label="Post Type"
                className="halfWidth"
                size="small"
              />
              <TextField style={applyMargin}
                variant="outlined"
                required
                name="description"
                rows={4}
                fullWidth
                multiline
                label="Description" />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="date"
                name="dueDate"
                label="Due Date"
                defaultValue={(new Date()).toISOString().split('T')[0]}
                id="datetime-local"
                size="small"
                InputLabelProps={{ shrink: true, }} />
              <div className="file-section" style={applyMargin}>
                <input type="hidden" name="url" value={props.url} />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="contained-button-file"
                  name="file"
                  onChange={props.handleChange}
                />
                <label htmlFor="contained-button-file">
                  <Btn variant="contained" component="span" disableElevation>
                    {props.fileChooseState}
                  </Btn>
                </label>
                <Btn
                  onClick={props.handleUpload}
                  size="medium"
                  variant="contained"
                  color="secondary"
                  style={{ float: "right" }}>
                  <CloudUploadOutlinedIcon
                    fontSize="small"
                    className="uploadIcon" />
                &nbsp; {props.progress}
                </Btn>
              </div>
              <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Btn>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostForm;
