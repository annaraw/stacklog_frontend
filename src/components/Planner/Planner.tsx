import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { BacklogComponent } from './Backlog/BacklogComponent';
import { Calendar } from './Calendar/Calendar';
import { IBacklogItem, Column, ICalendar, IBacklogItemUpdateProps } from '../../models/models';
import BacklogItemService from '../../services/BacklogItemService';
import CalendarImportService from '../../services/CalendarImportService'
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { dayStart } from '../../util/constants';

interface BacklogState {
	calendars: ICalendar[],
	items: IBacklogItem[],
	columns: Column[],
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
			columns: [], // column objects (backlog + schedule + calendar days)

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

				this.setState({
					items: itemsFromBackend,
					columns: this.setInitialColumns(itemsFromBackend),
					loading: false,
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
					if (!cal.color) {
						cal.color= this.toColor(cal.name)
					}
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

	toColor(s:string) : string {

        let colors: string[] = ["#e51c23", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#5677fc", "#03a9f4", "#00bcd4", "#009688", "#259b24", "#8bc34a", "#ff9800","#afb42b", "#ff5722", "#795548", "#607d8b"]
        
        var hash = 0;
        if (s.length === 0) return ""+hash;
        for (var i = 0; i < s.length; i++) {
            hash = s.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash = ((hash % colors.length) + colors.length) % colors.length;
        return colors[hash];
    }

	updateBacklogItem = (itemID: string, itemProps: IBacklogItemUpdateProps) => {
		return BacklogItemService.updateBacklogItem(itemID, itemProps)
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
		let today = new Date(new Date().setHours(0, 0, 0, 0))
		//initialize columns
		let initialColumns: Column[] = [{
			id: 'backlog',
			title: 'backlog',
			itemsIds: items.filter((item) => !item.completed && (!item.startDate
				|| new Date(item.startDate) < today)
			).map(item => item.id)
		}]
		for (let i in nextDays) {
			for (let hour = dayStart; hour < 24; hour++) {
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
		// source: backlog -> destination: backlog NO CHANGE
		if (destination.droppableId === source.droppableId && destination.droppableId === "backlog") {
			return
		}
		//TODO: block index backend calls when dropping something into backlog

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
										items={this.state.items.filter((item) => !item.startDate)} //filter for backlog items only
										setBacklogItems={this.setBacklogItems}
									/>)
							}
							<div style={{ position: "relative", height: "calc(100vh - 120px)" }}>
								<Calendar
									calendars={this.state.calendars}
									key='calendar'
									columns={this.state.columns}
									items={this.state.items}
									setBacklogItems={this.setBacklogItems}
								/>
							</div>
						</div>
					</DragDropContext>
					<Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleClose}>
						<Alert onClose={this.handleClose} severity="error">
							Faild to update item
                        </Alert>
					</Snackbar>
				</React.Fragment>

			)
		}

	}
}

export default Planner