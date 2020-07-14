import React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Button, IconButton, Tooltip, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Grid, Paper, Drawer, List, ListItem, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IBacklogItem, IBacklogItemRequest, Priority, Project, Member } from '../../models/models';
import UserService from '../../services/UserService';
import TaskCreationFormStyles from './BacklogItemFormStyles';
import DrawerForm from '../Form/DrawerForm';
import BacklogItemService from '../../services/BacklogItemService';

const filter = createFilterOptions<CategoryOption>();

interface CategoryOption {
    inputValue?: string;
    category: string;
}

interface BacklogItemFormProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    formTitle: string
    items: IBacklogItem[]
    setBacklogItems: (backlogItem: IBacklogItem[]) => void
    formType: string
    item?: IBacklogItem
    project?: Project
}

const AddBacklogItemForm: FunctionComponent<BacklogItemFormProps> = props => {
    const { isOpen, setIsOpen, formTitle, items,
        setBacklogItems, formType, item, project } = props

    const classes = TaskCreationFormStyles()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState<CategoryOption | null>(null)
    const [dueDate, setDueDate] = useState(new Date())
    const [priority, setPriority] = useState<string>("medium")
    const [reminder, setReminder] = useState<number | undefined>(undefined)
    const [estimatedH, setEstimatedH] = useState<number>(1)
    const [estimatedMIN, setEstimatedMIN] = useState<number>(0)
    const [description, setDescription] = useState("")

    //project stuff
    const [assignee, setAssignee] = useState<Member | null>(null)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    const dismissPanel = (() => setIsOpen(false));

    // get list of all categories
    const categories: CategoryOption[] = [];
    items.map(item => {
        if (item.category && categories.filter(entry => entry.category === item.category).length === 0) {
            categories.push({ category: item.category })
        }
    })

    const submit = async (): Promise<void> => {
        if (!checkInput()) {
            setError(true)
            return
        }
        setLoading(true)
        try {
            if (formType === "Create") {
                await sendItemToDataBase()
            } else if (formType === "Update") {
                //await updateItemInDataBase()
            } else {
                setFeedbackMessage("Fatal error")
                setShowFeedback(true)
            }

            setLoading(false)
            setShowFeedback(true)

            //reset input
            setTitle("");
            setDescription("");
            setCategory(null)
            setPriority("medium")
            setDueDate(new Date())
            setReminder(undefined)
            setEstimatedH(1)
            setEstimatedMIN(0)
            setError(false)
            setIsOpen(false);
        } catch (err) {
            setLoading(false)
            setFeedbackMessage(err)
            setShowFeedback(true)
            console.log(err)
        }
    }

    /* const submit = (): void => {
        if (!checkInput()) {
            setError(true)
            return
        }
        const newTask: BacklogSingleTaskItem = {

            author: UserService.getCurrentUser().id,
            assignee: UserService.getCurrentUser().id,
            title: title,
            category: category,
            dueDate: dueDate,
            priority: priority,
            reminder: reminder,
            estimation: estimatedMIN,
            description: description,
            completed: completed,
        }
        tasks.push(newTask)
        setTasks(tasks)

        setError(false)
        setTitle("")
        setCategory("")
        setDueDate(new Date)
        setPriority("")
        setReminder(Number) // kann ich das so machen?
        setDescription("")
        setCompleted(false)
    } */

    const sendItemToDataBase = async () => {
        const newBacklogItem: IBacklogItemRequest = {
            author: UserService.getCurrentUser().id,
            assignee: UserService.getCurrentUser().id,
            title: title,
            category: category ? category.category : "",
            dueDate: dueDate,
            priority: priority,
            reminder: reminder,
            estimation: (estimatedH * 60 + estimatedMIN),
            description: description,
            completed: false,
        }
        let response = await BacklogItemService.addBacklogItem(newBacklogItem)
        //@ts-ignore
        setFeedbackMessage(response.message)
        console.log(response)
        //@ts-ignore
        setBacklogItems([...items, response.item])
    }

    const checkInput = (): boolean => {
        if (!title) {
            return false
        }
        return true
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setDueDate(date)
        }
    }

    const setReminderTime = (event: any, value: string | null) => {
        if (value) {
            if (value === reminderOptions[0]) {
                setReminder(10)
            } else if (value === reminderOptions[1]) {
                setReminder(30)
            } else if (value === reminderOptions[2]) {
                setReminder(60)
            } else if (value === reminderOptions[3]) {
                setReminder(120)
            }
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowFeedback(false);
    };

    const reminderOptions = [
        "10 minutes before",
        "30 min minutes before",
        "1 hours minutes before",
        "2 hours minutes before"
    ]

    return (
        <>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={item ? "Update" : "Create"}
                onSubmit={submit}
                dismissPanel={dismissPanel}
            >

                <TextField
                    required
                    className={classes.textField}
                    id='task-title'
                    fullWidth
                    label="Title"
                    defaultValue={item?.title ? item.title : title}
                    placeholder="Enter the task title"
                    onChange={(event) => setTitle(event.target.value)}
                    variant="outlined"
                />

                <Autocomplete
                    renderInput={(params) => <TextField {...params} label="Enter or choose a category" variant="outlined" />}
                    fullWidth
                    id="category-combobox"
                    className={classes.textField}
                    value={category}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setCategory({
                                category: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setCategory({
                                category: newValue.inputValue,
                            });
                        } else {
                            setCategory(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                category: `Add "${params.inputValue}"`,
                            });
                        }
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={categories}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.category;
                    }}
                    renderOption={(option) => option.category}
                    freeSolo
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.textField}
                        variant="inline"
                        inputVariant="outlined"
                        label="Due Date"
                        format="dd/MM/yyyy"
                        value={dueDate}
                        defaultValue={item?.dueDate ? item.dueDate : dueDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>

                <Autocomplete
                    className={classes.textField}
                    id="priority-combobox"
                    fullWidth
                    defaultValue={item?.priority ? Priority[item.priority] : priority}
                    options={["low", "medium", "high"]}
                    onChange={(event, value) => setPriority(value ? value : "")}
                    // style = {styles}
                    renderInput={(params) => <TextField {...params} label="Enter or choose a priority" variant="outlined" />}
                />

                <Autocomplete
                    className={classes.textField}
                    id="reminder-combobox"
                    fullWidth
                    options={reminderOptions}
                    onChange={setReminderTime}
                    renderInput={(params) => <TextField {...params} label="Choose when you want to be reminded" variant="outlined" />}
                />

                <div> Estimated Time </div>
                <Grid container className={classes.textField}>
                    <Grid item md={4}>
                        <Grid container alignItems="center">
                            <Grid container item>
                                <TextField
                                    id='hours-box'
                                    placeholder="0"
                                    variant="outlined"
                                    onChange={(event) => setEstimatedH(Number(event.target.value))}
                                    inputProps={{ style: { textAlign: "right" } }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />

                            </Grid>
                            <Grid container item>
                                hours
                                </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={4}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <TextField
                                    id='hours-box'
                                    placeholder="0"
                                    variant="outlined"
                                    type="number"
                                    onChange={(event) => setEstimatedMIN(Number(event.target.value))}
                                    inputProps={{ style: { textAlign: "right" } }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </Grid>
                            <Grid item>
                                minutes
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <TextField
                    id="description-box"
                    className={classes.textField}
                    label="Description"
                    placeholder="Enter a description..."
                    fullWidth
                    defaultValue={item?.description ? item.description : description}
                    multiline
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                />

                {project &&
                    <div>
                        <p><strong>Project Settings</strong></p>
                        <Autocomplete
                            id="assignee"
                            options={project.team.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField {...params} label="Assignee" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>
                }
            </DrawerForm>
            <Snackbar open={showFeedback} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={(error) ? "error" : "success"}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddBacklogItemForm;