import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import {
  Card, CardHeader, IconButton, CardContent, Typography,
  Snackbar, Button, CardActions, Chip, Tooltip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import { backlogItemStyles } from './BacklogItemStyles';
import { Priority, IBacklogItem } from '../../../models/models';
import BacklogItemForm from '../../BacklogItemForm/BacklogItemForm';
import BacklogItemService from '../../../services/BacklogItemService';
import { Alert } from '@material-ui/lab';

interface BacklogItemProps {
  item: IBacklogItem,
  index: number,
  items: IBacklogItem[]
  setBacklogItems: (items: IBacklogItem[]) => void
}

const BacklogItem: FunctionComponent<BacklogItemProps> = props => {

  const { item, index, items, setBacklogItems } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(item.completed)
  const [error, setError] = useState<boolean>(false)

  const classes = backlogItemStyles()

  const priorityColor = () => {
    if (item.priority.toString() === "high") {
      return "#ff928a"
    } else if (item.priority.toString() === "medium") {
      return "#c0c0c0"
    }
    else if (item.priority.toString() === "low") {
      return "#ededed"
    }
  }

  const setCompleted = async () => {
    let completed: boolean = !complete
    setComplete(completed)
    setError(false)
    try {
      await BacklogItemService.updateBacklogItem(item.id, { completed: completed })
    } catch (error) {
      setComplete(!completed)
      setError(true)
    }
  }

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card className={classes.root} key={item.id}>
              <CardHeader
                title={
                  <>
                    <Typography className={classes.cardHeaderFont}>
                      <p className={classes.ellipsis}>{item.title}</p>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" className={classes.description}>
                      <p className={classes.ellipsis}>{item.description ? item.description : ""}</p>
                    </Typography>
                  </>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.chipBox}>
                  <Tooltip title="Category"><Chip className={classes.chip} label={item.category ? item.category : "No Category"} /></Tooltip>
                  <Tooltip title="Priority"><Chip className={classes.chip} label={item.priority} style={{ backgroundColor: priorityColor() }} /></Tooltip>
                  {item.dueDate &&
                    <Tooltip title="Due Date">
                      <Chip
                        className={classes.chip}
                        label={new Date(item.dueDate).getFullYear() + "-" + new Date(item.dueDate).getMonth() + "-" + new Date(item.dueDate).getDate()}
                      />
                    </Tooltip>}
                </div>
                <div className={classes.buttonBox}>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.button}
                      onClick={() => setIsOpen(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {<Tooltip title="Mark as completed">
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.button + " " + ((complete) ? classes.checkbox : "")}
                      onClick={() => setCompleted()}
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
      {isOpen &&
        < BacklogItemForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formTitle={"Edit '" + item.title + "'"}
          item={item}
          items={items}
          setBacklogItems={setBacklogItems}
          formType={"Update"}
        />
      }

      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity={"error"}>
          An Error occurred while updating the item
        </Alert>
      </Snackbar>
    </>
  );
};

export default BacklogItem;