import * as React from 'react';
import { FunctionComponent } from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react';
import { Popover } from '@material-ui/core';

import { Member } from '../../../models/models';
import { PersonaComponent } from './PersonaLarge';
import UserService from '../../../services/UserService';
import { personaSmallStyles } from './PersonaSmallStyles';

export const PersonaSmall: FunctionComponent<{ member: Member }> = props => {

    const { member } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const classes = personaSmallStyles();

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div
                className={classes.Persona}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Persona
                    size={PersonaSize.size32}
                    hidePersonaDetails={true}
                    text={member.name + " " + member.lastName
                        + (member.id === UserService.getCurrentUser().id ? "(Me)" : "")}
                />
            </div>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <PersonaComponent person={member} />
            </Popover>
        </>
    );
};