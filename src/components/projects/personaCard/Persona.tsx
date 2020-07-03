import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    Persona, PersonaSize
} from 'office-ui-fabric-react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { Member } from '../../../models/models';
import { personaStyles } from './PersonaStyles';

export const PersonaComponent: FunctionComponent<{ person: Member, deleteItem: any }> = props => {

    const { person, deleteItem } = props;
    const classes = personaStyles();

    return (
        <div className={classes.persona}>
            <Persona
                text={person.name + " " + person.lastName}
                secondaryText={person.email}
                tertiaryText={person.role}
                size={PersonaSize.size40}
                //imageUrl={}
                imageAlt={person.name + " " + person.lastName}
            />
            <Tooltip title="Remove">
            <IconButton
                aria-label="delete"
                size="small"
                className={classes.iconButton}
                onClick={deleteItem}
            >
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        </div>

    );
};