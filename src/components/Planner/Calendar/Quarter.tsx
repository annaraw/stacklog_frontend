import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import {CalendarItem} from './CalendarItem';
import {CalendarEvent} from './CalendarEvent';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface BoardColumnProps {
  column: Column,
  index: number,
  items: IBacklogItem[]
  events: ICalendarItem[]
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}
type BoardWrapperContentStylesProps = {
  items: number
  events: number
}

const BoardColumnWrapper = styled.div<BoardWrapperContentStylesProps>`
  display:flex;
  background-color: #e5eff5;
  border-radius: 4px;
  z-index: 1;
  height:${props => props.items != 0 ? props.items*24+'px' : '28px'};
  border: solid;
  border-width: thin;
`

const BoardColumnTitle = styled.div`
  font: 14px sans-serif;
  width: 55px;
`

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
  width: 100%
  
`

export const Quarter: React.FC<BoardColumnProps> = (props) => {
    return (
      <BoardColumnWrapper items={props.column.itemsIds.length} events={props.events.length}>
        <BoardColumnTitle>
          {props.index+":00"}
        </BoardColumnTitle>
        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.column.itemsIds.map((id: String, index: number) => {

                const item = props.items.filter((item) => item.id == id)[0]

                return (
                    <CalendarItem
                      key={item.id}
                      index={index} 
                      item={item}
                    />
                  )
              }
                    
                )}
              {provided.placeholder}
              {props.events.map((calItem:ICalendarItem, index: number) => {
                return (
                    <CalendarEvent
                      key={calItem.id}
                      index={index} 
                      calItem={calItem}
                    />
                  )
              })}
            </BoardColumnContent>
          )}
        </Droppable>
      </BoardColumnWrapper>
    );

};