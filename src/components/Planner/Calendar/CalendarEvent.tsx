import * as React from 'react'
import { ICalendarItem } from '../../../models/models'
import { hourHeight_int } from '../../../util/constants'
import { calendarEventStyles } from './CalendarEventStyles'
import { Popover } from '@material-ui/core'

// Define types for board item element properties
interface BoardItemProps {
  index: number
  calItem: ICalendarItem
}

// isDragDisabled
// Create and export the BoardItem component
export const CalendarEvent = (props: BoardItemProps) => {
  const classes = calendarEventStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getHeight = (calItem: ICalendarItem) => {
    const startHour = new Date(calItem.dtStart).getHours()
    const endHour = new Date(calItem.dtEnd).getHours()
    return (endHour - startHour) * hourHeight_int + "px"
  }

  const calendarEvent = {
    title: props.calItem.summary,
    description: props.calItem.description,
    startDate: new Date(props.calItem.dtStart),
    endDate: new Date(props.calItem.dtEnd),
    location: props.calItem.location,
    url: props.calItem.url,
  }

  return (
    <>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={() => setTimeout(() => {
          handlePopoverClose()
        }, 200)}
        className={classes.event}
        style={{ 
          height: getHeight(props.calItem),
        }}
      >
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div
          //style={{ height: getHeight(props.calItem) }}
          className={classes.eventCard}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <p><b>{calendarEvent.title}</b></p>
          <div><span>Start: {calendarEvent.startDate.getHours()}:{calendarEvent.startDate.getMinutes()}0</span></div>
          <div><span>End: {calendarEvent.endDate.getHours()}:{calendarEvent.endDate.getMinutes()}0</span></div>
        </div>
      </Popover>
    </>
  )
}