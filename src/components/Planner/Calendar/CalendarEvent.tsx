import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { ICalendarItem } from '../../../models/models'

// Define types for board item element properties
type BoardItemProps = {
  index: number
  calItem: ICalendarItem
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  index: number
  height: string
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
  background-color: #FFE000;
  height:  ${props => props.height};
  width: 85px;
  border: solid;
  border-width: thin;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 1px;
  position:absolute;
  z-index: 0;
  transition: background-color .25s ease-out;

  
`

function getHeight(calItem:ICalendarItem){
  const startHour = new Date(calItem.dtStart).getHours()
  const endHour = new Date (calItem.dtEnd).getHours()
  return (endHour - startHour)*28+"px"
}

// isDragDisabled
// Create and export the BoardItem component
export const CalendarEvent = (props: BoardItemProps) => {
  return <BoardItemEl
        index={0}
        height={getHeight(props.calItem)}
      >
        {/* The content of the BoardItem */}
        {props.calItem.summary}
      </BoardItemEl>
}