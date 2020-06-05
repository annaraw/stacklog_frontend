import * as React from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import './ProjectCard.css'
import { Project } from '../models/models';
import { FunctionComponent } from 'react';


const ProjectCard: FunctionComponent<{ project: Project }> = props => {

    const { project } = props;
    const personas: IPersonaSharedProps[] = project.team.map(member => {
        return (
            {
                imageInitials: member.name[0] + member.lastName[0],
                text: member.name + " " + member.lastName,
                secondaryText: member.role,
                tertiaryText: member.email
            }
        )
    })

    return (
        <div className="card">
            <div className="header">
                <div className="header-title">{project.title}</div>
                <div className="header-menu"></div>
            </div>
            <div className="container">
                {(project.team.length !== 0) ?
                    <div className="card-info card-team">
                        <p><b>Team</b></p>
                        {personas.map(persona => {
                            return (
                                <Persona
                                    {...persona}
                                    size={PersonaSize.size32}
                                    hidePersonaDetails={true}
                                    imageAlt={persona.text}
                                    key={persona.text}
                                />
                            )
                        })}
                    </div>
                    : <span></span>
                }
                <div style={{ clear: "both" }}></div>

                {(project.backlogItems) ?
                    <div className="card-info card-team">
                        <p><b>Progress</b></p>
                        <div className="card-backlog">
                            <p>{project.backlogItems} items left in the backlog</p>
                        </div>

                        <div className="card-progressBar">
                            <span style={{ width: project.progress + "%" }}></span>
                        </div>
                    </div>
                    : <span></span>
                }

                {(project.description) ?
                    <div className="card-info card-description">
                        <p><b>Description</b></p>
                        <p>{project.description}</p>
                    </div>
                    : <span></span>
                }

            </div>
        </div>
    );
};

export default ProjectCard;