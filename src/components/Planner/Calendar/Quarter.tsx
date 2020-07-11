import * as React from 'react';
import { IBacklogItem } from '../../../models/models'
import {CalendarItem} from './CalendarItem';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface BoardColumnProps {
  column: string,
  items: any,
  index: number
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

`

const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const Quarter: React.FC<BoardColumnProps> = (props) => {
    return (
      <BoardColumnWrapper>
        <BoardColumnTitle>
          {props.index}
        </BoardColumnTitle>
        <Droppable droppableId={props.column}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.items.map((backlogItem: IBacklogItem, index: number) => 
                  
                    <CalendarItem
                      key={backlogItem.id}
                      index={index} 
                      item={backlogItem}
                    />
                    
                )}
              
              {provided.placeholder}
            </BoardColumnContent>
          )}
        </Droppable>
      </BoardColumnWrapper>
    );

};