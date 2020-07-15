import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';

import { IBacklogItem, Column, Category, Priority } from '../../../models/models'
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
}

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

export const BacklogComponent: FunctionComponent<BoardColumnProps> = props => {

  const classes = backlogComponentStyles()

  const { column, items } = props
  const [displayedBacklog, setDisplayedBacklog] = useState<IBacklogItem[]>(items)
  const [searchInput, setSearchInput] = useState<string>("")
  const [sortIsUp, setSortIsUp] = useState<boolean>(true)
  const [sortType, setSortType] = useState<string>(sortTypes.priority)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  
  const initCategories = () => {
    //initialize categories
    let temp: string[] = []
    let categories: Category[] = []
    for (var i = 0; i < items.length; i++) {
      if (temp.includes((items[i].category))) continue;
      temp.push(items[i].category);
      var c: Category = {
        key: items[i].category ? items[i].category : "No Category",
        text: items[i].category ? items[i].category : "No Category",
        color: items[i].category ? "#c0c0c0" : "#ffffff"
      }
      categories.push(c)
    }
    return categories
  }

  const [categories, setCategories] = useState<Category[]>(initCategories)

  useEffect(() => {
    const fetchData = async () => {
      await setDisplayedBacklog(await onUpdateDisplayedItems(items))
    };

    fetchData();
  }, [searchInput, sortIsUp, sortType, selectedFilters]);

  const setSearchInputAndUpdate = async (searchInput: string) => {
    setSearchInput(searchInput)
    var newItems = await onUpdateDisplayedItems(items)
    setDisplayedBacklog(newItems)
  }

  const setSortIsUpAndUpdate = async (isUp: boolean) => {
    setSortIsUp(isUp)
    var newItems = await onUpdateDisplayedItems(items)
    setDisplayedBacklog(newItems)
  }

  const setSortTypeAndUpdate = async (sortType: string) => {
    setSortType(sortType)
    var newItems = await onUpdateDisplayedItems(items)
    setDisplayedBacklog(newItems)
  }

  const setSelectedFiltersAndUpdate = async (selectedFilters: string[]) => {
    setSelectedFilters(selectedFilters)
    var newItems = await onUpdateDisplayedItems(items)
    setDisplayedBacklog(newItems)
  }

  const onUpdateDisplayedItems = async (displayedItems: IBacklogItem[]) => {
    return await filter(
      await search(
        await sort(displayedItems)
      )
    )
  }

  const filter = async (itemList: IBacklogItem[]) => {
    //create list of filtered backlog
    var temp: IBacklogItem[] = []
    //show all items if no category is selected
    if (selectedFilters.length === 0) {
      temp = itemList
    } else {
      itemList.forEach(backlogItem => {
        if (selectedFilters.includes(backlogItem.category) || (backlogItem.category === null && selectedFilters.includes("No Category"))) {
          temp.push(backlogItem)
        }
      })
    }
    return temp
  }

  const sort = async (itemList: IBacklogItem[]) => {
    var temp: IBacklogItem[] = []
    if (sortType === sortTypes.priority) {
      temp =
        sortIsUp ? (itemList.sort(
          function (a, b) {
            if (Priority[a.priority] > Priority[b.priority]) { return -1; }
            if (Priority[a.priority] < Priority[b.priority]) { return 1; }
            return 0;
          }
        )) : (itemList.sort(
          function (a, b) {
            if (Priority[a.priority] < Priority[b.priority]) { return -1; }
            if (Priority[a.priority] > Priority[b.priority]) { return 1; }
            return 0;
          }
        ))
    }
    else if (sortType === sortTypes.alphabetical) {
      temp =
        sortIsUp ? (itemList.sort(
          function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) { return -1; }
            if (a.title.toLowerCase() < b.title.toLowerCase()) { return 1; }
            return 0;
          }
        )) : (itemList.sort(
          function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
            if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
            return 0;
          }
        ))
    }
    return temp
  }

  const search = async (itemList: IBacklogItem[]) => {
    //split search string into array of keywords
    var keywords: string[] = searchInput.split(' ')
    //delete the last space character in the keyword array except if it is the last remaining item in the array
    if (keywords.length !== 1) {
      keywords = keywords.filter(function (element) { return element !== ""; })
    }
    //select all backlog items that contain one of the keywords
    var temp: IBacklogItem[] = []
    keywords.forEach(keyword => {
      itemList.forEach(backlogItem => {
        if (backlogItem.title.toLowerCase().includes(keyword.toLowerCase())) {
          //item not already in the list
          if (!temp.includes(backlogItem)) {
            temp.push(backlogItem)
          }
        }
      })
    })
    return temp
  }

  const getOrderIcon = () => {
    return (sortIsUp ? { iconName: 'Up' } : { iconName: 'Down' })
  }

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: sortTypes.alphabetical,
        onClick: () => { setSortTypeAndUpdate(sortTypes.alphabetical) }
      },
      {
        key: 'priority',
        text: sortTypes.priority,
        onClick: () => { setSortTypeAndUpdate(sortTypes.priority) }
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
              onClick={async (event) => await setSortIsUpAndUpdate(!sortIsUp)}
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
                    ? await setSelectedFiltersAndUpdate([...selectedFilters, option.key as string])
                    : await setSelectedFiltersAndUpdate(selectedFilters.filter(key => key !== option.key))
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
            onChange={async (_, value) => { await setSearchInputAndUpdate(String(value)) }}
            onClear={async (_) => { await setSearchInputAndUpdate("") }}
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
                {displayedBacklog.map((backlogItem: any, index: number) =>

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