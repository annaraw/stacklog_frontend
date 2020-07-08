import * as React from 'react';
import { Component } from 'react';

import ProjectCard from '../../../components/Projects/ProjectCard/ProjectCard';
import { Project, Member, IBacklogItem } from '../../../models/models'
import { projectsDummy } from '../../../data/dummyData'
import ProjectService from '../../../services/ProjectService';
import MenuBar from '../../../components/MenuBar';
import { withStyles, Backdrop, CircularProgress, Button } from '@material-ui/core';
import UserService from '../../../services/UserService';
import ProjectForm from '../../../components/Projects/ProjectFrom/ProjectForm';
import { projectBacklogViewStyles } from './ProjectBacklogViewStyles';
import BacklogItemService from '../../../services/BacklogItemService';

interface ProjectBacklogState {
    projects: Project[],
    projectBacklogItems: IBacklogItem[],
    backlogItems: IBacklogItem[],
    collegues: Member[],
    loading: boolean,
    formIsOpen: boolean,
    error: boolean,
}

interface ProjectBacklogProps {
    projectID: string
}

class ProjectBacklogScreen extends Component<ProjectBacklogProps, ProjectBacklogState> {

    constructor(props: ProjectBacklogProps) {
        super(props)
        this.state = {
            projects: [],
            projectBacklogItems: [],
            backlogItems: [],
            collegues: [],
            loading: false,
            formIsOpen: false,
            error: false,
        }
    }

    componentDidMount = () => {
        this.setLoading();
        ProjectService.getProjectById(this.props.projectID).then((project) => {
            //@ts-ignore
            this.setProject(project)
            console.log(project)
            this.setLoading();
        }).catch(error => {
            console.log(error)
            this.setState({
                error: true
            })
        })

        UserService.getColleagues().then((collegues) => {
            //@ts-ignore
            this.setCollegues(collegues)
        }).catch(error => {
            console.log(error)
        })

        BacklogItemService.getBacklogItems().then(items => {
            console.log("My items")
            console.log(items)
            this.setState({
                //@ts-ignore
                backlogItems: items
            })
        })

        BacklogItemService.getBacklogItems().then(items => {
            console.log("Project items")
            console.log(items)
        })
    }

    setProjects = (projects: Project[]) => {
        this.setState({
            projects: projects
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

    render() {
        //@ts-ignore
        const { classes } = this.props

        return (
            <React.Fragment>
                <MenuBar title="Projects" />
                {this.state.loading ?
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : (this.state.projects.length > 0) ?
                        <>
                            <div className={classes.menuBar}>
                                <Button
                                    className={classes.createProjectBtn}
                                    onClick={() => this.setFormIsOpen(true)}
                                    variant="contained">
                                    Create Project
                                </Button>
                                <ProjectForm
                                    isOpen={this.state.formIsOpen}
                                    setIsOpen={this.setFormIsOpen}
                                    formTitle="Create Project"
                                    projects={this.state.projects}
                                    setProjects={this.setProjects}
                                    collegues={this.state.collegues}
                                    formType={"Create"}
                                />
                            </div>
                            <div className={classes.projectsWrapper}>
                                {this.state.projects.map(project => {
                                    return (
                                        <div className={classes.project} key={project.id + Math.random()}>
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                projects={this.state.projects}
                                                collegues={this.state.collegues}
                                                setProjects={this.setProjects}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        /* placeholder */
                        : <p>no projects available</p>
                }

            </React.Fragment>
        );
    }

};
export default withStyles(projectBacklogViewStyles)(ProjectBacklogScreen)