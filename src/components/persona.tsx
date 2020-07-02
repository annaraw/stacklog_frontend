import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    Persona, PersonaSize
} from 'office-ui-fabric-react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import './persona.css'
import { Member } from '../models/models';

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