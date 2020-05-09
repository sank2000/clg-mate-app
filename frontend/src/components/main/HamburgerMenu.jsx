import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom";

import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";

import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ state, left: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Time Table"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <HomeWorkOutlinedIcon /> : <TodayOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["New Post", "New Material", "Expired Posts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <Link to="/newpost">
                <PostAddOutlinedIcon />
                </Link>
              ) : index === 1 ? (
                <LibraryAddOutlinedIcon />
              ) : (
                <ArchiveOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Report Abuse", "Send Feedback"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <ReportOutlinedIcon /> : <FeedbackOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Help", "About"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <ContactSupportOutlinedIcon /> : <InfoOutlinedIcon /> }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}