import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import {
    DefaultButton,
    PrimaryButton,
    Panel,
    PanelType,
    TextField,
} from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { useBoolean, useConst } from '@uifabric/react-hooks';

initializeIcons();

const AddCalendarForm: FunctionComponent<any> = props => {
    const { } = props;
    const formTitle = "Import Calendar";
    //Hooks
    const [isOpen, setIsOpen] = useState(false);
    const [showSync, setShowSync] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarUrl, setCalendarUrl] = useState("");
    const [showMessageBar, { toggle: toggleShowMessageBar }] = useBoolean(false);



    const buttonStyles = { root: { marginRight: 8 } };
    const checkboxStyle: ICheckboxStyles = {
        root: {
            marginTop: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '10px'
        },
        checkmark: {
        }
    };

    const buttonStyle = {
        outline: "transparent none medium"
    }

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => {
        setIsOpen(false);
        setCalendarTitle("");
        setCalendarUrl("");
        setIsChecked(true)
    });

    const submit = () => {
        getIcsFile();
        setIsOpen(false);
        setIsChecked(true);
        setCalendarTitle("");
        setCalendarUrl("");
    }

    const getIcsFile = () => {
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

    const onRenderFooterContent = () => (
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            <DefaultButton
                onClick={dismissPanel}
                styles={buttonStyles}
                text={"Cancel"}
            />
            <PrimaryButton
                onClick={submit}
                styles={buttonStyles}
                text={"Import Calendar"}
            />
        </div>
    );

    const commandBarItems = useConst(() => [
        {
            key: 'commandBarItem1',
            text: 'Sync from URL',
            iconProps: {
                iconName: 'Sync',
            },
            onClick: () => { setShowSync(true) },
            keytipProps: keytipMap.CommandButton1Keytip,
        },
        {
            key: 'commandBarItem2',
            text: 'Upload ical File',
            iconProps: {
                iconName: 'Upload',
            },
            onClick: () => { setShowSync(false) },
            keytipProps: keytipMap.CommandButton2Keytip,
        },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            var reader = new FileReader();
        var output
            reader.onload = function () {
                //ical format (string)
                //console.log(reader.result);

                //parse
                const ical = require('ical');
                const data = ical.parseICS(reader.result)

                //parser format
                //console.log(data)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                output = "IMPORTED CALENDAR ITEMS:\n\n"
                for (let k in data) {
                    if (data.hasOwnProperty(k)) {
                        var ev = data[k];
                        if (data[k].type === 'VEVENT') {
                            output = output+`SUMMARY: ${ev.summary} (LOCATION: ${ev.location}) - DATE: ${weekDays[ev.start.getDay()]}, ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}\n`;
                        }
                    }
                }
                alert(output)
            };
            var file = e.target.files[0]
            reader.readAsText(file)
            
            
        }
    }

    return (
        <div>
            <DefaultButton text={formTitle} onClick={openPanel} />
            <Panel
                isLightDismiss
                isOpen={isOpen}
                onDismiss={dismissPanel}
                type={PanelType.customNear}
                customWidth={"40%"}
                closeButtonAriaLabel="Close"
                headerText={formTitle}
                isFooterAtBottom={true}
                onRenderFooterContent={onRenderFooterContent}
            >
                
                {showMessageBar && <MessageBar messageBarType={MessageBarType.success}>Success Uploading</MessageBar>}
                <TextField
                    label="Title "
                    required
                    placeholder="Enter a title"
                    defaultValue={calendarTitle}
                    onChange={(_, value) => { setCalendarTitle(String(value)) }}
                />
                <div style={{marginTop:"10px"}}><CommandBar items={commandBarItems} /></div>
                {showSync && <div>
                    <TextField
                        label="Calendar URL "
                        required
                        placeholder="Enter an URL"
                        defaultValue={calendarUrl}
                        onChange={(_, value) => { setCalendarUrl(String(value)) }}
                    />
                    <Checkbox
                        styles={checkboxStyle}
                        label="Calendar is public"
                        checked={isChecked}
                        onChange={(_, value) => setIsChecked(Boolean(value))}
                    />
                </div>
                }
                {!showSync &&
                    <div>
                        <Label required>Browse</Label>
                        <div>
                            <input
                                accept=".ics"
                                multiple
                                type="file"
                                onChange={(e) => handleChange(e)}
                            />
                            {/* <DefaultButton text="Choose File" /> */}
                            {/* 
                            https://github.com/microsoft/fluentui/issues/4733
                            
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{ display: "none" }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Choose File
                                </Button>
                            </label> */}
                        </div>
                    </div>
                }
            </Panel>
        </div>
    );
};

export default AddCalendarForm;