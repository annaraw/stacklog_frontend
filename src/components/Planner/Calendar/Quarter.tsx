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
  height:${props => props.items != 0 ? props.items*24+'px' : '28px'};
  border: solid;
  border-color: grey;
  border-width: 0.5px;
  width:100%;
`

const QuarterWrapper = styled.div`
  display:flex;
`

const EventWrapper = styled.div`
  `

const BoardColumnTitle = styled.div`
  font: 14px sans-serif;
  width: 55px;
`

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  background-color: ${props => props.isDraggingOver ? '#000000' : null};
  border-radius: 4px;
  width: 100%;
  z-index: ${props => props.isDraggingOver ? 0 : 1};
  
`

export const Quarter: React.FC<BoardColumnProps> = (props) => {
    return (
      <QuarterWrapper>
      <BoardColumnTitle>
          {props.index+":00"}
        </BoardColumnTitle>
      <BoardColumnWrapper items={props.column.itemsIds.length} events={props.events.length}>
        
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
              
            </BoardColumnContent>
          )}
        </Droppable>
        {props.events.map((calItem:ICalendarItem, index: number) => {
                return (
                    <CalendarEvent
                      key={calItem.uid}
                      index={index} 
                      calItem={calItem}
                    />
                  )
              })}
      </BoardColumnWrapper>
      </QuarterWrapper>
    );

};