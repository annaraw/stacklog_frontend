import * as React from 'react';
import { IBacklogItem, Column } from '../../../models/models';
import BacklogItem from '../Backlog/BacklogItem';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Scrollbar from 'react-scrollbars-custom';

type BoardColumnProps = {
  column: Column,
  items: IBacklogItem[],
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const Schedule: React.FC<BoardColumnProps> = (props) => {
    return (
      <React.Fragment>
      <div className="backlogContainer">
        <div className="containerTitle">Schedule</div>
        <Scrollbar style={{ width: "100%", float: "left", height: "500px" }}>
        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.items.map((backlogItem: IBacklogItem, index: number) => 
                  
                    <BacklogItem 
                      index={index} 
                      id={backlogItem.id} 
                      key={backlogItem.id} 
                      title={backlogItem.title} 
                      description={backlogItem.description ? backlogItem.description : ""}
                      category={backlogItem.category} 
                      priority={backlogItem.priority}
                    />
                    
                )}
              {provided.placeholder}
            </BoardColumnContent>
          )}
        </Droppable>
        </Scrollbar>
      </div>
      </React.Fragment>
    );

};