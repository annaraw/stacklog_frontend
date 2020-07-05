import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem } from '../models/models'
import BacklogItem from './BacklogItem';


import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Scrollbar from 'react-scrollbars-custom';


import {Week} from './Week';



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

export const Calendar: React.FC<BoardColumnProps> = (props) => {

    function addDays(dateObj: Date, numDays:number) {
      return new Date(dateObj.setDate(dateObj.getDate() + numDays));
    } 

    function getDateOfString(dateString: string){
    return new Date(Date.parse(dateString))
    }

    const today = '2020-07-06'
    const endWeekOne = "2020-07-13"
    const endWeekTwo = '2020-07-20'
    const endWeekThree = '2020-07-27'
    const endWeekFour = '2020-08-03'

    const weekOneColumns = Object.entries(props.columns).filter((c) => getDateOfString(c[0]) > getDateOfString(today)
      && getDateOfString(c[0]) < getDateOfString(endWeekOne) )
    const weekOneItems = weekOneColumns.map((w:[string, any]) => w[1].itemsIds.map((itemId: string) => (props.items as any)[itemId]))

    const weekTwoColumns = Object.entries(props.columns).filter((c) => getDateOfString(c[0]) >= getDateOfString(endWeekOne)
      && getDateOfString(c[0]) < getDateOfString(endWeekTwo) )
    const weekTwoItems = weekTwoColumns.map((w:[string, any]) => w[1].itemsIds.map((itemId: string) => (props.items as any)[itemId]))


    const weekThreeColumns = Object.entries(props.columns).filter((c) => getDateOfString(c[0]) >= getDateOfString(endWeekTwo)
      && getDateOfString(c[0]) < getDateOfString(endWeekThree) )
    const weekThreeItems = weekThreeColumns.map((w:[string, any]) => w[1].itemsIds.map((itemId: string) => (props.items as any)[itemId]))


    const weekFourColumns = Object.entries(props.columns).filter((c) => getDateOfString(c[0]) >= getDateOfString(endWeekThree)
      && getDateOfString(c[0]) < getDateOfString(endWeekFour) )
    const weekFourItems = weekFourColumns.map((w:[string, any]) => w[1].itemsIds.map((itemId: string) => (props.items as any)[itemId]))

    return (
      <div>
      <Week key='week1' columns={weekOneColumns} items={weekOneItems}/>
      <Week key='week2' columns={weekTwoColumns} items={weekTwoItems}/>
      <Week key='week3' columns={weekThreeColumns} items={weekThreeItems}/>
      <Week key='week4' columns={weekFourColumns} items={weekFourItems}/>
      </div>
      
      
    );

};