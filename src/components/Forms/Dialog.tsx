import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const DialogForm: FunctionComponent<{
    formTitle: string,
    isOpen: boolean,
    formType: "Delete" | "Update",
    onSubmit: () => void,
    dismissPanel: () => void,
}> = props => {
    const { formTitle, isOpen, formType, onSubmit, dismissPanel } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={dismissPanel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{formTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={dismissPanel} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                    {formType}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogForm;

