import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import ShowDetails from "../dialogs/details/MaterialDetails";

function MaterialCard(props) {
  return (
    <Card elevation={3} style={{
      borderRadius: "10px", padding: "3px"
    }}>
      <CardContent>
        <div className="top">
          <span className="due-date">
            {props.subName}
          </span>
          <span className="material-type">
            {props.materialType}
          </span>
        </div>
        <h2 className="material-title">
          {props.title}
        </h2>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }} >
        <ShowDetails data={props} />
        <IconButton color="primary" style={{ padding: '7px' }} onClick={() => {
          window.open(props.url, "_blank");
        }}>
          <GetAppOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card >
  );
}

export default MaterialCard;