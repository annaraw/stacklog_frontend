import * as React from 'react';
import { IBacklogItem, Column, ICalendar, ICalendarItem } from '../../../models/models'
import styled from 'styled-components'
import { CalendarDay } from './CalendarDay';

interface BoardColumnProps {
  columns: Column[],
  items: IBacklogItem[]
  calendars: ICalendar[]
}

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Calendar: React.FC<BoardColumnProps> = (props) => {

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
    <div>

      <BoardEl>
        {/*new Date(c.id) > new Date()*/
          props.columns.map((col) => col.id.split("-")[0])
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .filter((col) => col !== 'backlog')
            .map((col) => <CalendarDay key={col} columns={getDayColumns(col)} day={col} items={props.items} calEvents={getEventsOfDay(col)} />)

        }
      </BoardEl>
    </div>
  );
};