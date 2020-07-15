import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import { CalendarItem } from './CalendarItem';
import { CalendarEvent } from './CalendarEvent';
import { Droppable } from 'react-beautiful-dnd'
import { hoursStyles } from './HoursStyles';

interface BoardColumnProps {
  column: Column,
  index: number,
  items: IBacklogItem[]
  events: ICalendarItem[]
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}
type BoardWrapperContentStylesProps = {
  items: number
  events: number
}

export const Hour: React.FC<BoardColumnProps> = (props) => {

  const classes = hoursStyles();
  const bodyHeight = (props.column.itemsIds.length !== 0) ? props.column.itemsIds.length * 24 + 'px' : '28px'

  return (
    <div className={classes.hours}>
      <span className={classes.title}>
        {props.index + ":00"}
      </span>
      <div
        className={classes.boardWrapper}
        style={{ height: bodyHeight }}
      >

        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? classes.contentHover : classes.content}
            >
              {props.column.itemsIds.map((id: String, index: number) => {

                const item = props.items.filter((item) => item.id === id)[0]

                return (
                  <CalendarItem
                    key={item.id}
                    index={index}
                    item={item}
                  />
                )
              }

              )}
              {provided.placeholder}

            </div>
          )}
        </Droppable>
        {props.events.map((calItem: ICalendarItem, index: number) => {
          return (
            <CalendarEvent
              key={calItem.uid}
              index={index}
              calItem={calItem}
            />
          )
        })}
      </div>
    </div>
  );

};