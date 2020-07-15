import * as React from 'react';
import { FunctionComponent } from 'react';

import { IBacklogItem, Column, Category } from '../../../models/models'
import BacklogItem from './BacklogItem';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IContextualMenuProps } from 'office-ui-fabric-react';
import Scrollbar from 'react-scrollbars-custom';

import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { sortTypes } from '../../../util/constants';
import { backlogComponentStyles } from './BacklogComponentStyles';

type BoardColumnProps = {
  column: Column
  items: IBacklogItem[]
  sortType: string
  sortIsUp: boolean
  searchInput: string
  selectedFilters: string[]
  categories: Category[]
  setSortType: (sortType: string) => void
  setSortIsUp: (sortIsUp: boolean) => void
  setSearchInput: (searchInput: string) => void
  setSelectedFilters: (selectedFilters: string[]) => void
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const BacklogComponent : FunctionComponent<BoardColumnProps> = props => {

  const classes = backlogComponentStyles()

  const { column, items, sortType, sortIsUp, selectedFilters, categories, setSortType, setSortIsUp, setSearchInput, setSelectedFilters} = props

  const getOrderIcon = () => {
    return (sortIsUp ? { iconName: 'Up' } : { iconName: 'Down' })
  }

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: sortTypes.alphabetical,
      onClick: () => { setSortType(sortTypes.alphabetical) }
      },
      {
        key: 'priority',
        text: sortTypes.priority,
        onClick: () => { setSortType(sortTypes.priority) }
      },
    ],
  };

  return (
    <React.Fragment>
      <div className={classes.backlogContainer}>
        <div className={classes.containerTitle}>Backlog</div>
        <div className={classes.containerControls}>
          <div style={{ float: "left", margin: "5px", display: "inline-block" }}>
            <DefaultButton
              text={sortType}
              split
              splitButtonAriaLabel="See 2 options"
              aria-roledescription="split button"
              menuProps={menuProps}
              onClick={(event) => setSortIsUp(!sortIsUp)}
              iconProps={getOrderIcon()}
            />
          </div>
          <div style={{ width: "200px", float: "left", margin: "5px", display: "inline-block" }}>
            <Dropdown
              placeholder="No Filter applied"
              selectedKeys={selectedFilters}
              multiSelect
              onChange={async (_, option) => { 
                option && (
                  option.selected
                  ? setSelectedFilters([...selectedFilters, option.key as string])
                  : setSelectedFilters(selectedFilters.filter(key => key !== option.key))
                  )
              }}
              options={categories}
            />
          </div>
        </div>
        <div style={{ width: "100%", float: "right", paddingTop: "15px" }}>
          <SearchBox
            placeholder="Search Backlog"
            underlined={true}
            onChange={async (_, value) => { setSearchInput(String(value)) }}
            onClear={async (_) => { setSearchInput("") }}
          />
        </div>
        <Scrollbar style={{ width: "100%", float: "left", height: "500px" }}>
          <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {items.map((backlogItem: any, index: number) => 
                    
                      <BacklogItem 
                        index={index} 
                        id={backlogItem.id} 
                        key={backlogItem.id} 
                        title={backlogItem.title} 
                        description={backlogItem.description}
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