import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem } from '../models/models'
import BacklogItem from './BacklogItem';


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


const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const Schedule: React.FC<BoardColumnProps> = (props) => {

    return (
      <React.Fragment>
      <div className="backlogContainer">
        {/* <div className="menuBar"></div> */}
        <div className="containerTitle">Schedule</div>
        <div className="containerControls"/>
        <div style={{ width: "200px", float: "left", margin: "5px", display: "inline-block" }}/>
        <div style={{ width: "100%", float: "right", paddingTop: "15px" }}/>
        <Scrollbar style={{ width: "100%", float: "left", height: "500px" }}>
        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.items.map((backlogItem: any, index: number) => 
                  
                    <BacklogItem 
                      index={index} 
                      id={backlogItem.id} 
                      key={backlogItem.id} 
                      title={backlogItem.title} 
                      description={backlogItem.description}
                      category={backlogItem.category} 
                      priority={backlogItem.priority}
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
        </Scrollbar>
      </div>
      </React.Fragment>
    );

};