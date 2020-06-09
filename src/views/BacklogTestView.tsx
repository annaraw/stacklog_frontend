import * as React from 'react';
import { Component } from 'react';

import { Backlog } from '../models/models'
import { backlogDummy, categories } from '../data/dummyData'
import BacklogItem from '../components/BacklogItem';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';

const sortTypes = {
  alphabetical: "Alphabetical",
  priority: "Priority",
  deadline: "Deadline"
}

interface BacklogState {
  backlog: Backlog[];
  displayedBacklog: Backlog[];
  selectedKeys: string[];
  searchInput: string;
  sortIsUp: boolean;
  sortType: string
}

export default class BacklogScreen extends Component<{}, BacklogState> {

  orderIcon: IIconProps = {};

  constructor(props: any) {
    super(props)
    this.state = {
      backlog: backlogDummy,
      displayedBacklog: backlogDummy,
      selectedKeys: [],
      searchInput: "",
      sortIsUp: false,
      sortType: sortTypes.priority,
    }
  }

  componentDidMount = () => {
    this.sort()
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

  setSortIsUp = (isUp: boolean) => {
    this.setState({sortIsUp: isUp})
  }

  setSortType = async (sortType: string) => {
    this.setState({sortType: sortType})
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

  sort = () => {
    var temp
    if (this.state.sortType === sortTypes.priority) {
      temp = this.state.sortIsUp ? (this.state.displayedBacklog.sort(function (a, b) { return b.priority - a.priority })) : (this.state.displayedBacklog.sort(function (a, b) { return a.priority - b.priority }))
    }
    else if (this.state.sortType === sortTypes.alphabetical) {
      temp =
      this.state.sortIsUp ? (this.state.displayedBacklog.sort(
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
    }
    if (temp) {
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
    //sort after search (important when deleting characters and backlog items are added to displayed items again)
    this.sort()
  }

  changeOrder = async () => {
    await this.setSortIsUp(!this.state.sortIsUp)
    this.sort()
  }

  getOrderIcon() {
    return (this.state.sortIsUp ? this.orderIcon = { iconName: 'Up' } : this.orderIcon = { iconName: 'Down' })
  }

  menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'alphabet',
        text: sortTypes.alphabetical,
        onClick: () => { this.setSortType(sortTypes.alphabetical).then(() => this.sort()) }
      },
      {
        key: 'priority',
        text: sortTypes.priority,
        onClick: () => { this.setSortType(sortTypes.priority).then(() => this.sort()) }
      },
      {
        key: 'deadline',
        text: sortTypes.deadline,
        onClick: () => { this.setSortType(sortTypes.deadline).then(() => this.sort()) }
      }
    ],
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ width: "500px", margin: "20px auto" }}>
          <div style={{ width: "100px", float: "left" }}>
            <DefaultButton
              text={this.state.sortType}
              split
              splitButtonAriaLabel="See 2 options"
              aria-roledescription="split button"
              menuProps={this.menuProps}
              onClick={this.changeOrder}
              iconProps={this.getOrderIcon()}
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