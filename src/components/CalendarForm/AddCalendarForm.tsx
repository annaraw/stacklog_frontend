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

const AddCalendarForm: FunctionComponent<any> = props => {
    const formTitle = "Import Calendar";
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
                window.location.reload()
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
            <div className={classes.button} onClick={openPanel} >{formTitle}</div>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={"Import"}
                onSubmit={submit}
                dismissPanel={dismissPanel}
            >
                <TextField
                    id="outlined-basic"
                    label="Calendar Title"
                    variant="outlined"
                    required
                    fullWidth
                    value={calendarTitle}
                    onChange={(e) => { setCalendarTitle(e.target.value); setUploadError(false) }}
                    error={uploadError && !calendarTitle}
                />
                <FormControl component="fieldset">
                    <RadioGroup onChange={uploadCalendarFile}>
                        <FormControlLabel
                            value="url"
                            control={<Radio color="default" />}
                            label="Sync from URL"
                            onChange={(e) => { setShowSync(true); setShowFileUpload(false); setCalendarItems([]); setUploadState(UploadState.Empty); setCalendarFilename("") }}
                        />
                        <FormControlLabel
                            value="upload"
                            control={<Radio color="default" />}
                            label="Upload ical File"
                            defaultChecked={true}
                            onChange={(e) => { setShowSync(false); setShowFileUpload(true); setCalendarItems([]); setUploadState(UploadState.Empty); setCalendarFilename("") }}
                        />
                    </RadioGroup>
                </FormControl>

                {showSync &&
                    <div className={classes.borderBox}>
                        <div className={classes.text}>Please insert an URL and check if it contains a valid ical format:</div>
                        <TextField
                            id="outlined-basic"
                            label="Calendar URL"
                            variant="outlined"
                            required
                            fullWidth
                            value={calendarUrl}
                            onChange={(e) => { setCalendarUrl(e.target.value) }}
                            className={classes.textField}
                            error={uploadError && !calendarUrl}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<GetAppIcon />}
                            className={classes.button}
                            disableElevation
                            onClick={fetchCalendarFile}
                        >
                            Check File
                        </Button>
                        {
                            (uploadState === UploadState.Success) &&
                            <Alert severity="success" onClose={handleClose} elevation={0}>
                                ({calendarItems.length} items) selected.
                            </Alert>
                        }
                        {
                            (uploadState === UploadState.Fail) &&
                            <Alert severity="warning" onClose={handleClose} elevation={0}>
                                The file does not contain any events or the URL does not provide an ICS calendar file.
                            </Alert>
                        }
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPublic}
                                    onChange={toggleIsPublic}
                                    name="public"
                                    color="default"
                                    disabled
                                />
                            }
                            label="Calendar is public"
                        />
                    </div>
                }
                {showFileUpload &&
                    <div className={classes.borderBox}>
                        <div className={classes.text}>Please select an .ics calendar file from your computer:</div>
                        <input
                            id="contained-button-file"
                            accept=".ics"
                            type="file"
                            onChange={(e) => uploadCalendarFile(e)}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                color="default"
                                startIcon={<CloudUploadIcon />}
                                className={classes.button}
                                disableElevation
                            >
                                Select File
                                </Button>
                        </label>
                        {
                            (uploadState === UploadState.Success) &&
                            <Alert severity="success" onClose={handleClose} elevation={0}>
                                <strong>{calendarFilename}</strong> ({calendarItems.length} calendar items) selected.
                                </Alert>
                        }
                        {
                            (uploadState === UploadState.Fail) &&
                            <Alert severity="warning" onClose={handleClose} elevation={0}>
                                <strong>{calendarFilename}</strong> selected. The file does not contain any events.
                                </Alert>
                        }
                    </div>
                }
                {(uploadError ?
                    <Alert
                        severity="error"
                        onClose={() => setUploadError(false)}
                    >
                        <strong>Error: Could not upload calendar.</strong>

                        {calendarTitle === "" && <li>"Missing calendar title"</li>}
                        {((uploadState === (UploadState.Empty)) || (uploadState === (UploadState.Fail))) && <li>"Missing/empty calendar"</li>}
                    </Alert>
                    : <span></span>
                )}
            </DrawerForm>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success">
                    Calendar successfully imported
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddCalendarForm;