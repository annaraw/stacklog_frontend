import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Card, CardHeader, Typography,
  CardContent, Tooltip, IconButton, Snackbar
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { calendarItemStyles } from './CalendarItemStyles'
import BacklogItemService from '../../../services/BacklogItemService'
import BacklogItemForm from '../../BacklogItemForm/BacklogItemForm'
import { Alert } from '@material-ui/lab'
import { IBacklogItem } from '../../../models/models'
import { useState } from 'react'

// Define types for board item element properties
interface CalendarItemProps {
  index: number
  item: IBacklogItem
  items: IBacklogItem[]
  setBacklogItems: (items: IBacklogItem[]) => void
}

// isDragDisabled
// Create and export the BoardItem component
export const CalendarItem = (props: CalendarItemProps) => {
  const { item, items, setBacklogItems } = props

  const classes = calendarItemStyles()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(item.completed)
  const [error, setError] = useState<boolean>(false)

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
      <Draggable draggableId={props.item.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          //isDragging={snapshot.isDragging}
          //index={props.index}
          /*height='100px'*/
          >
            <Card className={classes.root} key={item.id}>
              <CardHeader
                title={
                  <>
                    <Typography className={classes.cardHeaderFont}>
                      <p className={classes.ellipsis}>{item.title}</p>
                    </Typography>
                  </>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.buttonBox}>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.button}
                      onClick={() => setIsOpen(true)}
                    >
                      <EditIcon className={classes.icon} />
                    </IconButton>
                  </Tooltip>
                  {<Tooltip title="Mark as completed">
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.button + " " + ((complete) ? classes.checkbox : "")}
                      onClick={() => setCompleted()}
                    >
                      <DoneIcon className={classes.icon} />
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
  )
}