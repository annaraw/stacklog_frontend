import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import {CalendarItem} from './CalendarItem';
import {Quarter} from './Quarter';
import { Droppable } from 'react-beautiful-dnd'
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
  background-color: #e5eff5;
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

{/*"2020-07-13T12:00:00.000Z"
events={props.calEvents.map((calItem:ICalendarItem)=> calItem.dtStart.getHours)}*/}
    return (
      <BoardColumnWrapper>
        <BoardColumnTitle>
          {props.day}
          {console.log("calEvents",props.calEvents[0] ? props.calEvents[0].map((calItem:ICalendarItem)=> new Date(calItem.dtStart).getHours()): [])}
        </BoardColumnTitle>
            <BoardColumnContent>
              {props.columns.map((col,index) => {
                return (
                  <Quarter
                      key={col.id}
                      column={col}
                      index= {index}
                      items={props.items}
                      events = {props.calEvents[0] ? props.calEvents[0]
                        .filter((calItem:ICalendarItem)=> new Date(calItem.dtStart).getHours() == index)
                        .map((calItem: ICalendarItem)=> calItem ): []}
                    />
                )
              })}
            </BoardColumnContent>
      </BoardColumnWrapper>
    );

};