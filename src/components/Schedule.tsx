import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem } from '../models/models'
import BacklogItem from './BacklogItem';


import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Scrollbar from 'react-scrollbars-custom';

import {Day} from './Day';



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
      <Day key={props.column.id} column={props.column} items={props.items}/>
    );

};