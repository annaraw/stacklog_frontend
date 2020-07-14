
import * as React from 'react';
import { IBacklogItem, Column } from '../../../models/models';
import BacklogItem from './BacklogItem';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Scrollbar from 'react-scrollbars-custom';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { unsortedBacklogStyles } from './UnsortedBacklogStyles';

interface BoardColumnProps {
  column: Column,
  items: IBacklogItem[],
  title: string,
}

interface BoardColumnContentStylesProps {
  isDraggingOver: boolean
}

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
  position: absolute;
  height: 100%;
  width: 100%;
`

export const UnsortedBacklog: React.FC<BoardColumnProps> = (props) => {
  const classes = unsortedBacklogStyles()
  return (
    <React.Fragment>
      <div className={classes.backlogContainer}>
        <Tooltip title="Add new Backlog Item" placement="left" arrow>
          <IconButton className={classes.addButton} aria-label="add">
            <AddIcon />
          </IconButton>
        </Tooltip>
        <div className={classes.containerTitle}>{props.title}</div>
        <Scrollbar className={classes.scrollbar}>
          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.items.map((backlogItem: IBacklogItem, index: number) =>

                  <BacklogItem
                    index={index}
                    id={backlogItem.id}
                    key={backlogItem.id}
                    title={backlogItem.title}
                    description={backlogItem.description ? backlogItem.description : ""}
                    category={backlogItem.category}
                    priority={backlogItem.priority}
                  />

                )}
                {provided.placeholder}
              </BoardColumnContent>
            )}
          </Droppable>

        </Scrollbar>

      </div>
    </React.Fragment>
  );

};