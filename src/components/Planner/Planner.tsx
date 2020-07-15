import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from "styled-components";
import { BacklogComponent } from './Backlog/BacklogComponent';
import { Calendar } from './Calendar/Calendar';
import { sortTypes } from '../../util/constants';
import { IBacklogItem, Column, ICalendar, Category, Priority, IBacklogItemUpdateProps } from '../../models/models';
import BacklogItemService from '../../services/BacklogItemService';
import BacklogItemForm from '../BacklogItemForm/BacklogItemForm';
import { Button } from '@material-ui/core';
import CalendarImportService from '../../services/CalendarImportService'
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface BacklogState {
	calendars: ICalendar[],
	items: IBacklogItem[],
	displayedItems: IBacklogItem[],
	columns: Column[],
	searchInput: string,
	sortIsUp: boolean,
	sortType: string,
	selectedFilters: string[],
	categories: Category[],
	loading: boolean,
	loadingError: boolean,
	error: boolean,
	formIsOpen: boolean,
}

export class Planner extends React.Component<{}, BacklogState> {

	constructor(props: any) {
		super(props)
		//const {column, items, setSortType} = props
		this.state = {
			calendars: [],
			items: [], // all items in every column
			displayedItems: [],
			columns: [], // column objects (backlog + schedule + calendar days)

			// states for search, sort, filter:
			searchInput: "",
			sortIsUp: false,
			sortType: sortTypes.priority,
			selectedFilters: [],
			categories: [],

			loading: true,
			formIsOpen: false,
			error: false,
			loadingError: false,

		}
	}

	componentDidMount = () => {
		this.setState({ loading: true })

		//backend request - get backlog items
		BacklogItemService.getBacklogItems().then(responseItems => {
			let itemsFromBackend: IBacklogItem[] = []

			if (responseItems) {
				//@ts-ignore
				for (let item of responseItems) {
					itemsFromBackend.push({
						id: item.id ? item.id : null,
						author: item.author ? item.author : null,
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
						index: item.index ? item.index : 0,
						hour: item.startDate ? new Date(item.startDate).getHours() : 0
					})
				}

				//initialize categories
				let temp: string[] = []
				let categories: Category[] = []
				for (var i = 0; i < itemsFromBackend.length; i++) {
					if (temp.includes((itemsFromBackend[i].category))) continue;
					temp.push(itemsFromBackend[i].category);
					var c: Category = {
						key: itemsFromBackend[i].category ? itemsFromBackend[i].category : "No Category",
						text: itemsFromBackend[i].category ? itemsFromBackend[i].category : "No Category",
						color: itemsFromBackend[i].category ? "#c0c0c0" : "#ffffff"
					}
					categories.push(c)
				}

				this.setState({
					items: itemsFromBackend,
					displayedItems: itemsFromBackend.filter((item) => !item.startDate),
					columns: this.setInitialColumns(itemsFromBackend),
					loading: false,
					categories: categories
				})
			} else {
				this.setState({
					loadingError: true,
					loading: false,
				})
			}

		}).catch(error => {
			//TODO show error message to user
			console.log(error)
			this.setState({
				loadingError: true,
				loading: false
			})
		})


		CalendarImportService.getCalendars().then(responseItems => {
			let calendars: ICalendar[] = []

			if (responseItems) {
				//@ts-ignore
				for (let cal of responseItems) {
					calendars.push(cal)
				}


				this.setState({
					calendars: calendars,
					loading: false,
				})

			} else {
				this.setState({
					loading: false,
				})
			}
		}).catch(error => {
			//TODO show error message to user
			console.log(error)
			this.setState({
				loadingError: true,
				loading: false
			})
		})

	}

	updateBacklogItem = (itemID: string, itemProps: IBacklogItemUpdateProps) => {
		return BacklogItemService.updateBacklogItem(itemID, itemProps)
	}

	getCalendars = async () => {
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.filter(await this.search(await this.sort(allBacklogItems))))
	}

	setInitialColumns = (items: IBacklogItem[]) => {
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
			itemsIds: items.filter((item) => !item.completed && (!item.startDate
				|| new Date(item.startDate).toDateString() <= new Date().toDateString())
			).map(item => item.id)
		}]
		for (let i in nextDays) {
			for (let hour = 0; hour < 24; hour++) {
				initialColumns.push({
					id: nextDays[i] + "-" + hour,
					title: nextDays[i] + "-" + hour,
					itemsIds: items.filter((item) => item.startDate
						&& new Date(item.startDate).toDateString() === nextDays[i])
						.filter(item => item.hour === hour)
						.sort((a, b) => a.index - b.index)
						.map(item => item.id)
				})
			}
		}
		console.log("INIT COLUMNS", initialColumns)
		return initialColumns
	}

	setBacklogItems = (items: IBacklogItem[]) => {
		let columns = this.setInitialColumns(items)
		this.setState({
			items: items,
			columns: columns
		})
	}

	setFormIsOpen = (isOpen: boolean) => {
		this.setState({ formIsOpen: isOpen })
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

	setItem = (item: IBacklogItem) => {
		let index = this.state.items.findIndex(i => item.id === i.id)
		let newItems = [...this.state.items]
		newItems[index] = item
		this.setState({ items: newItems })
	}

	setSearchInput = async (searchInput: string) => {
		this.setState({ searchInput: searchInput })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.onUpdateDisplayedItems(allBacklogItems))
	}

	setSortIsUp = async (isUp: boolean) => {
		this.setState({ sortIsUp: isUp })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.onUpdateDisplayedItems(allBacklogItems))
	}

	setSortType = async (sortType: string) => {
		this.setState({ sortType: sortType })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.onUpdateDisplayedItems(allBacklogItems))
	}

	setSelectedFilters = async (selectedFilters: string[]) => {
		this.setState({ selectedFilters: selectedFilters })
		var allBacklogItems = await this.state.items.filter((item) => !item.startDate)
		this.setDisplayedItems(await this.onUpdateDisplayedItems(allBacklogItems))
	}

	setDisplayedItems = (displayedItems: IBacklogItem[]) => {
		this.setState({ displayedItems: displayedItems })
	}

	onUpdateDisplayedItems = async (displayedItems: IBacklogItem[]) => {
		return await this.filter(
			await this.search(
				await this.sort(displayedItems)
			)
		)
	}

	filter = async (itemList: IBacklogItem[]) => {
		//create list of filtered backlog
		var temp: IBacklogItem[] = []
		//show all items if no category is selected
		if (this.state.selectedFilters.length === 0) {
			temp = itemList
		} else {
			itemList.forEach(backlogItem => {
				if (this.state.selectedFilters.includes(backlogItem.category) || (backlogItem.category === null && this.state.selectedFilters.includes("No Category"))) {
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
		else if (this.state.sortType === sortTypes.alphabetical) {
			temp =
				this.state.sortIsUp ? (itemList.sort(
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

	search = async (itemList: IBacklogItem[]) => {
		//split search string into array of keywords
		var searchInput: string[] = this.state.searchInput.split(' ')
		//delete the last space character in the keyword array except if it is the last remaining item in the array
		if (searchInput.length !== 1) {
			searchInput = searchInput.filter(function (element) { return element !== ""; })
		}
		//select all backlog items that contain one of the keywords
		var temp: IBacklogItem[] = []
		searchInput.forEach(keyword => {
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

	updateStartColumn(columnStart: any, newColumnStart: any, columnFinish: any, undo: boolean) {
		let cnt = 0
		let breakLoop = false
		for (const id of newColumnStart.itemsIds) {
			if (breakLoop) { break }
			const item = this.state.items.filter(item => item.id === id)[0]
			//START COLUMN -> ONLY CHANGE INDEX OF ITEMS
			item.index = cnt
			this.setItem(item)

			cnt += 1
			//IF THIS IS NO UNDO OPERATION -> CALL THE BACKEND
			if (!undo) {
				this.updateBacklogItem(item.id, { index: item.index }).then()
					.catch(error => {
						console.log("ERROR", error)
						this.setColumns(columnStart, columnFinish)
						this.setState({
							error: true
						})
						// ERROR -> CALL UNDO OPERATION WITH OLD columnStart AS newColumnStart
						this.updateStartColumn(columnStart, columnStart, columnFinish, true)
					})
				breakLoop = true
			}
		}
	}

	updateFinishColumn(newDate: Date | null, columnStart: any, newColumnFinish: any, columnFinish: any, undo: boolean) {
		let cnt = 0
		let breakLoop = false
		for (const id of newColumnFinish.itemsIds) {
			if (breakLoop) { break }
			const item = this.state.items.filter(item => item.id === id)[0]
			//FINISH COLUMN ->  CHANGE INDEX, HOUR AND START DATE OF ITEMS
			item.index = cnt
			item.startDate = newDate
			this.setItem(item)
			cnt += 1
			//IF THIS IS NO UNDO OPERATION -> CALL THE BACKEND
			if (!undo) {
				this.updateBacklogItem(item.id, { index: item.index, startDate: item.startDate }).then()
					.catch(error => {
						console.log("ERROR", error)
						this.setColumns(columnStart, columnFinish)
						var oldDate = (columnStart.id === 'backlog') ? null : new Date(columnStart.id.split("-")[0])
						this.setState({
							error: true
						})
						// ERROR -> CALL UNDO OPERATION WITH OLD DATE, OLD HOUR AND OLD columnFinish AS newColumnFinish
						this.updateFinishColumn(oldDate, columnStart, columnFinish, columnFinish, true)
						breakLoop = true
					})
			}
		}
	}

	updateSameColumn(newColumnStart: any, columnStart: any, undo: boolean) {
		let cnt = 0
		let breakLoop = false
		for (const id of newColumnStart.itemsIds) {
			//console.log("ID",id)
			if (breakLoop) { break }
			const item = this.state.items.filter(item => item.id === id)[0]
			item.index = cnt
			this.setItem(item)
			cnt += 1
			//IF THIS IS NO UNDO OPERATION -> CALL THE BACKEND
			if (!undo) {
				this.updateBacklogItem(item.id, { index: item.index }).then()
					.catch(error => {
						console.log("ERROR", error)
						this.setColumns(columnStart)
						this.setState({
							error: true
						})
						// ERROR -> CALL UNDO OPERATION WITH OLD columnStart AS newColumnStart
						this.updateSameColumn(columnStart, columnStart, true)
						breakLoop = true
					})
			}
		}
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

		const columnStart = this.state.columns.filter((column) => column.id === source.droppableId)[0] // Find column from which the item was dragged from
		console.log("COL ID", source.droppableId)
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

			this.updateSameColumn(newColumnStart, columnStart, false)
		}
		// (4) DROPPED INTO ANOTHER COLUMN
		else {
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

			var newDate = (columnFinish.id === 'backlog') ? null : new Date(columnFinish.id.split("-")[0])
			var newHour = (columnFinish.id === 'backlog') ? 0 : parseInt(columnFinish.id.split("-")[1])
			if (newDate) {
				new Date(newDate.setHours(newHour))
			}
			this.updateStartColumn(columnStart, newColumnStart, columnFinish, false)
			this.updateFinishColumn(newDate, columnStart, newColumnFinish, columnFinish, false)

		}
		this.setDisplayedItems(await this.onUpdateDisplayedItems(this.state.items.filter((item) => !item.startDate)))
	};

	handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({
			error: false
		})
	};

	getDayColumns(day: string) {
		return this.state.columns.filter((col) => col.id.split("-")[0] === day)
	}

	render() {
		if (this.state.loading) {
			return (
				<React.Fragment >
					<Backdrop open={true}>
						<CircularProgress color="inherit" />
					</Backdrop>
				</React.Fragment >
			)
		} else if (this.state.loadingError) {
			return (
				<React.Fragment >
					<p>Error: Server is not responding</p>
				</React.Fragment >
			)
		} else {
			return (
				<React.Fragment>

					<DragDropContext onDragEnd={this.onDragEnd} >
						<div style={{
							display: "grid",
							gridTemplateColumns: "1fr 3fr"
						}}>
							{this.state.columns.map((col) => col.id.split("-")[0])
								.filter((item, i, ar) => ar.indexOf(item) === i)
								.filter((col) => col === 'backlog')
								.map((col) =>
									<BacklogComponent
										key={col}
										column={this.getDayColumns(col)[0]}
										items={this.state.displayedItems}
										sortType={this.state.sortType}
										sortIsUp={this.state.sortIsUp}
										searchInput={this.state.searchInput}
										selectedFilters={this.state.selectedFilters}
										setSortType={this.setSortType}
										setSortIsUp={this.setSortIsUp}
										setSearchInput={this.setSearchInput}
										setSelectedFilters={this.setSelectedFilters}
										categories={this.state.categories}
									/>)
							}
							<div style={{ position: "relative" }}>
								<Calendar calendars={this.state.calendars} key='calendar' columns={this.state.columns} items={this.state.items} />
							</div>
						</div>
					</DragDropContext>
					<Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleClose}>
						<Alert onClose={this.handleClose} severity="error">
							Faild to update item
                                </Alert>
					</Snackbar>

					<Button
						//className={classes.createProjectBtn}
						onClick={() => this.setFormIsOpen(true)}
						variant="contained">
						Create Task
                    </Button>
					<BacklogItemForm
						isOpen={this.state.formIsOpen}
						setIsOpen={this.setFormIsOpen}
						formTitle="Create Task"
						items={this.state.items}
						//TODO not rerendering
						setBacklogItems={this.setBacklogItems.bind(this)}
						formType={"Create"}
					/>
				</React.Fragment>

			)
		}

	}
}

export default Planner