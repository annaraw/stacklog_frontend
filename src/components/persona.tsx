import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import './persona.css'
import { Project, Member } from '../models/models';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


export const PersonaComponent: FunctionComponent<{ person: Member, deleteItem: any }> = props => {

    const { person, deleteItem } = props;

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
            <IconButton
                aria-label="delete"
                size="small"
                style={{
                    position: "absolute", right: "20px", top: "20px"
                }}
                onClick={deleteItem}
            >
                <DeleteIcon />
            </IconButton>
        </div>

    );
};