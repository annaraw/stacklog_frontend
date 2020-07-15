import * as React from 'react';
import { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { withStyles, Backdrop, CircularProgress, Snackbar, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    collegues: Member[],
    loading: boolean,
    formIsOpen: boolean,
    error: boolean,
    loadingError: boolean,
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
            collegues: [],
            loading: true,
            formIsOpen: false,
            error: false,
            loadingError: false,
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
                let projectBacklog = await BacklogItemService.getProjectBacklogItems(projectID)

                //@ts-ignore
                let projectItems: IBacklogItem[] = projectBacklog

                //initialize columns
                let initialColumns: Column[] = [{
                    id: 'backlog',
                    title: 'Backlog',
                    itemsIds: projectItems
                        .filter((item) => item.assignee === UserService.getCurrentUser().id)
                        .map(item => item.id)
                }, {
                    id: 'projectBacklog',
                    //@ts-ignore
                    title: project.title,
                    itemsIds: projectItems
                        .filter((item) => item.assignee !== UserService.getCurrentUser().id)
                        .map(item => item.id)
                }]

                this.setState({
                    //@ts-ignore
                    project: project,
                    projectBacklogItems: projectItems,
                    columns: initialColumns,
                    //@ts-ignore
                    collegues: colleagues,
                    loading: false,
                })
            } catch (error) {
                this.setState({
                    loadingError: true,
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

    setProjectBacklogItems = (items: IBacklogItem[]) => {
        let updatedColumns: Column[] = [{
            id: 'backlog',
            title: 'Backlog',
            itemsIds: items
                .filter((item) => item.assignee === UserService.getCurrentUser().id)
                .map(item => item.id)
        }, {
            id: 'projectBacklog',
            //@ts-ignore
            title: this.state.project.title,
            itemsIds: items
                .filter((item) => item.assignee !== UserService.getCurrentUser().id)
                .map(item => item.id)
        }]
        this.setState({
            projectBacklogItems: items,
            columns: updatedColumns,
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
        this.setState({ columns: [...newColumns] })
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
        const columnStart = Object.assign(this.state.columns
            .filter((column) => column.id === source.droppableId)[0]) // Find column from which the item was dragged from
        const columnFinish = Object.assign(this.state.columns
            .filter((column) => column.id === destination.droppableId)[0]) // Find column in which the item was dropped
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
            if (columnFinish.id === 'backlog') {
                let newItem: IBacklogItem = this.state.projectBacklogItems.filter(item => item.id === draggableId)[0]
                newItem.assignee = UserService.getCurrentUser().id
                BacklogItemService.updateBacklogItem(newItem.id, { assignee: UserService.getCurrentUser().id }).then()
                    .catch(error => {
                        newItem.assignee = ""
                        this.setColumns(columnStart, columnFinish)
                        this.setState({
                            error: true
                        })
                    })
            } else {
                let newItem: IBacklogItem = this.state.projectBacklogItems.filter(item => item.id === draggableId)[0]
                newItem.assignee = ""
                BacklogItemService.updateBacklogItem(newItem.id, { assignee: "" }).then()
                    .catch(error => {
                        newItem.assignee = UserService.getCurrentUser().id
                        this.setColumns(columnStart, columnFinish)
                        this.setState({
                            error: true
                        })
                    })
            }
            const newStartItemsIds = [...columnStart.itemsIds] // Get all item ids in source list
            newStartItemsIds.splice(source.index, 1) // Remove the id of dragged item from its original position

            // Create new, updated object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds
            }

            const newFinishItemsIds = [...columnFinish.itemsIds] // Get all item ids in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId) // Insert the id of dragged item to the new position in destination list

            // Create new, updated object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds
            }
            this.setColumns(newColumnStart, newColumnFinish)
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
        } else if (this.state.loadingError) {
            return (
                <React.Fragment >
                    <MenuBar title="Error" />
                    <p>Error: Server is not responding</p>
                </React.Fragment >
            )
        } else {
            const backlogColumn = this.state.columns.filter((column) => column.id === 'backlog')[0]
            const projectColumn = this.state.columns.filter((column) => column.id === 'projectBacklog')[0]
            const backlogItems = backlogColumn.itemsIds.map((itemId: string) => (this.state.projectBacklogItems
                .filter(item => item.id === itemId)[0]))
                .filter(item => item.team === this.state.project?.id)
            const projectItems = projectColumn.itemsIds.map((itemId: string) => (this.state.projectBacklogItems
                .filter(item => item.id === itemId)[0]))
                .filter(item => item.team === this.state.project?.id
                    && item.assignee !== UserService.getCurrentUser().id)

            return (
                <React.Fragment>
                    <MenuBar title={this.state.project ? this.state.project.title : "Loading"} />
                    {this.state.loading ?
                        <Backdrop className={classes.backdrop} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        <>
                            <Button
                                className={classes.backButton}
                                startIcon={<ArrowBackIcon />}
                                onClick={() => window.location.href = "/projects"}
                            >
                                Projects
                            </Button>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <div className={classes.container}>
                                    <UnsortedBacklog
                                        key={projectColumn.id}
                                        column={projectColumn}
                                        items={projectItems}
                                        projectItems={this.state.projectBacklogItems}
                                        title={projectColumn.title}
                                        setBacklogItems={this.setProjectBacklogItems}
                                        project={this.state.project ? this.state.project : undefined}
                                    />
                                    <UnsortedBacklog
                                        key={backlogColumn.id}
                                        column={backlogColumn}
                                        items={backlogItems}
                                        projectItems={this.state.projectBacklogItems}
                                        title={backlogColumn.title}
                                        setBacklogItems={this.setProjectBacklogItems}
                                        project={this.state.project ? this.state.project : undefined}
                                        selfAssigned={true}
                                    />
                                </div>

                            </DragDropContext>
                            <Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    Faild to update item
                                </Alert>
                            </Snackbar>
                        </>
                    }

                </React.Fragment>
            );
        }
    }

};
export default withStyles(projectBacklogViewStyles)(ProjectBacklogScreen)