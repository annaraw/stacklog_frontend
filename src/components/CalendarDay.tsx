import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem } from '../models/models'
import BacklogItem from './BacklogItem';
import {CalendarItem} from './CalendarItem';

import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Scrollbar from 'react-scrollbars-custom';



type BoardColumnProps = {
  column: any,
  items: any,
}

interface BacklogState {
  items: IBacklogItem[];
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}




const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
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

export const CalendarDay: React.FC<BoardColumnProps> = (props) => {

    return (
      <BoardColumnWrapper>
        {/* <div className="menuBar"></div> */}
        <BoardColumnTitle>
          {props.column[1].title}
        </BoardColumnTitle>
        <Droppable droppableId={props.column[1].id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.items.map((backlogItem: any, index: number) => 
                  
                    <CalendarItem 
                      index={index} 
                      item={backlogItem}
                    />
                    
                )}
                {provided.placeholder}
              {/* {
                this.props.items.map((item: any, index: number) => <Item key={item.id} item={item} index={index} />
              )} */}
              {provided.placeholder}
            </BoardColumnContent>
          )}
        </Droppable>
      </BoardColumnWrapper>
    );

};