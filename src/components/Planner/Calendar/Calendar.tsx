import * as React from 'react';
import { IBacklogItem, Column, ICalendar, ICalendarItem } from '../../../models/models'
import styled from 'styled-components'
import { CalendarDay } from './CalendarDay';
import { calendarStyles } from './CalendarStyles';
import Scrollbar from 'react-scrollbars-custom';
import AddCalendarForm from '../../CalendarForm/AddCalendarForm';

interface BoardColumnProps {
  columns: Column[],
  items: IBacklogItem[]
  calendars: ICalendar[]
}

export const Calendar: React.FC<BoardColumnProps> = (props) => {

  const classes = calendarStyles();

  function getDayColumns(day: string) {
    return props.columns.filter((col) => col.id.split("-")[0] === day)
  }

  function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate()
  }

  function getEventsOfDay(day: string) {
    return props.calendars
      .map((cal: ICalendar) => cal ? cal.items
        .filter((calItem: ICalendarItem) => sameDay(new Date(calItem.dtStart), new Date(day)))
        .map((calItem: ICalendarItem) => calItem) : []
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
              props.columns.map((col) => col.id.split("-")[0])
                .filter((item, i, ar) => ar.indexOf(item) === i)
                .filter((col) => col !== 'backlog' && col === new Date().toDateString())
                .map((col) => <CalendarDay key={col} columns={getDayColumns(col)} day={col} items={props.items} calEvents={getEventsOfDay(col)} />)
            }
          </Scrollbar>
        </div>
      </div>
      <div className={classes.calendar}>
        <div className={classes.menubar}>
          <div className={classes.calendarTitle}>Calendar</div>
          <div className={classes.importButton}>
            <AddCalendarForm />
          </div>
        </div>
        <div className={classes.calendarContent}>
          <Scrollbar className={classes.schedule}
            style={{
              margin: "0 20px",
            }}>
            <div className={classes.weekdays}>


              {
                props.columns.map((col) => col.id.split("-")[0])
                  .filter((item, i, ar) => ar.indexOf(item) === i)
                  .filter((col) => col !== 'backlog' && col !== new Date().toDateString())
                  .map((col) => <CalendarDay key={col} columns={getDayColumns(col)} day={col} items={props.items} calEvents={getEventsOfDay(col)} />)
              }

            </div>
          </Scrollbar >
        </div>
      </div>
    </div >
  );
};