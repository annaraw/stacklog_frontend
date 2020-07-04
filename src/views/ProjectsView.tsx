import * as React from 'react';
import { Component } from 'react';

import ProjectCard from '../components/Projects/ProjectCard/ProjectCard';
import ProjectForm from '../components/Projects/ProjectFrom/ProjectForm';
import { Project, Member } from '../models/models'
import { projectsDummy } from '../data/dummyData'
import ProjectService from '../services/ProjectService';
import MenuBar from '../components/MenuBar';
import { projectViewStyles } from './ProjectsViewStyles';
import { withStyles, Backdrop, CircularProgress } from '@material-ui/core';
import UserService from '../services/UserService';

interface ProjectState {
    projects: Project[];
    collegues: Member[];
    loading: boolean,
}

class ProjectScreen extends Component<{}, ProjectState> {

    constructor(props: any) {
        super(props)
        this.state = {
            projects: projectsDummy,
            collegues: [],
            loading: false,
        }
    }

    componentDidMount = () => {
        this.setLoading();
        ProjectService.getProjects().then((projects) => {
            console.log(projects)
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
                                <ProjectForm
                                    projects={this.state.projects}
                                    setProjects={this.setProjects}
                                    collegues={this.state.collegues}
                                />
                            </div>
                            <div className={classes.projectsWrapper}>
                                {this.state.projects.map(project => {
                                    return (
                                        <div className={classes.project} key={project.id + Math.random()}>
                                            <ProjectCard project={project} key={project.id} />
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
//@ts-ignore
export default withStyles(projectViewStyles)(ProjectScreen)