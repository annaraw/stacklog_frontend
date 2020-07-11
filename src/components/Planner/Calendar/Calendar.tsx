import * as React from 'react';
import { IBacklogItem, Column } from '../../../models/models'
import styled from 'styled-components'
import { Week } from './Week';
import { CalendarDay } from './CalendarDay';

interface BoardColumnProps {
  columns: Column[],
  items: IBacklogItem[]
}

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Calendar: React.FC<BoardColumnProps> = (props) => {

 

  function addDays(dateObj: Date, numDays: number) {
    return new Date(dateObj.setDate(dateObj.getDate() + numDays));
  }

  function getDateOfString(dateString: string) {
    return new Date(Date.parse(dateString))
  }
  /*
  // dynamically create next 7 days from today for calendar columns
  const nextDays: string[] = []
  for (let i = 1; i < 7; i++) {
    nextDays.push(
      new Date(
        new Date().setDate(new Date().getDate()+i)
        ).toDateString()
      )
  }

  let nextDaysItems:any[] = []
  for (let i in nextDays) {
    nextDaysItems.push({items: props.items
      .filter((item) => item.startDate && new Date(item.startDate).toDateString() === nextDays[i] )
      .sort((a:IBacklogItem,b:IBacklogItem) => a.index - b.index)
    })
    //console.log(props.items.filter((item) => item.startDate && item.startDate.toDateString() === nextDays[i]))
  }

  console.log("SORTED_ITEMS",nextDaysItems)*/

  function getDayColumns(day:string) {
    return props.columns.filter((col)=> col.id.split("-")[0]==day)
  } 

  return (
    <div>
      {/* <Week key='week1' columns={weekOneColumns} items={weekOneItems}/> */}
      <BoardEl>
        {/*new Date(c.id) > new Date()*/
          props.columns.map((col)=>col.id.split("-")[0])
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .filter((col) => col != 'backlog')
            .map((col)=> <CalendarDay key={col} columns={getDayColumns(col)} day={col} items={props.items} />)

        }
      </BoardEl>
    </div>
  );
};