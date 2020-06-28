import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Define types for board item element properties
type ItemProps = {
  index: number
  item: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type ItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<ItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

// Create and export the BoardItem component
export const Item = (props: ItemProps) => {
  return <Draggable draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {/* The content of the BoardItem */}
        {props.item.content}
      </BoardItemEl>
    )}
  </Draggable>
}