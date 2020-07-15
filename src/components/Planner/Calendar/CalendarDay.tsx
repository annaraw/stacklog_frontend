import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import { Hour } from './Hour';
import styled from 'styled-components'


interface BoardColumnProps {
  columns: Column[],
  day: string
  items: IBacklogItem[]
  calEvents: ICalendarItem[][]
}

const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #FFFFFF;
  border-radius: 4px;
  width: 150px;

  & + & {
    margin-left: 12px;
  }
`

const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`

const BoardColumnContent = styled.div`
  min-height: 20px;
  border-radius: 4px;
`

export const CalendarDay: React.FC<BoardColumnProps> = (props) => {

  return (
    <BoardColumnWrapper>
      <BoardColumnTitle>
        {props.day}
      </BoardColumnTitle>
      <BoardColumnContent>
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
      </BoardColumnContent>
    </BoardColumnWrapper>
  );

};