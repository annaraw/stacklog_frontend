import * as React from 'react';
import { Component } from 'react';

import './BacklogComponent.css'
import { IBacklogItem, Column } from '../../../models/models'
import { backlogDummy, categories } from '../../../data/dummyData'
import BacklogItem from './BacklogItem';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';
import Scrollbar from 'react-scrollbars-custom';

import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { sortTypes } from '../../../util/constants';

type BoardColumnProps = {
  column: Column,
  items: IBacklogItem[],
  setSortType: (sortType: string) => void
}

interface BacklogState {
  backlog: IBacklogItem[];
  displayedBacklog: IBacklogItem[];
  selectedKeys: string[];
  searchInput: string;
  sortIsUp: boolean;
  sortType: string;
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export default class BacklogComponent extends Component<BoardColumnProps, BacklogState> {

  orderIcon: IIconProps = {};

  constructor(props: BoardColumnProps) {
    super(props)
    const {items, setSortType} = props
    this.state = {
      backlog: items,
      displayedBacklog: items,
      selectedKeys: [],
      searchInput: "",
      sortIsUp: false,
      sortType: sortTypes.priority
    }
  }

  componentDidMount = () => {
    //this.sort()
  }

  setBacklog = (backlog: IBacklogItem[]) => {
    this.setState({ backlog: backlog })
  }

  setDisplayedBacklog = (displayedBacklog: IBacklogItem[]) => {
    this.setState({ displayedBacklog: displayedBacklog })
  }

  setSelectedKeys = (option: IDropdownOption) => {
    option.selected ? this.setState({ selectedKeys: [...this.state.selectedKeys, option.key as string] }) : this.setState({ selectedKeys: this.state.selectedKeys.filter(key => key !== option.key) })
  }

  setSearchInput = (searchInput: string) => {
    this.setState({ searchInput: searchInput })
  }

  setSortIsUp = (isUp: boolean) => {
    this.setState({ sortIsUp: isUp })
  }

  getOrderIcon() {
    return (this.state.sortIsUp ? this.orderIcon = { iconName: 'Up' } : this.orderIcon = { iconName: 'Down' })
  }

  menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: sortTypes.alphabetical,
        onClick: () => { /* this.setSortType(sortTypes.alphabetical).then(() => this.sort()) */ }
      },
      {
        key: 'priority',
        text: sortTypes.priority,
        onClick: () => { /* this.setSortType(sortTypes.priority).then(() => this.sort()) */ }
      },
      {
        key: 'deadline',
        text: sortTypes.deadline,
        onClick: () => { /* this.setSortType(sortTypes.deadline).then(() => this.sort()) */ }
      },
      {
        key: 'category',
        text: sortTypes.category,
        onClick: () => { /* this.setSortType(sortTypes.category).then(() => this.sort()) */ }
      }
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
                text={this.state.sortType}
                split
                splitButtonAriaLabel="See 2 options"
                aria-roledescription="split button"
                menuProps={this.menuProps}
                onClick={(event) => this.props.setSortType("priority")}
                iconProps={this.getOrderIcon()}
              />
            </div>
            <div style={{ width: "200px", float: "left", margin: "5px", display: "inline-block" }}>
              <Dropdown
                placeholder="No Filter applied"
                selectedKeys={this.state.selectedKeys}
                multiSelect
                onChange={async (_, option) => { /* await this.filter(option); this.search(); this.sort() */ }}
                options={categories}
              />
            </div>
          </div>
          <div style={{ width: "100%", float: "right", paddingTop: "15px" }}>
            <SearchBox
              placeholder="Search Backlog"
              underlined={true}
              onChange={async (_, value) => { /* await this.filter(); this.search(String(value)); this.sort() */ }}
              onClear={async (_) => { /* await this.setSearchInput(""); this.filter() */ }}
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