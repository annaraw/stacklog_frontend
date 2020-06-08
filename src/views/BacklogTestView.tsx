import * as React from 'react';
import { Component } from 'react';

import { Backlog } from '../models/models'
import { backlogDummy, categories } from '../data/dummyData'
import BacklogItem from '../components/BacklogItem';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';

var orderIcon: IIconProps = { iconName: 'Down' };

const types = {
  alphabetical: "Alphabetical",
  priority: "Priority",
  deadline: "Deadline"
}

export const ButtonSplitExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { sort } = props;

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: types.alphabetical,
        onClick: () => { setSortTypeAsync(types.alphabetical).then((sortType) => { sort(isUp, sortType) }) }
      },
      {
        key: 'priority',
        text: types.priority,
        onClick: () => { setSortType(types.priority); sort(isUp, sortType); console.log(sortType) }
      },
      {
        key: 'deadline',
        text: types.deadline,
        onClick: () => { setSortType(types.deadline); sort(isUp, sortType); console.log(sortType) }
      }
    ],
  };

  const [isUp, setIsUp] = React.useState(false);
  const [sortType, setSortType] = React.useState("Priority") //default sort type

  const setSortTypeAsync = async (sortType: string) => {
    setSortType(sortType)
    return sortType
  }

  const changeOrder = async () => {
    const upTemp = (!isUp)
    setIsUp(upTemp)
    return upTemp
  }

  function getOrderIcon() {
    return (isUp ? orderIcon = { iconName: 'Up' } : orderIcon = { iconName: 'Down' })
  }

  return (
    <DefaultButton
      text={sortType}
      split
      splitButtonAriaLabel="See 2 options"
      aria-roledescription="split button"
      menuProps={menuProps}
      onClick={() => { changeOrder().then((isUp) => sort(isUp, sortType)) }}
      iconProps={getOrderIcon()}
    />
  );




};

export interface IButtonExampleProps {
  sort: (isUp: boolean, sortType: string) => void;
}

interface BacklogState {
  backlog: Backlog[];
  displayedBacklog: Backlog[];
  selectedKeys: string[];
  searchInput: string;
}

export default class BacklogScreen extends Component<{}, BacklogState> {

  constructor(props: any) {
    super(props)
    this.state = {
      backlog: backlogDummy,
      displayedBacklog: backlogDummy,
      selectedKeys: [],
      searchInput: "",
    }
  }

  setBacklog = (backlog: Backlog[]) => {
    this.setState({ backlog: backlog })
  }

  setDisplayedBacklog = (displayedBacklog: Backlog[]) => {
    this.setState({ displayedBacklog: displayedBacklog })
  }

  setSelectedKeys = (option: IDropdownOption) => {
    option.selected ? this.setState({ selectedKeys: [...this.state.selectedKeys, option.key as string] }) : this.setState({ selectedKeys: this.state.selectedKeys.filter(key => key !== option.key) })
  }

  setSearchInput = (searchInput: string) => {
    this.setState({ searchInput: searchInput })
  }

  filter = async (option?: IDropdownOption): Promise<void> => {
    //add option to selected keys
    if (option) {
      await this.setSelectedKeys(option)
    }
    //create list of filtered backlog
    var temp: Backlog[] = []
    if (this.state.selectedKeys.length === 0) {
      //show all items if no category is selected
      temp = this.state.backlog
    } else {
      this.state.backlog.map(backlogItem => {
        if (this.state.selectedKeys.includes(backlogItem.category.key)) {
          temp.push(backlogItem)
        }
      })
    }
    this.setDisplayedBacklog(temp)
  }

  sort = (isUp: boolean, sortType: string) => {
    if (sortType === types.priority) {
      this.setDisplayedBacklog(isUp ? (this.state.displayedBacklog.sort(function (a, b) { return a.priority - b.priority })) : (this.state.displayedBacklog.sort(function (a, b) { return b.priority - a.priority })))
    }
    else if (sortType === types.alphabetical) {
      var temp =
        isUp ? (this.state.displayedBacklog.sort(
          function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
          }
        )) : (this.state.displayedBacklog.sort(
          function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          }
        ))
      this.setDisplayedBacklog(temp)
    }
  }

  search = async (input?: string) => {
    //set state only when there is a input or empty string (occurs when deleting the last character in the search bar)
    if (input || input === "") {
      await this.setSearchInput(input)
    }
    //split search string into array of keywords
    var searchInput: string[] = this.state.searchInput.split(' ')
    //delete the last space character in the keyword array except if it is the last remaining item in the array
    if (searchInput.length !== 1) {
      searchInput = searchInput.filter(function (element) { return element !== ""; })
    }
    //select all backlog items that contain one of the keywords
    var temp: Backlog[] = []
    searchInput.map(keyword => {
      this.state.backlog.map(backlogItem => {
        if (backlogItem.name.toLowerCase().includes(keyword.toLowerCase())) {
          //item not already in the list AND (check applied filters OR no filter applied)
          if (!temp.includes(backlogItem) && (this.state.selectedKeys.includes(backlogItem.category.key) || this.state.selectedKeys.length === 0)) {
            temp.push(backlogItem)
          }
        }
      })
    })
    this.setDisplayedBacklog(temp)
    console.log(this.state.displayedBacklog)
    console.log(this.state.searchInput)
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: "500px", margin: "20px auto" }}>
          <div style={{ width: "100px", float: "left" }}>
            <ButtonSplitExample
              sort={(isUp, sortType) => { this.sort(isUp, sortType) }}
            />
          </div>
          <div style={{ width: "200px", float: "right" }}>
            <Dropdown
              placeholder="No Filter applied"
              selectedKeys={this.state.selectedKeys}
              multiSelect
              onChange={async (_, option) => { await this.filter(option); this.search() }}
              options={categories}
            />
          </div>
          <div style={{ width: "100%", float: "right", paddingTop: "15px" }}>
            <SearchBox
              placeholder="Search Backlog"
              underlined={true}
              onChange={async (_, value) => { await this.filter(); this.search(String(value)) }}
              onClear={async (_) => { await this.setSearchInput(""); this.filter() }}
            />
          </div>
          <div style={{ width: "100%", float: "left" }}>
            {this.state.displayedBacklog.map(backlogItem => {
              return (
                <BacklogItem key={backlogItem.id} name={backlogItem.name} category={backlogItem.category.text} priority={backlogItem.priority} />
              )
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }

};