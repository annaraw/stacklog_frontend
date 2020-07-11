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
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  ${(props) => {if (props.isDragging) {return ('max-height: 20px')}}};
  ${(props) => {if (props.isDragging) {return ('max-width: 80px')}}};

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
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