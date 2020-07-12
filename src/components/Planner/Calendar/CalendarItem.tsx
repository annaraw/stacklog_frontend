import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Define types for board item element properties
type BoardItemProps = {
  index: number
  item: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
  index: number
  /*height: string*/
}

// Create style for board item element
/*const BoardItemEl = styled.div<BoardItemStylesProps>`
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  height:  ${props => props.height};
  ${(props) => {if (!props.isDragging) {return ('position: absolute')}}};
  ${(props) => {if (props.isDragging) {return ('max-height: 10px')}}};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  &:hover {
    background-color: #0099FF;
  }

  & + & {
    margin-top: 4px;
    margin-bottom: 4px;
  }
`*/

const BoardItemEl = styled.div<BoardItemStylesProps>`
  background-color: ${(props) => props.isDragging ? '#6AFFA1' : '#00FF5E'};
  border-radius: 4px;
  width: 85px;
  height: 20px;
  z-index: ${props => props.isDragging ? 3 : 2};;
  position:relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 4px;
  transition: background-color .25s ease-out;
  &:hover {
    background-color: #0099FF;
  }

   
`

// isDragDisabled
// Create and export the BoardItem component
export const CalendarItem = (props: BoardItemProps) => {
  return <Draggable  draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        index={props.index}
        /*height='100px'*/
      >
        {/* The content of the BoardItem */}
        {props.item.title}
      </BoardItemEl>
    )}
  </Draggable>
}