import * as React from 'react';
import { IBacklogItem, Column } from '../../../models/models'
import {CalendarItem} from './CalendarItem';
import {Quarter} from './Quarter';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface BoardColumnProps {
  columns: Column[],
  day: string
  items: IBacklogItem[]
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
    return (
      <BoardColumnWrapper>
        <BoardColumnTitle>
          {props.day}
        </BoardColumnTitle>
            <BoardColumnContent>
              {props.columns.map((col,index) => {
                return (
                  <Quarter
                      key={col.id}
                      column={col}
                      index= {index}
                      items={props.items}
                    />
                )
              })}
            </BoardColumnContent>
      </BoardColumnWrapper>
    );

};