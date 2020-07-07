import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem, Column } from '../../../models/models'
import { categories } from '../../../data/dummyData'
import BacklogItem from './BacklogItem';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';
import Scrollbar from 'react-scrollbars-custom';

import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { sortTypes } from '../../../util/constants';

type BoardColumnProps = {
  column: Column
  items: IBacklogItem[]
  sortType: string
  sortIsUp: boolean
  searchInput: string
  selectedFilters: string[]
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

export default class BacklogComponent extends Component<BoardColumnProps, {}> {

  orderIcon: IIconProps = {};

  getOrderIcon() {
    return (this.props.sortIsUp ? this.orderIcon = { iconName: 'Up' } : this.orderIcon = { iconName: 'Down' })
  }

  menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: sortTypes.alphabetical,
      onClick: () => { this.props.setSortType(sortTypes.alphabetical) }
      },
      {
        key: 'priority',
        text: sortTypes.priority,
        onClick: () => { this.props.setSortType(sortTypes.priority) }
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <div className="backlogContainer">
          <div className="containerTitle">Backlog</div>
          <div className="containerControls">
            <div style={{ float: "left", margin: "5px", display: "inline-block" }}>
              <DefaultButton
                text={this.props.sortType}
                split
                splitButtonAriaLabel="See 2 options"
                aria-roledescription="split button"
                menuProps={this.menuProps}
                onClick={(event) => this.props.setSortIsUp(!this.props.sortIsUp)}
                iconProps={this.getOrderIcon()}
              />
            </div>
            <div style={{ width: "200px", float: "left", margin: "5px", display: "inline-block" }}>
              <Dropdown
                placeholder="No Filter applied"
                selectedKeys={this.props.selectedFilters}
                multiSelect
                onChange={async (_, option) => { 
                  option && (
                    option.selected
                    ? this.props.setSelectedFilters([...this.props.selectedFilters, option.key as string])
                    : this.props.setSelectedFilters(this.props.selectedFilters.filter(key => key !== option.key))
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
              onChange={async (_, value) => { this.props.setSearchInput(String(value)) }}
              onClear={async (_) => { this.props.setSearchInput("") }}
            />
          </div>
          <Scrollbar style={{ width: "100%", float: "left", height: "500px" }}>
            <Droppable droppableId={this.props.column.id}>
              {(provided, snapshot) => (
                <BoardColumnContent
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.items.map((backlogItem: any, index: number) => 
                      
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
  }
};