import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import {
    DefaultButton,
    PrimaryButton,
    Panel,
    PanelType,
    TextField,
} from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';

initializeIcons();

const AddCalendarForm: FunctionComponent<any> = props => {
    const { } = props;
    const formTitle = "Import Calendar";
    //Hooks
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarUrl, setCalendarUrl] = useState("");

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
                <TextField
                    label="Title "
                    required
                    placeholder="Enter a title"
                    defaultValue={calendarTitle}
                    onChange={(_, value) => { setCalendarTitle(String(value)) }}
                />
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
            </Panel>
        </div>
    );
};

export default AddCalendarForm;