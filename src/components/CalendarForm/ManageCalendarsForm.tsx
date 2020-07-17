import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RadioGroup, FormControl, FormControlLabel, Radio, TextField, Checkbox } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import Snackbar from '@material-ui/core/Snackbar';

import { ICalendarItem, ICalendar } from '../../models/models'
import CalendarImportService from '../../services/CalendarImportService'
import { addCalendarFormStyles } from './AddCalendarFormStyles';
import UserService from '../../services/UserService';
import DrawerForm from '../Form/DrawerForm';

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
    const [uploadError, setUploadError] = useState(false);
    const [showSync, setShowSync] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [isPublic, { toggle: toggleIsPublic }] = useBoolean(true);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarUrl, setCalendarUrl] = useState("");
    const [calendarItems, setCalendarItems] = useState<ICalendarItem[] | []>([]);
    const [calendarFilename, setCalendarFilename] = useState("");
    const [uploadState, setUploadState] = useState(UploadState.Empty);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)

    const classes = addCalendarFormStyles()

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => {
        setCalendarFilename("")
        setIsOpen(false);
        setCalendarTitle("");
        setCalendarUrl("");
        setCalendarItems([])
        setShowFileUpload(false);
        setShowSync(false);
        setUploadState(UploadState.Empty)
        setUploadError(false)
        setSuccess(false)
        setLoading(false)

        console.log(loading)
    });

    const submit = () => {
        setUploadError(false)
        if (uploadState === UploadState.Empty || uploadState === UploadState.Fail || calendarTitle === "") {
            setUploadError(true);
        } else {
            setLoading(true)
            var cal: ICalendar
            if (calendarUrl !== "") {
                cal = {
                    name: calendarTitle,
                    items: calendarItems,
                    owner: UserService.getCurrentUser().id,
                    url: calendarUrl
                };
            } else {
                cal = {
                    name: calendarTitle,
                    items: calendarItems,
                    owner: UserService.getCurrentUser().id
                };
            }
            CalendarImportService.addCalendar(cal).then((data) => {
                setUploadError(false);
                dismissPanel();
                setSuccess(true);
                setLoading(false);
            }).catch((e) => {
                setLoading(false);
                setUploadError(true);
            });
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

    const fetchCalendarFile = async () => {
        //https://campus.tum.de/tumonlinej/ws/termin/ical?pStud=408917D318E7CE33&pToken=9ECCFD276B854295B32B4E20E1154FE1E741E10B7022E05CC5062FBA53D39F82
        let data = await CalendarImportService.fetchCalendarFile(calendarUrl)
        let calItems = convertIcal(data)
        setCalendarItems(calItems)
        if (calItems.length !== 0) {
            setUploadState(UploadState.Success)
        }
        else {
            setUploadState(UploadState.Fail)
        }
        setUploadError(false)
    }

    const uploadCalendarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            var reader = new FileReader();
            var calItems: ICalendarItem[] = []
            var filename = e.target.files[0].name
            reader.onload = function () {
                calItems = convertIcal(reader.result)
                setCalendarItems(calItems)
                setCalendarFilename(filename)
                if (calItems.length !== 0) {
                    setUploadState(UploadState.Success)
                }
                else {
                    setUploadState(UploadState.Fail)
                }

            };
            var file = e.target.files[0]
            reader.readAsText(file)
        }
        setUploadError(false)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setUploadState(UploadState.Empty)
        setCalendarItems([])
        setCalendarFilename("")
    };

    const handleCloseSuccessAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };

    return (
        <div>
            <Button onClick={openPanel} variant="outlined">{formTitle}</Button>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={"Update"}
                onSubmit={submit}
                dismissPanel={dismissPanel}
            >
            <ul>
            {props.calendars.map((c:any)=> {
                return (
                    <li>{c.name}</li>
                    )
            })}
            </ul>
            </DrawerForm>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success">
                    Calendar successfully imported
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ManageCalendarsForm;
