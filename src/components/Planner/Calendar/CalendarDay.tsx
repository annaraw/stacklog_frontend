import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import { Hour } from './Hour';
import { calendarDayStyles } from './CalendarDayStyles';


interface BoardColumnProps {
  columns: Column[],
  day: string
  items: IBacklogItem[]
  calEvents: ICalendarItem[][]
}

export const CalendarDay: React.FC<BoardColumnProps> = (props) => {

  const classes = calendarDayStyles();
  new Date().toDateString()
  return (
    <div className={classes.day + (props.day !== new Date().toDateString()
      ? " " + classes.weekday
      : "")
    }>
      <p className={classes.title}>
        {props.day}
      </p>
      <div>
        {props.columns.map((col, index) => {
          return (
            <Hour
              key={col.id}
              column={col}
              index={index}
              items={props.items}
              events={props.calEvents[0] ? props.calEvents[0]
                .filter((calItem: ICalendarItem) => new Date(calItem.dtStart).getHours() === index)
                .map((calItem: ICalendarItem) => calItem) : []}
            />
          )
        })}
      </div>
    </div>
  );

};