import * as React from 'react';
import { IBacklogItem, Column, ICalendar, ICalendarItem } from '../../../models/models'
import { CalendarDay } from './CalendarDay';
import { calendarStyles } from './CalendarStyles';
import Scrollbar from 'react-scrollbars-custom';
import AddCalendarForm from '../../Forms/CalendarForm/AddCalendarForm';
import ManageCalendarsForm from '../../Forms/CalendarForm/ManageCalendarsForm';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface BoardColumnProps {
  columns: Column[],
  items: IBacklogItem[]
  calendars: ICalendar[]
  setBacklogItems: (items: IBacklogItem[]) => void
  setCalendars: (calendars: ICalendar[]) => void
}

export const Calendar: React.FC<BoardColumnProps> = (props) => {

  const { columns, items, calendars, setBacklogItems,setCalendars } = props
  const classes = calendarStyles();

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  function getDayColumns(day: string) {
    return columns.filter((col) => col.id.split("-")[0] === day)
  }

  function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate()
  }

  function getEventsOfDay(day: string) {
    return calendars
      .map((cal: ICalendar) => cal ? cal.items
        .filter((calItem: ICalendarItem) => sameDay(new Date(calItem.dtStart), new Date(day)))
        .map((calItem: ICalendarItem) => {
          if (!calItem.color) {calItem.color = cal.color}
            return calItem
        }) : []
      )
  }

  return (
    <div className={classes.calendars}>
      <div className={classes.calendar}>
        <div className={classes.menubar}>
          <div className={classes.calendarTitle}>Today</div>
        </div>
        <div className={classes.calendarContent}>
          <Scrollbar className={classes.schedule}
            style={{
              width: "400px",
            }}>
            {
              columns.map((col) => col.id.split("-")[0])
                .filter((item, i, ar) => ar.indexOf(item) === i)
                .filter((col) => col !== 'backlog' && col === new Date().toDateString())
                .map((col) =>
                  <CalendarDay
                    key={col}
                    columns={getDayColumns(col)}
                    day={col}
                    items={items}
                    calEvents={getEventsOfDay(col)}
                    setBacklogItems={setBacklogItems}
                  />)
            }
          </Scrollbar>
        </div>
      </div>
      <div className={classes.calendar}>
        <div className={classes.menubar}>
          <div className={classes.calendarTitle}>Calendar</div>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Calendar Settings
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><AddCalendarForm calendars={calendars} setCalendars={setCalendars} /></MenuItem>
              <MenuItem onClick={handleClose}><ManageCalendarsForm calendars={calendars}/></MenuItem>
            </Menu>
          </div>
        </div>
        <div className={classes.calendarContent}>
          <Scrollbar className={classes.schedule}>
            <div className={classes.weekdays}>


              {
                columns.map((col) => col.id.split("-")[0])
                  .filter((item, i, ar) => ar.indexOf(item) === i)
                  .filter((col) => col !== 'backlog' && col !== new Date().toDateString())
                  .map((col) =>
                    <CalendarDay
                      key={col}
                      columns={getDayColumns(col)}
                      day={col}
                      items={items}
                      calEvents={getEventsOfDay(col)}
                      setBacklogItems={setBacklogItems}
                    />)
              }

            </div>
          </Scrollbar >
        </div>
      </div>
    </div >
  );
};