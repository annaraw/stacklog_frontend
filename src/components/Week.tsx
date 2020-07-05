import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem } from '../models/models'
import BacklogItem from './BacklogItem';


import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Scrollbar from 'react-scrollbars-custom';

import {CalendarDay} from './CalendarDay';



type BoardColumnProps = {
  columns: any,
  items: any,
}

interface BacklogState {
  items: IBacklogItem[];
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const Week: React.FC<BoardColumnProps> = (props) => {

    return (
      
      <BoardEl>
        {props.columns.map((c:any,index:number) => <CalendarDay key={c[1].id} column={c} items={props.items[index]}/>
          )}
      </BoardEl>
      
      
    );

};