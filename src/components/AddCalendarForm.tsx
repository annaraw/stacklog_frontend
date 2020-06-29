import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RadioGroup, FormControl, FormControlLabel, Radio, TextField, Checkbox, Drawer, IconButton, Box } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { CalendarItem, Calendar } from '../models/models'
import CalendarImportService from '../services/CalendarImportService'
import CloseIcon from '@material-ui/icons/Close';

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
    const [showSync, setShowSync] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [isPublic, { toggle: toggleIsPublic }] = useBoolean(true);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarUrl, setCalendarUrl] = useState("");
    const [calendarFile, setCalendarFile] = useState<CalendarItem[] | []>([]);
    const [calendarFilename, setCalendarFilename] = useState("");
    const [uploadState, setUploadState] = useState(UploadState.Empty);

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => {
        setIsOpen(false);
        setCalendarTitle("");
        setCalendarUrl("");
        setShowFileUpload(false);
        setShowSync(false);
        
        console.log(calendarFile)
    });

    const submit = () => {
        //create calendar object and send to backend
        var cal: Calendar = {
            name: calendarTitle,
            items: calendarFile
        }
        CalendarImportService.addCalendar(cal);
        syncCalendarFile();
        setIsOpen(false);
        setCalendarTitle("");
        setCalendarUrl("");
        setShowFileUpload(false);
        setShowSync(false);
    }

    const syncCalendarFile = () => {
        //https://openbase.io/js/node-ical ics parser
        //https://stackoverflow.com/questions/54403963/http-get-request-for-ican-ics-file
        //https://github.com/mozilla-comm/ical.js/
        //https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e
        /*let url = "https://campus.tum.de/tumonlinej/ws/termin/ical?pStud=408917D318E7CE33&pToken=9ECCFD276B854295B32B4E20E1154FE1E741E10B7022E05CC5062FBA53D39F82"
        let pToken = "9ECCFD276B854295B32B4E20E1154FE1E741E10B7022E05CC5062FBA53D39F82"
        let pStud = "408917D318E7CE33"
        let header = new Headers();
        header.append('crossorigin', 'anonymous')

        fetch(url, {
            method: 'GET',
            headers: header,
            mode: 'cors'
        }).then((resp) => {
            console.log(String(resp))
            return resp;
        })*/
    }

    const uploadCalendarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            var reader = new FileReader();
            var calItems: CalendarItem[] = []
            var filename = e.target.files[0].name
            reader.onload = function () {
                //parse ical file
                const ical = require('ical');
                const data = ical.parseICS(reader.result)
                
                //convert data into CalendarItem object
                for (let k in data) {
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if (data[k].type === 'VEVENT') {
                            const calItem: CalendarItem = {
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

                //save events into state
                console.log(calItems)
                console.log(data)
                setCalendarFile(calItems)
                setCalendarFilename(filename)
                //show message if file is valid and has >0 events
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
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setUploadState(UploadState.Empty)
        setCalendarFile([])
        setCalendarFilename("")
    };

    return (
        <div>
            <Button onClick={openPanel}>{formTitle}</Button>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={dismissPanel}
                style={{ position: "relative" }}
            >
                <Box width={"800px"} style={{ padding: "20px" }}>
                    <div className="drawer-heading">
                        <p><strong>{formTitle}</strong></p>
                        <IconButton
                            aria-label="close"
                            style={{ position: "absolute", top: "20px", right: "10px" }}
                            onClick={dismissPanel}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <div style={{ margin: "10px" }}><TextField id="outlined-basic" label="Calendar Title" variant="outlined" required fullWidth value={calendarTitle} onChange={(e) => { setCalendarTitle(e.target.value) }} /></div>
                    <div style={{ margin: "10px" }}>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" onChange={uploadCalendarFile}>
                                <FormControlLabel value="female" control={<Radio color="default" disabled />} label="Sync from URL" onChange={(e) => { setShowSync(true); setShowFileUpload(false) }} />
                                <FormControlLabel value="male" control={<Radio color="default" />} label="Upload ical File" defaultChecked={true} onChange={(e) => { setShowSync(false); setShowFileUpload(true) }} />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {showSync && <div style={{ margin: "10px", border: "1px solid #C0C0C0", padding: "10px", borderRadius: "5px" }}>
                        <TextField id="outlined-basic" label="Calendar URL" variant="outlined" required fullWidth value={calendarUrl} onChange={(e) => { setCalendarUrl(e.target.value) }} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPublic}
                                    onChange={toggleIsPublic}
                                    name="public"
                                    color="default"
                                />
                            }
                            label="Calendar is public"
                        />
                    </div>
                    }
                    {showFileUpload &&
                        <div style={{ margin: "10px", border: "1px solid #C0C0C0", padding: "10px", borderRadius: "5px" }}>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <div style={{ margin: "10px", float: "left" }}>
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
                                            style={{ fontWeight: "bold", height: "48.0167px" }}
                                            disableElevation
                                        >
                                            Select File
                                        </Button>
                                    </label>
                                </div>
                                <div style={{ margin: "10px", width: "auto", overflow: "hidden" }}>
                                    {
                                        (uploadState === UploadState.Success) &&
                                        <Alert severity="success" onClose={handleClose} elevation={0}>
                                            <span style={{ fontWeight: "bold" }}>{calendarFilename}</span> ({calendarFile.length} items) selected.
                                        </Alert>
                                    }
                                    {
                                        (uploadState === UploadState.Fail) &&
                                        <Alert severity="warning" onClose={handleClose} elevation={0}>
                                            <span style={{ fontWeight: "bold" }}>{calendarFilename}</span> selected. The file does not contain any events.
                                        </Alert>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div
                        className="drawer-footer"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: "20px"
                        }}
                    >
                        <Button
                            variant="contained"
                            style={{
                                //backgroundColor: Colors.secondaryColor,
                                margin: "5px"
                            }}
                            onClick={dismissPanel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                //backgroundColor: Colors.primaryColor,
                                margin: "5px"
                            }}
                            onClick={submit}
                        >
                            Create
                        </Button>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};

export default AddCalendarForm;