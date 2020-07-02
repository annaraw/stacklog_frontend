import * as React from 'react';
import { Component } from 'react';

import './ProjectsView.css'
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import { Project } from '../models/models'
import { projectsDummy } from '../data/dummyData'
import ProjectService from '../services/ProjectService';

interface ProjectState {
    projects: Project [];
}

export default class ProjectScreen extends Component<{}, ProjectState> {

    constructor(props: any) {
        super(props)
        this.state = {
            projects: projectsDummy
        }
    }

    componentDidMount = () => {
        ProjectService.getProjects().then((projects) => {
            console.log(projects)
        }).catch(error => {
            console.log(error)
        })
    }

    setProjects = (projects: Project[]) => {
        this.setState({
            projects: projects
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="menuBar">
                    <ProjectForm
                        projects={this.state.projects}
                        setProjects={this.setProjects}
                    />
                </div>
                <div className="projectsWrapper" style={{ width: "80%", margin: "0 auto" }}>
                    {this.state.projects.map(project => {
                        return (
                            <div className="project" key={project.id}>
                                <ProjectCard project={project} />
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }

};