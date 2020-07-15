import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    Persona, PersonaSize
} from 'office-ui-fabric-react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { personaStyles } from './PersonaLargeStyles';
import { Member } from '../../../models/models';
import UserService from '../../../services/UserService';

export const PersonaComponent: FunctionComponent<{ person: Member, deleteItem?: any }> = props => {

    const { person, deleteItem } = props;
    const classes = personaStyles();

    return (
        <div className={deleteItem ? classes.persona : ""}>
            <Persona
                secondaryText={person.email}
                tertiaryText={person.role}
                size={deleteItem? PersonaSize.size40 : PersonaSize.size48}
                imageAlt={person.name + " " + person.lastName}
                hidePersonaDetails={false}
                text={person.name + " " + person.lastName + (person.id === UserService.getCurrentUser().id ? "(Me)" : "")}
            />
            {(deleteItem) ?
                <Tooltip title="Remove">
                    <IconButton
                        aria-label="delete"
                        disabled={(person.id === UserService.getCurrentUser().id) ? true : false}
                        size="small"
                        className={classes.iconButton}
                        onClick={deleteItem}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                : <span></span>}
        </div>

    );
};