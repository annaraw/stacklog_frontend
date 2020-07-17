import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import { Hour } from './Hour';
import { calendarDayStyles } from './CalendarDayStyles';
import { dayStart } from '../../../util/constants';


interface BoardColumnProps {
  columns: Column[],
  day: string
  items: IBacklogItem[]
  calEvents: ICalendarItem[][]
  setBacklogItems: (items: IBacklogItem[]) => void
}

export const CalendarDay: React.FC<BoardColumnProps> = (props) => {

  const { columns, items, day, calEvents, setBacklogItems } = props
  const classes = calendarDayStyles();
  new Date().toDateString()
  return (
    <div className={classes.day + (day !== new Date().toDateString()
      ? " " + classes.weekday
      : "")
    }>
      <p className={classes.title}>
        {day}
      </p>
      <div>
        {columns.map((col, index) => {
          return (
            <Hour
              key={col.id}
              column={col}
              index={index}
              items={items}
              setBacklogItems={setBacklogItems}
              events={calEvents[0] ? calEvents[0]
                .filter((calItem: ICalendarItem) => new Date(calItem.dtStart).getHours() === index + dayStart)
                .map((calItem: ICalendarItem) => calItem) : []}
            />
          )
        })}
      </div>
    </div>
  );

};