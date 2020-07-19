import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';

import ProjectCard from '../../../components/Projects/ProjectCard/ProjectCard';
import { Project, Member } from '../../../models/models'
import ProjectService from '../../../services/ProjectService';
import { projectViewStyles } from './ProjectsViewStyles';
import { withStyles, Backdrop, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import UserService from '../../../services/UserService';
import ProjectForm from '../../../components/Forms/ProjectForm/ProjectForm';

interface ProjectState {
    projects: Project[];
    collegues: Member[];
    loading: boolean,
    formIsOpen: boolean,
}

class ProjectScreen extends Component<{}, ProjectState> {

    constructor(props: any) {
        super(props)
        this.state = {
            projects: [],
            collegues: [],
            loading: false,
            formIsOpen: false
        }
    }

    componentDidMount = () => {
        this.setLoading();
        ProjectService.getProjects().then((projects) => {
            //@ts-ignore
            this.setProjects(projects)
            this.setLoading();
        }).catch(error => {
            console.log(error)
        })

        UserService.getColleagues().then((collegues) => {
            //@ts-ignore
            this.setCollegues(collegues)
        }).catch(error => {
            console.log(error)
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
                {this.state.loading ?
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : <>
                            <div className={classes.menuBar}>
                                <Tooltip title="Create Project" placement="left" arrow>
                                    <IconButton className={classes.addButton} aria-label="add" onClick={() => this.setFormIsOpen(true)}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
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
                        {(this.state.projects.length > 0) ?
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
                                                hideShowBacklog={false}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className={classes.noItemsDialog}>
                                <p><b>You are currently not in a project</b></p>
                                <p>To create a new project, click the 'new Project' bottom</p>
                            </div>
                        }
                    </>
                }

            </React.Fragment>
        );
    }

};
//@ts-ignore
export default withStyles(projectViewStyles)(ProjectScreen)