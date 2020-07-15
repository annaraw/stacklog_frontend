import * as React from 'react';

import './BacklogItem.css'
import { FunctionComponent } from 'react';
import { Category } from '../../../models/models';

import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

type BoardItemStylesProps = {
  isDragging: boolean
}

const BoardItemEl = styled.div<BoardItemStylesProps>`
  ${(props) => {if (props.isDragging) {return ('padding:0px')}}};

  background-color: ${(props) => props.isDragging ? '#6AFFA1' : '#fff'};
  
  ${(props) => {if (props.isDragging) {return ('border-radius: 4px;')}}};
  ${(props) => {if (props.isDragging) {return ('width: 85px;')}}};
  
  ${(props) => {if (props.isDragging) {return ('height: 20px;')}}};
  
  ${(props) => {if (props.isDragging) {return ('z-index:3')}}};
  
  ${(props) => {if (props.isDragging) {return ('position:relative;')}}};
  
  ${(props) => {if (props.isDragging) {return ('text-overflow: ellipsis;')}}};
  
  ${(props) => {if (props.isDragging) {return ('overflow: hidden;')}}};
  
  ${(props) => {if (props.isDragging) {return ('white-space: nowrap;')}}};
  
  ${(props) => {if (props.isDragging) {return ('margin-top: 4px;')}}};
  
  ${(props) => {if (props.isDragging) {return ('margin-bottom: 4px;')}}};
  
  ${(props) => {if (props.isDragging) {return ('transition: background-color .25s ease-out;')}}};

  &:hover {
    background-color: #0099FF;
  }
`

const BacklogItem: FunctionComponent<{ title: String, description: string, category: string, priority: number, id:any , index:number}> = props => {

    const { title, description, category, priority, id, index } = props;

    /* const colorStyle = {
        backgroundColor: category.color
    } */

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <BoardItemEl
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   ref={provided.innerRef}
                   isDragging={snapshot.isDragging}
                >
                {!snapshot.isDragging ? <div className="header">
                        <div className="header-title">{title} ({category})<span style={{float:"right"}}>Prio: {priority}</span></div>
                        <div className="description"  >{description}</div>
                    </div> : title}
                    
                </BoardItemEl>
            )}
        </Draggable>
    );
};

export default BacklogItem;