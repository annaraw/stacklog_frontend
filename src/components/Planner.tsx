import * as React from 'react'
import Backlog from './BacklogComponent';
//import Schedule from './Schedule'
//import Calendar from './Calendar'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from "styled-components";
import { initialPlannerData } from '../data/initialPlannerData'
import BacklogComponent from './BacklogComponent';
import {Schedule} from './Schedule';

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`




export class Planner extends React.Component {

	state = initialPlannerData


	onDragEnd = (result: any) => {

		const { source, destination, draggableId } = result
		// Do nothing if item is dropped outside the list
		if (!destination) {
      		return
    	}
    	// Do nothing if the item is dropped into the same place
    	if (destination.droppableId === source.droppableId && destination.index === source.index) {
      		return
    	}
		// Find column from which the item was dragged from
    	const columnStart = (this.state.columns as any)[source.droppableId]
		// Find column in which the item was dropped
		
    	const columnFinish = (this.state.columns as any)[destination.droppableId]
    	// Moving items in the same list
    	if (columnStart === columnFinish) {
	      // Get all item ids in currently active list
		  const newItemsIds = Array.from(columnStart.itemsIds)
	      // Remove the id of dragged item from its original position
	      newItemsIds.splice(source.index, 1)

	      // Insert the id of dragged item to the new position
	      newItemsIds.splice(destination.index, 0, draggableId)

	      // Create new, updated, object with data for columns
	      const newColumnStart = {
	        ...columnStart,
	        itemsIds: newItemsIds
	      }

	      // Create new board state with updated data for columns
	      const newState = {
	        ...this.state,
	        columns: {
	          ...this.state.columns,
	          [newColumnStart.id]: newColumnStart
	        }
	      }

	      // Update the board state with new data
	      this.setState(newState)
    	} else {
    		// Moving items from one list to another
      		// Get all item ids in source list
      		const newStartItemsIds = Array.from(columnStart.itemsIds)

      		// Remove the id of dragged item from its original position
      		newStartItemsIds.splice(source.index, 1)


      		// Create new, updated, object with data for source column
      		const newColumnStart = {
        		...columnStart,
        		itemsIds: newStartItemsIds
      		}

      		// Get all item ids in destination list
		  	const newFinishItemsIds = Array.from(columnFinish.itemsIds)

		  	// Insert the id of dragged item to the new position in destination list
		  	newFinishItemsIds.splice(destination.index, 0, draggableId)

		  	// Create new, updated, object with data for destination column
		  	const newColumnFinish = {
		   		...columnFinish,
		    	itemsIds: newFinishItemsIds
      		}

      		// Create new board state with updated data for both, source and destination columns
      		const newState = {
        		...this.state,
        		columns: {
          			...this.state.columns,
          			[newColumnStart.id]: newColumnStart,
          			[newColumnFinish.id]: newColumnFinish
        		}
      		}

      		// Update the board state with new data
      		this.setState(newState)
    	}
	};

	render() {
		//console.log(this.state)
		const backlog = (this.state.columns as any)['backlog']
		const schedule = (this.state.columns as any)['schedule']
		const backlogItems = backlog.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])
		const scheduleItems = schedule.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])
		return(
			<BoardEl>
				<DragDropContext onDragEnd={this.onDragEnd}>
						{/* <Column key={column.id}column={column} items={items} /> */}
						<BacklogComponent key={backlog.id} column={backlog} items={backlogItems}/>
						<Schedule key={schedule.id} column={schedule} items={scheduleItems}/>
				</DragDropContext>
			</BoardEl>		)
	}

	
}



export default Planner