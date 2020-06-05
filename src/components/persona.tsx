import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import './persona.css'
import { Project, Member } from '../models/models';


export const PersonaComponent: FunctionComponent<{ person: Member }> = props => {

    const { person } = props;

    return (
        <div className="persona">
            <Persona
                text={person.name + " " + person.lastName}
                secondaryText={person.email}
                tertiaryText={person.role}
                size={PersonaSize.size40}
                //imageUrl={}
                imageAlt={person.name + " " + person.lastName}
            />
        </div>

    );
};