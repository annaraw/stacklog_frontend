import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Card, CardHeader, Typography, CardContent, Chip, Tooltip, IconButton, Popover } from '@material-ui/core'
import { title } from 'process'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { calendarItemStyles } from './CalendarItemStyles'

// Define types for board item element properties
type BoardItemProps = {
  index: number
  item: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
  index: number
  /*height: string*/
}

// Create style for board item element
/*const BoardItemEl = styled.div<BoardItemStylesProps>`
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  height:  ${props => props.height};
  ${(props) => {if (!props.isDragging) {return ('position: absolute')}}};
  ${(props) => {if (props.isDragging) {return ('max-height: 10px')}}};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  &:hover {
    background-color: #0099FF;
  }

  & + & {
    margin-top: 4px;
    margin-bottom: 4px;
  }
`*/

const BoardItemEl = styled.div<BoardItemStylesProps>`
  background-color: ${(props) => props.isDragging ? '#6AFFA1' : '#00FF5E'};
  border-radius: 4px;
  width: 85px;
  height: 20px;
  z-index: ${props => props.isDragging ? 3 : 2};;
  position:relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 4px;
  transition: background-color .25s ease-out;
  &:hover {
    background-color: #0099FF;
  }

   
`

// isDragDisabled
// Create and export the BoardItem component
export const CalendarItem = (props: BoardItemProps) => {
  const { item } = props

  const classes = calendarItemStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return <Draggable draggableId={props.item.id} index={props.index}>
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
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={() => setTimeout(() => {
                    handlePopoverClose()
                  }, 200)}
                >
                  <EditIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
              {<Tooltip title="Mark as completed">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  className={classes.button}
                >
                  <DoneIcon className={classes.icon} />
                </IconButton>
              </Tooltip>}
            </div>
          </CardContent>
        </Card>
        {/* <Popover
          id="mouse-over-popover"
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
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
                <Chip className={classes.chip} label={item.category ? item.category : "No Category"} />
                <Chip className={classes.chip} label={item.priority} />
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
        </Popover> */}
      </div>
    )}
  </Draggable>
}