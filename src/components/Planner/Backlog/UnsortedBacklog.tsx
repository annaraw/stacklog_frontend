
import * as React from 'react';
import { IBacklogItem, Column, Project } from '../../../models/models';
import BacklogItem from './BacklogItem';
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Scrollbar from 'react-scrollbars-custom';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { unsortedBacklogStyles } from './UnsortedBacklogStyles';
import BacklogItemForm from '../../BacklogItemForm/BacklogItemForm';
import { FunctionComponent, useState } from 'react';

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
interface BacklogItemFormProps {
  title: string,
  column: Column,
  items: IBacklogItem[],
  projectItems: IBacklogItem[],
  project?: Project,
  selfAssigned?: boolean,
  setBacklogItems: (items: IBacklogItem[]) => void
}

export const UnsortedBacklog: FunctionComponent<BacklogItemFormProps> = props => {

  const { title, column, items, project, selfAssigned, projectItems, setBacklogItems } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const classes = unsortedBacklogStyles()
  return (
    <React.Fragment>
      <div className={classes.backlogContainer}>
        <Tooltip title="Add new Backlog Item" placement="left" arrow>
          <IconButton className={classes.addButton} aria-label="add" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <div className={classes.containerTitle}>{title}</div>
        <div style={{ position: "relative", flex: "1" }}>
          <Scrollbar className={classes.scrollbar}>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <BoardColumnContent
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {items.map((backlogItem: IBacklogItem, index: number) =>

                    <BacklogItem
                      index={index}
                      item={backlogItem}
                      items={projectItems}
                      setBacklogItems={setBacklogItems}
                    />

                  )}
                  {provided.placeholder}
                </BoardColumnContent>
              )}
            </Droppable>
          </Scrollbar>
        </div>
      </div>
      <BacklogItemForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formTitle={"Add Task"}
        items={projectItems}
        setBacklogItems={setBacklogItems}
        formType={"Create"}
        project={project}
        selfAssigned={selfAssigned}
      />
    </React.Fragment>
  );

};