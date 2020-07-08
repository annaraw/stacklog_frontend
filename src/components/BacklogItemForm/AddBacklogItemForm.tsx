import React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Button, IconButton, Tooltip, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import { Grid, Paper, Drawer, List, ListItem, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IBacklogItem, IBacklogItemRequest, Priority } from '../../models/models';
import UserService from '../../services/UserService';
import TaskCreationFormStyles from './BacklogItemFormStyles';
import DrawerForm from '../Form/DrawerForm';
import BacklogItemService from '../../services/BacklogItemService';


const AddBacklogItemForm: FunctionComponent<{
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    formTitle: string
    items: IBacklogItem[]
    setBacklogItems: (backlogItem: IBacklogItem[]) => void
    formType: string
    item?: IBacklogItem
    isProjectTask?: boolean
}> = props => {
    const { isOpen, setIsOpen, formTitle, items,
        setBacklogItems, formType, item, isProjectTask } = props

    const classes = TaskCreationFormStyles()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [dueDate, setDueDate] = useState(new Date())
    const [priority, setPriority] = useState<string>("medium")
    const [reminder, setReminder] = useState<number | undefined>(undefined)
    const [estimatedH, setEstimatedH] = useState<number>(1)
    const [estimatedMIN, setEstimatedMIN] = useState<number>(0)
    const [description, setDescription] = useState("")

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    const dismissPanel = (() => setIsOpen(false));

    const categories: string[] = [];

    items.map(item => {
        if (item.category && !categories.includes(item.category)) {
            categories.push(item.category)
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
            setCategory("")
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
            category: category,
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
                    id="category-combobox"
                    className={classes.textField}
                    defaultValue={item?.category ? item.category : category}
                    fullWidth
                    options={categories}
                    onChange={(event, value) => setCategory(value ? value : "")}
                    //style = {styles}
                    renderInput={(params) => <TextField {...params} label="Enter or choose a category" variant="outlined" />}
                />


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.textField}
                        variant="inline"
                        inputVariant="outlined"
                        label="With keyboard"
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
                                    type="number"
                                    onChange={(event) => setEstimatedH(Number(event.target.value))}
                                    inputProps={{ style: { textAlign: "right" } }}
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
                    placeholder="Enter an optional to-do description"
                    fullWidth
                    defaultValue={item?.description ? item.description : description}
                    multiline
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                />
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