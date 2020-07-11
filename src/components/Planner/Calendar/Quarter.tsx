import * as React from 'react';
import { IBacklogItem, Column } from '../../../models/models'
import {CalendarItem} from './CalendarItem';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface BoardColumnProps {
  column: Column,
  index: number,
  items: IBacklogItem[]
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnWrapper = styled.div`
  display:flex;
  background-color: #e5eff5;
  border-radius: 4px;
`

const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-right: 12px;
`

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
  width: 100%
  
`

export const Quarter: React.FC<BoardColumnProps> = (props) => {
    return (
      <BoardColumnWrapper>
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
            </BoardColumnContent>

          )}
        </Droppable>
      </BoardColumnWrapper>
    );

};