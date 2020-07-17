import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import Button from '@material-ui/core/Button';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { ICalendarItem, ICalendar } from '../../models/models'
import CalendarImportService from '../../services/CalendarImportService'
import { addCalendarFormStyles } from './AddCalendarFormStyles';
import DrawerForm from '../Form/DrawerForm';
import DialogForm from '../Form/Dialog';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DeleteIcon from '@material-ui/icons/Delete';




export enum UploadState {
    Empty,
    Success,
    Fail
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageCalendarsForm: FunctionComponent<any> = props => {
    const formTitle = "Manage Calendars";
    //Hooks
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [calendar, setCalendar] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [deleteError, setdeleteError] = useState<boolean>(false)



    const classes = addCalendarFormStyles()

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => {
        setIsOpen(false);
        setCalendar(null)
        setShowDeleteDialog(false)
    });

    const handleDelete = (cal:any) => {
        CalendarImportService.removeCalendar(cal.id).then((data) => {
                dismissPanel();
                setSuccess(true)
                window.location.reload()
            }).catch((e) => {
                setdeleteError(true)
            });

    }

    const submit = () => {
        {/*Do NOTHING*/}
    }

    const handleClose = () => {
        setdeleteError(false)
    };

    const handleCloseSuccessAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };


    function handleHide(){
      console.log("HIDE")
    }

    return (
        <div>
            <Button onClick={openPanel} variant="outlined">{formTitle}</Button>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={"Plain"}
                onSubmit={submit}
                dismissPanel={dismissPanel}
            >
            <List>
            {props.calendars.map((c:ICalendar) => {
             return (
               <ListItem key={"cal"+c.id} >
                  <ListItemIcon>{<CalendarTodayIcon style={{"color":c.color}}/>}</ListItemIcon>
                  <ListItemText primary={c.name}/>
                  <ListItemIcon onClick={() =>{
                              setShowDeleteDialog(true)
                              setCalendar(c)
                          } 
                      }
                  >
                  {<DeleteIcon style={{ 'color': 'red' }}/>}
                  </ListItemIcon>
                </ListItem>
               )
             })}
            </List>
            </DrawerForm>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success">
                    Calendar successfully imported
                </Alert>
            </Snackbar>
            <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Could not delete Calendar
                </Alert>
            </Snackbar>
            <DialogForm
                isOpen={showDeleteDialog}
                formTitle={"Delete Calendar"}
                formType={"Delete"}
                onSubmit={() => handleDelete(calendar)}
                dismissPanel={() => setShowDeleteDialog(false)}
            >
                Are you sure you want to delete the calendar?
            </DialogForm>
        </div>
    );
};

export default ManageCalendarsForm;
