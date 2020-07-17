import * as React from 'react';
import { IBacklogItem, Column, ICalendarItem } from '../../../models/models'
import { CalendarItem } from './CalendarItem';
import { CalendarEvent } from './CalendarEvent';
import { Droppable } from 'react-beautiful-dnd'
import { hoursStyles } from './HoursStyles';
import { dayStart } from '../../../util/constants';

interface HourProps {
  column: Column
  index: number
  items: IBacklogItem[]
  events: ICalendarItem[]
  setBacklogItems: (items: IBacklogItem[]) => void
}

export const Hour: React.FC<HourProps> = (props) => {

  const { column, items, events, index, setBacklogItems } = props
  const classes = hoursStyles();
  const bodyHeight = (column.itemsIds.length !== 0) ? column.itemsIds.length * 24 + 'px' : '28px'

  return (
    <div className={classes.hours}>
      <span className={classes.title}>
        {index + dayStart + ":00"}
      </span>
      <div
        className={classes.boardWrapper}
        style={{ height: bodyHeight }}
      >

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? classes.contentHover : classes.content}
            >
              {column.itemsIds.map((id: String, index: number) => {

                const item = items.filter((item) => item.id === id)[0]

                return (
                  <CalendarItem
                    key={item.id}
                    index={index}
                    item={item}
                    setBacklogItems={setBacklogItems}
                    items={items}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {events.map((calItem: ICalendarItem, index: number) => {
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