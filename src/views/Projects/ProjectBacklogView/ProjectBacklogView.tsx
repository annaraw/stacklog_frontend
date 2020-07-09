import * as React from 'react';
import { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { withStyles, Backdrop, CircularProgress } from '@material-ui/core';

import { Project, Member, IBacklogItem, Column } from '../../../models/models'
import ProjectService from '../../../services/ProjectService';
import MenuBar from '../../../components/MenuBar';
import UserService from '../../../services/UserService';
import { projectBacklogViewStyles } from './ProjectBacklogViewStyles';
import BacklogItemService from '../../../services/BacklogItemService';
import { UnsortedBacklog } from '../../../components/Planner/Backlog/UnsortedBacklog';

interface ProjectBacklogState {
    project: Project | null,
    projectBacklogItems: IBacklogItem[],
    backlogItems: IBacklogItem[],
    collegues: Member[],
    loading: boolean,
    formIsOpen: boolean,
    error: boolean,
    urlError: boolean,
    columns: Column[],
}

interface ProjectBacklogProps {
    projectID: string
}

class ProjectBacklogScreen extends Component<ProjectBacklogProps, ProjectBacklogState> {

    constructor(props: ProjectBacklogProps) {
        super(props)
        this.state = {
            project: null,
            projectBacklogItems: [],
            backlogItems: [],
            collegues: [],
            loading: true,
            formIsOpen: false,
            error: false,
            urlError: false,
            columns: []
        }
    }

    componentDidMount = async () => {
        let url = new URL(window.location.href);
        let projectID = url.searchParams.get("projectID")

        if (projectID) {
            try {
                let project = await ProjectService.getProjectById(projectID)
                let colleagues = await UserService.getColleagues()
                let backlogItems = await BacklogItemService.getBacklogItems()
                let projectBacklog = await BacklogItemService.getProjectBacklogItems(projectID)

                //@ts-ignore
                let myItems: IBacklogItem[] = backlogItems
                //@ts-ignore
                let projectItems: IBacklogItem[] = projectBacklog

                //initialize columns
                let initialColumns: Column[] = [{
                    id: 'backlog',
                    title: 'Backlog',
                    itemsIds: myItems.filter((item) => !item.startDate
                        || new Date(item.startDate).toDateString() <= new Date().toDateString()
                    ).map(item => item.id)
                }, {
                    id: 'projectBacklog',
                    //@ts-ignore
                    title: project.title,
                    itemsIds: projectItems.map(item => item.id)
                }]

                this.setState({
                    //@ts-ignore
                    project: project,
                    projectBacklogItems: projectItems,
                    backlogItems: myItems,
                    columns: initialColumns,
                    //@ts-ignore
                    collegues: colleagues,
                    loading: false,
                })
            } catch (error) {
                this.setState({
                    urlError: true,
                    loading: false,
                })
            }
        } else {
            this.setState({
                urlError: true,
                loading: false,
            })
        }
    }

    setProjects = (project: Project) => {
        this.setState({
            project: project
        })
    }

    setCollegues = (collegues: Member[]) => {
        this.setState({
            collegues: collegues
        })
    }

    setLoading = () => {
        this.setState({ loading: !this.state.loading })
    }

    setFormIsOpen = (isOpen: boolean) => {
        this.setState({ formIsOpen: isOpen })
    }

    setColumns = (column: Column, columnEnd?: Column, backlogItems?: IBacklogItem[], projectsItems?: IBacklogItem[]) => {
        let index = this.state.columns.findIndex(c => column.id === c.id)
        let newColumns = [...this.state.columns]
        newColumns[index] = column
        if (columnEnd && backlogItems && projectsItems) {
            let indexEndColumn = this.state.columns.findIndex(c => columnEnd.id === c.id)
            newColumns[indexEndColumn] = columnEnd

            this.setState({
                columns: newColumns,
                projectBacklogItems: projectsItems,
                backlogItems: backlogItems,
            })
        } else {
            this.setState({
                columns: newColumns,
            })
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
        // TURN OFF DRAG AND DROP WITHIN BACKLOG COLUMN
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
            let itemsBacklog
            let itemsProject
            // Change date of item to the date of columnFinish
            if (columnFinish.id === 'backlog') {
                let newItem: IBacklogItem = this.state.projectBacklogItems.filter(item => item.id === draggableId)[0]
                newItem.assignee = UserService.getCurrentUser().id
                itemsBacklog = this.state.backlogItems
                itemsProject = this.state.projectBacklogItems
                itemsBacklog.splice(destination.index, 0, itemsProject.filter(item => item.id === draggableId)[0])
                itemsProject.splice(source.index, 1)
            } else {
                let newItem: IBacklogItem = this.state.backlogItems.filter(item => item.id === draggableId)[0]
                newItem.assignee = ""
                itemsProject = this.state.projectBacklogItems
                itemsBacklog = this.state.backlogItems
                itemsProject.splice(destination.index, 0, itemsBacklog.filter(item => item.id === draggableId)[0])
                itemsBacklog.splice(source.index, 1)
            }

            const newStartItemsIds = columnStart.itemsIds // Get all item ids in source list
            newStartItemsIds.splice(source.index, 1) // Remove the id of dragged item from its original position

            // Create new, updated object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds
            }

            const newFinishItemsIds = columnFinish.itemsIds // Get all item ids in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId) // Insert the id of dragged item to the new position in destination list

            // Create new, updated object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds
            }

            this.setColumns(newColumnStart, newColumnFinish, itemsBacklog, itemsProject)
        }
    };

    render() {
        //@ts-ignore
        const { classes } = this.props

        if (this.state.loading) {
            return (
                <React.Fragment >
                    <MenuBar title="Loading" />
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </React.Fragment >
            )
        } else if (this.state.urlError) {
            return (
                <React.Fragment >
                    <MenuBar title="Error" />
                    <p>Error: no url parameter provided</p>
                </React.Fragment >
            )
        } else if (this.state.error) {
            return (
                <React.Fragment >
                    <MenuBar title="Error" />
                    <p>Error: Server is not responding</p>
                </React.Fragment >
            )
        } else {
            const backlogColumn = this.state.columns.filter((column) => column.id === 'backlog')[0]
            const projectColumn = this.state.columns.filter((column) => column.id === 'projectBacklog')[0]
            const backlogItems = backlogColumn.itemsIds.map((itemId: string) => (this.state.backlogItems.filter(item => item.id === itemId)[0])).filter(item => item.team === this.state.project?.id)
            const projectItems = projectColumn.itemsIds.map((itemId: string) => (this.state.projectBacklogItems.filter(item => item.id === itemId)[0]))
            return (
                <React.Fragment>
                    <MenuBar title={this.state.project ? this.state.project.title : "Loading"} />
                    {this.state.loading ?
                        <Backdrop className={classes.backdrop} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <div className={classes.container}>
                                <UnsortedBacklog key={projectColumn.id} column={projectColumn} items={projectItems} title={projectColumn.title} />
                                <UnsortedBacklog key={backlogColumn.id} column={backlogColumn} items={backlogItems} title={backlogColumn.title} />
                            </div>

                        </DragDropContext>
                    }

                </React.Fragment>
            );
        }
    }

};
export default withStyles(projectBacklogViewStyles)(ProjectBacklogScreen)