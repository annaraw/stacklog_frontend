import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { CircularProgress } from '@material-ui/core';

import { ICalendarItem, ICalendar } from '../../models/models'
import CalendarImportService from '../../services/CalendarImportService'
import UserService from '../../services/UserService';
import { addCalendarFormStyles } from './AddCalendarFormStyles';
import DrawerForm from '../Form/DrawerForm';
import DialogForm from '../Form/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';

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
    const [showSyncDialog, setShowSyncDialog] = useState<boolean>(false)
    const [uploadError, setUploadError] = useState(false);

    const classes = addCalendarFormStyles()

    const openPanel = (() => setIsOpen(true));

    const dismissPanel = (() => {
        setIsOpen(false);
        setCalendar(null)
        setdeleteError(false)
        setShowDeleteDialog(false)
        setShowSyncDialog(false)
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

    const handleSync = async () => {

        let deleteErr = false
        try {
            await CalendarImportService.removeCalendar(calendar.id)
            setLoading(true)
        } catch (e){
            deleteErr = true
            setdeleteError(true)
        } 

        let calItems = null

        try {
           const getCalItems = await CalendarImportService.fetchCalendarFile(calendar.url)
           calItems = convertIcal(getCalItems)
        } catch (e) {
           setUploadError(true)
        }

        const cal = {
                        name: calendar.name,
                        items: calItems ? calItems : calendar.items,
                        owner: UserService.getCurrentUser().id,
                        url: calendar.url
                    };

        if (!deleteErr){
            try {
                await CalendarImportService.addCalendar(cal)
                setUploadError(false);
                setLoading(false);
                setCalendar(null);
                dismissPanel();
            } catch (e) {
                setLoading(false);
                setUploadError(true);
                setSuccess(false);
            }
        }
    }

    const convertIcal = (icalString: any) => {
        const ical = require('ical');
        const data = ical.parseICS(icalString)
        var calItems = []
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type === 'VEVENT') {
                    const calItem: ICalendarItem = {
                        id: ev.id,
                        uid: ev.uid,
                        summary: ev.summary,
                        description: ev.description,
                        url: ev.url,
                        dtStart: ev.start,
                        dtEnd: ev.end,
                        location: ev.location
                    }
                    calItems.push(calItem)
                }
            }
        }
        return calItems
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

    return (
        <div>
            <div className={classes.button} onClick={openPanel}>{formTitle}</div>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={"Plain"}
                onSubmit={() => {}}
                dismissPanel={dismissPanel}
            >
            <List>
            {props.calendars.map((c:ICalendar) => {
             return (
               <ListItem key={"cal"+c.id} >
                  <ListItemIcon>{<CalendarTodayIcon style={{"color":c.color}}/>}</ListItemIcon>
                  <ListItemText primary={c.name}/>
                  {c.url && <ListItemIcon onClick={() =>{
                              setShowSyncDialog(true)
                              setCalendar(c)
                          } 
                      }
                  >
                  {<SyncIcon/>}
                  </ListItemIcon>}
                  
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
                    Calendar successfully synced
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
            <DialogForm
                isOpen={showSyncDialog}
                formTitle={"Sync Calendar"}
                formType={"Update"}
                onSubmit={() => handleSync()}
                dismissPanel={() => setShowSyncDialog(false)}
            >
                {loading ? <div style={{ 'textAlign': 'center' }}><CircularProgress/></div>
                    : (deleteError || uploadError) ? "Failed to sync calendar. Please reload and try again."
                            : showSyncDialog ? "Are you sure you want to sync the calendar?" : ''}
            </DialogForm>
        </div>
    );
};

export default ManageCalendarsForm;
