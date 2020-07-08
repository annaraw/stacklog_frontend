import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from "styled-components";
import BacklogComponent from './Backlog/BacklogComponent';
import { Schedule } from './Schedule/Schedule';
import { Calendar } from './Calendar/Calendar';
import { sortTypes } from '../../util/constants';
import { IBacklogItem, Column } from '../../models/models';
import BacklogItemService from '../../services/BacklogItemService';

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

type BoardColumnProps = {
	setSortType: (sortType: string) => void
	setSortIsUp: (sortIsUp: boolean) => void
	setSearchInput: (searchInput: string) => void
	setSelectedFilters: (selectedFilters: string[]) => void
}

interface BacklogState {
	items: IBacklogItem[],
	displayedItems: IBacklogItem[],
	columns: Column[],
	searchInput: string,
	sortIsUp: boolean,
	sortType: string,
	selectedFilters: string[],
	loading: boolean,
}

export class Planner extends React.Component<BoardColumnProps, BacklogState> {

	constructor(props: any) {
		super(props)
		//const {column, items, setSortType} = props
		this.state = {
			items: [], // all items in every column
			displayedItems: [],
			columns: [], // column objects (backlog + schedule + calendar days)

			// states for search, sort, filter:
			searchInput: "",
			sortIsUp: false,
			sortType: sortTypes.priority,
			selectedFilters: [],

			loading: true,
		}
	}

	componentDidMount = () => {
		this.setState({ loading: true })

		//backend request - get backlog items
		BacklogItemService.getBacklogItems().then(responseItems => {
			let itemsFormBackend: IBacklogItem[] = []

			if (responseItems) {
				//@ts-ignore
				for (let item of responseItems) {
					itemsFormBackend.push({
						id: item.id ? item.id : null,
						author: item.author? item.author : null,
						assignee: item.assignee ? item.assignee : null,
						title: item.title ? item.title : null,
						description: item.description ? item.description : null,
						priority: item.priority ? item.priority : null,
						reminder: item.reminder ? item.reminder : null,
						estimation: item.estimation ? item.estimation : null,
						completed: item.completed ? item.completed : null,
						startDate: item.startDate ? item.startDate : null,
						dueDate: item.dueDate ? item.dueDate : null,
						category: item.category ? item.category : null,
						team: item.team ? item.team : null,
						index: item.index ? item.index : null,
					})
				}
			}

			// dynamically create next 7 days from today for calendar columns
			const nextDays: string[] = []
			for (let i = 0; i < 7; i++) {
				nextDays.push(
					new Date(
						new Date().setDate(new Date().getDate() + i)
					).toDateString()
				)
			}

			//initialize columns
			let initialColumns: Column[] = [{
				id: 'backlog',
				title: 'backlog',
				itemsIds: itemsFormBackend.filter((item) => !item.startDate
					//TODO: add items back into backlog when startDate is in the past and completed = false
					//|| new Date(item.startDate).toDateString() <= new Date().toDateString()
					).map(item => item.id)
			}]
			for (let i in nextDays) {
				initialColumns.push({
					id: nextDays[i],
					title: nextDays[i],
					itemsIds: itemsFormBackend.filter((item) => item.startDate 
							&& new Date(item.startDate).toDateString() === nextDays[i]).map(item => item.id)
				})
			}

			this.setState({
				items: itemsFormBackend,
				displayedItems: itemsFormBackend.filter((item) => !item.startDate),
				columns: initialColumns,
				loading: false,
			})


		}).catch(error => {
			//TODO show error message to user
			console.log(error)
			this.setState({ loading: false })
		})

	}

	setColumns = (column: Column, columnEnd?: Column) => {
		let index = this.state.columns.findIndex(c => column.id === c.id)
		let newColumns = [...this.state.columns]
		newColumns[index] = column
		if (columnEnd) {
			let indexEndColumn = this.state.columns.findIndex(c => columnEnd.id === c.id)
			newColumns[indexEndColumn] = columnEnd
		}
		this.setState({ columns: newColumns })
	}

	setSearchInput = async (searchInput: string) => {
		this.setState({ searchInput: searchInput })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.search(await this.sort(allBacklogItems)))
	}

	setSortIsUp = async (isUp: boolean) => {
		this.setState({ sortIsUp: isUp })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.sort(allBacklogItems))
	}

	setSortType = async (sortType: string) => {
		this.setState({ sortType: sortType })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.sort(allBacklogItems))
	}

	setSelectedFilters = async (selectedFilters: string[]) => {
		this.setState({ selectedFilters: selectedFilters })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.filter(await this.search( await this.sort(allBacklogItems))))
	}

	setDisplayedItems = (displayedItems: IBacklogItem[]) => {
		this.setState({ displayedItems: displayedItems })
	  }

	filter = async (itemList: IBacklogItem[]) => {
		//create list of filtered backlog
		var temp: IBacklogItem[] = []
		if (this.state.selectedFilters.length === 0) {
			//show all items if no category is selected
			temp = itemList
		} else {
			itemList.map(backlogItem => {
			if (this.state.selectedFilters.includes(backlogItem.category)) {
				temp.push(backlogItem)
			}
			})
		}
		return temp
	}

	sort = async (itemList: IBacklogItem[]) => {
		var temp: IBacklogItem[] = []
		if (this.state.sortType === sortTypes.priority) {
			temp =
			this.state.sortIsUp ? (itemList.sort(
				function (a, b) {
				if (a.priority > b.priority) { return -1; }
				if (a.priority < b.priority) { return 1; }
				return 0;
				}
			)) : (itemList.sort(
				function (a, b) {
				if (a.priority < b.priority) { return -1; }
				if (a.priority > b.priority) { return 1; }
				return 0;
				}
			))
		}
		else if (this.state.sortType === sortTypes.alphabetical) {
			temp =
			this.state.sortIsUp ? (itemList.sort(
				function (a, b) {
				if (a.title > b.title) { return -1; }
				if (a.title < b.title) { return 1; }
				return 0;
				}
			)) : (itemList.sort(
				function (a, b) {
				if (a.title < b.title) { return -1; }
				if (a.title > b.title) { return 1; }
				return 0;
				}
			))
		}
		return temp
	}

	search = async (itemList: IBacklogItem[]) => {
		//split search string into array of keywords
		var searchInput: string[] = this.state.searchInput.split(' ')
		//delete the last space character in the keyword array except if it is the last remaining item in the array
		if (searchInput.length !== 1) {
			searchInput = searchInput.filter(function (element) { return element !== ""; })
		}
		//select all backlog items that contain one of the keywords
		var temp: IBacklogItem[] = []
		searchInput.map(keyword => {
			itemList.map(backlogItem => {
			if (backlogItem.title.toLowerCase().includes(keyword.toLowerCase())) {
				//item not already in the list AND (check applied filters OR no filter applied)
				if (!temp.includes(backlogItem) && (this.state.selectedFilters.includes(backlogItem.category) || this.state.selectedFilters.length === 0)) {
					temp.push(backlogItem)
				}
			}
			})
		})
		return temp
	}

	onDragEnd = async (result: any) => {
		const { source, destination, draggableId } = result
		// (1) DROPPED OUTSIDE - NO CHANGE
		if (!destination) {
			return
		}
		// (2) DROPPED IN SAME PLACE - NO CHANGE
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return
		}
		// TURN OFF DRAG AND DROP WITHIN BACKLOG COLUMN
		/* if (destination.droppableId === source.droppableId && destination.droppableId === "backlog") {
			return
		} */
		const columnStart = this.state.columns.filter((column) => column.id === source.droppableId)[0] // Find column from which the item was dragged from
		const columnFinish = this.state.columns.filter((column) => column.id === destination.droppableId)[0] // Find column in which the item was dropped
		// (3) DROPPED IN SAME COLUMN, DIFFERENT ORDER
		if (columnStart === columnFinish) {
			const newItemsIds = Array.from(columnStart.itemsIds) // Get all item ids in currently active list
			newItemsIds.splice(source.index, 1) // Remove the id of dragged item from its original position
			newItemsIds.splice(destination.index, 0, draggableId) // Insert the id of dragged item to the new position

			// Create new, updated, object with data for columns
			const newColumnStart = {
				...columnStart,
				itemsIds: newItemsIds
			}

			this.setColumns(newColumnStart)
		}
		// (4) DROPPED INTO ANOTHER COLUMN --- TODO: change start/end date when dropping into another day
		else {
			// Change date of item to the date of columnFinish
			var newDate = (columnFinish.id === 'backlog') ? null : new Date(columnFinish.id)
			var newItem = this.state.items.filter(item => item.id === draggableId)[0]
			newItem.startDate = newDate

			const newStartItemsIds = Array.from(columnStart.itemsIds) // Get all item ids in source list
			newStartItemsIds.splice(source.index, 1) // Remove the id of dragged item from its original position

			// Create new, updated object with data for source column
			const newColumnStart = {
				...columnStart,
				itemsIds: newStartItemsIds
			}

			const newFinishItemsIds = Array.from(columnFinish.itemsIds) // Get all item ids in destination list
			newFinishItemsIds.splice(destination.index, 0, draggableId) // Insert the id of dragged item to the new position in destination list

			// Create new, updated object with data for destination column
			const newColumnFinish = {
				...columnFinish,
				itemsIds: newFinishItemsIds
			}

			this.setColumns(newColumnStart, newColumnFinish)
		}
		this.setDisplayedItems(await this.sort(await this.filter(await this.search(this.state.items.filter((item) => !item.startDate)))))
	};

	render() {
		if (this.state.loading) {
			return (
				<p>Loading</p>
			)
		} else if (this.state.items.length === 0 || this.state.columns.length === 0) {
			return (
				<p>No items available</p>
			)
		} else {
			const backlogColumn = this.state.columns.filter((column) => column.id === 'backlog')[0]
			const scheduleColumn = this.state.columns.filter((column) => column.id === new Date().toDateString())[0]
			const backlogItems = backlogColumn.itemsIds.map((itemId: string) => (this.state.items.filter(item => item.id === itemId)[0]))
			const scheduleItems = scheduleColumn.itemsIds.map((itemId: string) => (this.state.items.filter(item => item.id === itemId)[0]))
			
			return (
				<BoardEl>
					<DragDropContext onDragEnd={this.onDragEnd}>
						<BacklogComponent
							key={backlogColumn.id}
							column={backlogColumn}
							items={this.state.displayedItems}
							sortType={this.state.sortType}
							sortIsUp={this.state.sortIsUp}
							searchInput={this.state.searchInput}
							selectedFilters={this.state.selectedFilters}
							setSortType={this.setSortType}
							setSortIsUp={this.setSortIsUp}
							setSearchInput={this.setSearchInput}
							setSelectedFilters={this.setSelectedFilters}
						/>
						<Schedule key={scheduleColumn.id} column={scheduleColumn} items={scheduleItems} />
						<Calendar key='calendar' columns={this.state.columns} items={this.state.items} />
					</DragDropContext>
				</BoardEl>
			)
		}

	}
}

export default Planner