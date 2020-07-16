import * as React from 'react';
import { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader, IconButton, CardContent, Typography, Menu, MenuItem, ListItemText, Snackbar, Button, CardActions, Chip, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import { backlogItemStyles } from './BacklogItemStyles';
import { Priority } from '../../../models/models';

const BacklogItem: FunctionComponent<{ title: String, description: string, category: string, priority: number, id: any, index: number, dueDate?: Date }> = props => {

  const { title, description, category, priority, id, index, dueDate } = props;

  const classes = backlogItemStyles()

  const priorityColor = () => {
    if (priority.toString() === "high") {
      return "#ff928a"
    } else if (priority.toString() === "medium") {
      return "#c0c0c0"
    }
    else if (priority.toString() === "low") {
      return "#ededed"
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root} key={id}>
            <CardHeader
              title={
                <>
                  <Typography className={classes.cardHeaderFont}>
                    <p className={classes.ellipsis}>{title}</p>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="div" className={classes.description}>
                    <p className={classes.ellipsis}>{description ? description : ""}</p>
                  </Typography>
                </>
              }
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <div className={classes.chipBox}>
                <Tooltip title="Category"><Chip className={classes.chip} label={category ? category : "No Category"} /></Tooltip>
                <Tooltip title="Priority"><Chip className={classes.chip} label={priority} style={{backgroundColor: priorityColor()}}/></Tooltip>
                {dueDate && <Tooltip title="Due Date"><Chip className={classes.chip} label={new Date(dueDate).getFullYear()+"-"+new Date(dueDate).getMonth()+"-"+new Date(dueDate).getDate()} /></Tooltip>}
              </div>
              <div className={classes.buttonBox}>
                <Tooltip title="Edit">
                  <IconButton aria-controls="simple-menu" aria-haspopup="true" className={classes.button}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {<Tooltip title="Mark as completed">
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.button}
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default BacklogItem;