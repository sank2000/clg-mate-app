import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';

export default function SimpleCard(props) {
  useEffect(() => {
  }, [props]);

  const useStyles = makeStyles({
    now: {
      background: "#0091ea",
      color: "#fff"
    },
    next: {
      background: "#00b8d4",
      color: "#fff"
    }
  });

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
      <Card elevation={5}
        className={
          props.when === "now"
            ? classes.now
            : props.when === "next"
              ? classes.next
              : null
        }
      >
        <CardContent>
          <Typography variant="overline" gutterBottom>
            {props.when}
          </Typography>
          <Grid container direction='row' spacing={2}>
            {props.per !== 0 &&
              <Grid item>
                <Avatar>{props.per}</Avatar>
              </Grid>
            }
            <Grid item>
              <Typography variant="h5" component="h3" gutterBottom>
                {props.subject}
              </Typography>
              <Typography variant="body2" component="p">
                {props.time}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {(props.when === "now" && props.progress !== undefined) && (
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={props.progress}
          />
        )}
      </Card>
    </Grid>
  );
}
