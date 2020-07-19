import * as React from 'react';
import { FunctionComponent } from 'react';
import { Drawer, Box, Button, IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { drawerFormStyles } from './DrawerFormStyles';

const DrawerForm: FunctionComponent<{
    formTitle: string,
    isOpen: boolean,
    loading: boolean,
    formType: "Create" | "Update" | "Import"| "Plain",
    onSubmit: () => void,
    dismissPanel: () => void,
}> = props => {
    const { formTitle, isOpen, loading, formType, onSubmit, dismissPanel } = props;
    const classes = drawerFormStyles()

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={dismissPanel}
            className={classes.drawer}
        >
            <Box className={classes.box}>
                <div className={classes.drawerHeading}>
                    <p><strong>{formTitle}</strong></p>
                    <Tooltip title="Close">
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={dismissPanel}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </div>
                {props.children}
            </Box>
            <div className={`${classes.box} ${classes.drawerFooter}`}>
                {loading ?
                    <CircularProgress />
                    : <span></span>}
                {formType !== "Plain" && 
                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            className={classes.defaultButton}
                            onClick={dismissPanel}
                        >
                            Cancel
                            </Button>
                        <Button
                            variant="contained"
                            className={classes.primaryButton}
                            onClick={onSubmit}
                        >
                            {formType}
                        </Button>
                    </div>
                }
            </div>
        </Drawer>
    );
};

export default DrawerForm;