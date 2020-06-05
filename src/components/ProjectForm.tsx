import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import {
    DefaultButton,
    PrimaryButton,
    Panel,
    PanelType,
    TextField,
    FontIcon,
    IComboBoxOption,
    ComboBox,
} from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { Project } from '../models/models';
import { PersonaComponent } from './persona';
import { personsDummy } from '../data/dummyData';

initializeIcons();
/**
 * Project Form
 * Input Fields for Project Creation
 * 
 */
const InputForm: FunctionComponent<{ projects: Project[]; setProjects: (projects: Project[]) => void }> = props => {
    const { projects, setProjects } = props;
    const formTitle = "Create Project";

    //Hooks
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [member, setMember] = useState("");
    const [team, setTeam] = useState([personsDummy[0], personsDummy[1], personsDummy[2]]);

    const buttonStyles = { root: { marginRight: 8 } };

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => setIsOpen(false));
    const submit = () => {
        const newProject: Project = {
            title: title,
            description: description,
            team: team,
            id: Math.random().toString(),
            backlogItems: 0,
            progress: 0,
        }
        projects.push(newProject);
        setProjects(projects)
        setIsOpen(false);
        //reset input
        setTitle("");
        setDescription("");
        setMember("");
        setTeam([]);
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
                text={"Create"}
            />
        </div>
    );

    const comboBoxBasicOptions: IComboBoxOption[] = personsDummy.map(person => {
        return(
            {key: person.id, text: person.name + " " + person.lastName}
        )
    })

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
                onRenderFooterContent={onRenderFooterContent}
                isFooterAtBottom={true}
            >
                <TextField
                    label="Title "
                    required
                    placeholder="Set a title"
                    defaultValue={title}
                    onChange={(event, value) => setTitle(String(value))}
                />
                <TextField
                    label="Description "
                    required
                    placeholder="Set a description"
                    defaultValue={description}
                    multiline rows={7}
                    onChange={(event, value) => setDescription(String(value))}
                />
                <div style={{ display: "grid", gridAutoFlow: "column", position: "relative" }}>
                    {/* <TextField
                        label="Team"
                        placeholder="Add Team members"
                    /> */}
                    <ComboBox
                        placeholder="Add Team member"
                        label="Team"
                        allowFreeform
                        autoComplete="on"
                        options={comboBoxBasicOptions}
                        onChange={(event,value) => (value) ? setMember(value.text): setMember("")}
                    />
                    <div
                        style={{ width: "30px" }}
                        onClick={() => {
                            const newMember = personsDummy.find(person => 
                                (person.name + " " + person.lastName) === member
                            )
                            if(newMember){
                                setTeam([...team, newMember])
                            }
                            
                        }}
                    >
                        <FontIcon
                            iconName="CirclePlus"
                            style={{
                                fontSize: 30,
                                height: 30,
                                width: 30,
                                bottom: 0,
                                position: "absolute"
                            }}
                        />
                    </div>

                </div>
                {team.map(member => {
                    return (
                        <PersonaComponent person={member} />
                    )
                })}

            </Panel>
        </div>
    );
};

export default InputForm;