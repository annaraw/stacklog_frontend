import React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Snackbar, Button } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Grid } from '@material-ui/core';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IBacklogItem, IBacklogItemRequest, Project, IBacklogItemUpdateProps } from '../../models/models';
import UserService from '../../services/UserService';
import TaskCreationFormStyles from './BacklogItemFormStyles';
import DrawerForm from '../Form/DrawerForm';
import BacklogItemService from '../../services/BacklogItemService';
import DialogForm from '../Form/Dialog';

const filter = createFilterOptions<CategoryOption>();

interface CategoryOption {
    inputValue?: string;
    category: string;
}

interface AssigneeOption {
    inputValue?: string;
    id: string;
}

interface BacklogItemFormProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    formTitle: string
    items: IBacklogItem[]
    setBacklogItems: (backlogItem: IBacklogItem[], update?: boolean) => void
    formType: string
    item?: IBacklogItem
    project?: Project
    selfAssigned?: boolean
}

const BacklogItemForm: FunctionComponent<BacklogItemFormProps> = props => {
    const { isOpen, setIsOpen, formTitle, items,
        setBacklogItems, formType, item, project, selfAssigned } = props

    const classes = TaskCreationFormStyles()

    const [title, setTitle] = useState(item ? item.title : "")
    const [category, setCategory] = useState<CategoryOption | null>(item?.category ?
        { category: item.category }
        : null)
    const [dueDate, setDueDate] = useState(item?.dueDate ? item.dueDate : null)
    const [priority, setPriority] = useState<string>(item?.priority ? item.priority.toString() : "medium")
    const [reminder, setReminder] = useState<number | undefined>(item?.reminder ? item.reminder : undefined)
    const [estimatedH, setEstimatedH] = useState<number>(item?.estimation ? ~~(item.estimation / 60) : 1)
    const [estimatedMIN, setEstimatedMIN] = useState<number>(item?.estimation ? item.estimation % 60 : 0)
    const [description, setDescription] = useState(item?.description ? item.description : "")

    //project stuff
    const [assignee, setAssignee] = useState<string | null>(!project || selfAssigned ? UserService.getCurrentUser().id : null)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState("")
    const [deleteError, setdeleteError] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const dismissPanel = (() => setIsOpen(false));

    // get list of all categories
    let categories: CategoryOption[] = [];
    items.forEach(item => {
        if (item.category && categories.filter(entry => entry.category === item.category).length === 0) {
            categories.push({ category: item.category })
        }
    })

    let members: AssigneeOption[] = [];
    if (project) {
        project.team.forEach(member => {
            members.push({
                inputValue: member.name + " " + member.lastName,
                id: member.id
            })
        })
    }

    const handleCloseDialog = () => {
        setdeleteError(false)
    };

    const handleDelete = () => {
        if (item) {
            BacklogItemService.removeBacklogItem(item.id).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(err => {
                setdeleteError(true)
            })
        }
    }

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
                await updateItemInDataBase()
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
            setError(true)
            setLoading(false)
            setFeedbackMessage(err)
            setShowFeedback(true)
            console.log(err)
        }
    }

    const sendItemToDataBase = async () => {
        const newBacklogItem: IBacklogItemRequest = {
            author: UserService.getCurrentUser().id,
            assignee: assignee ? assignee : "",
            title: title,
            category: category ? category.category : "",
            dueDate: dueDate,
            priority: priority,
            reminder: reminder,
            estimation: (estimatedH * 60 + estimatedMIN),
            description: description ? description : "",
            team: project ? project.id : "",
            completed: false,
        }
        let response = await BacklogItemService.addBacklogItem(newBacklogItem)

        let newTask: IBacklogItem = {
            //@ts-ignore
            id: response.item.id,
            //@ts-ignore
            author: response.item.author,
            //@ts-ignore
            assignee: response.item.assignee,
            //@ts-ignore
            title: response.item.title,
            //@ts-ignore
            description: response.item.description,
            //@ts-ignore
            priority: response.item.priority,
            //@ts-ignore
            reminder: response.item.reminder,
            //@ts-ignore
            estimation: response.item.estimation,
            //@ts-ignore
            completed: response.item.completed,
            //@ts-ignore
            startDate: response.item.startDate ? new Date(response.item.startDate) : null,
            //@ts-ignore
            dueDate: response.item.dueDate ? new Date(response.item.dueDate) : null,
            //@ts-ignore
            category: response.item.category,
            //@ts-ignore
            team: response.item.team
        }

        //@ts-ignore
        setFeedbackMessage(response.message)
        setBacklogItems([...items, newTask])
    }

    const updateItemInDataBase = async () => {
        let updateProps: IBacklogItemUpdateProps = {}
        if (!item) {
            setFeedbackMessage("No item to update")
            setShowFeedback(true)
            return
        }
        if (title !== item.title) {
            updateProps.title = title
        }
        if (description !== item.description) {
            updateProps.description = description
        }
        if (priority !== item.priority.toString()) {
            updateProps.priority = priority
        }
        if (reminder && reminder !== item.reminder) {
            updateProps.reminder = reminder
        }
        if ((estimatedH * 60 + estimatedMIN) !== item.estimation) {
            updateProps.estimation = (estimatedH * 60 + estimatedMIN)
        }
        if (dueDate !== item.dueDate && dueDate) {
            updateProps.dueDate = dueDate
        }
        if (category?.category && category.category !== item.category) {
            updateProps.category = category.category
        }
        if (assignee && assignee !== item.assignee) {
            updateProps.assignee = assignee
        }
        try {
            let response = await BacklogItemService.updateBacklogItem(item.id, updateProps)
            let updatedItems = [...items]
            const itemIndex = updatedItems.findIndex(BItem => BItem.id === item.id)
            if (itemIndex === 0 || itemIndex) {
                //@ts-ignore
                updatedItems[itemIndex] = response.item
                setBacklogItems([...updatedItems], true)
            } else {
                setFeedbackMessage("No item found to update")
                setError(true)
            }
            //@ts-ignore
            setFeedbackMessage(response.message)
        } catch (error) {
            setFeedbackMessage(error)
            setError(true)
        }
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
                    error={(!title) && error}
                    helperText={(!title && error) ? "Needs to be filled out" : ""}
                    defaultValue={title}
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
                    defaultValue={category}
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
                        defaultValue={dueDate}
                        placeholder="Select a date"
                        InputAdornmentProps={{ position: "start" }}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>

                <Autocomplete
                    className={classes.textField}
                    id="priority-combobox"
                    fullWidth
                    defaultValue={priority}
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
                                    type="number"
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
                    //error={(!description) && error}
                    //helperText={(!description && error) ? "Needs to be filled out" : ""}
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
                            disabled={selfAssigned}
                            defaultValue={selfAssigned
                                ?
                                project.team.filter(member => member.id === UserService.getCurrentUser().id)
                                    .map(member => {
                                        return {
                                            inputValue: member.name + " " + member.lastName,
                                            id: UserService.getCurrentUser().id
                                        }
                                    })[0]
                                : null
                            }
                            options={members}
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
                                return option.id;
                            }}
                            renderOption={(option) => option.inputValue}
                            onChange={(event, value) => setAssignee(value ? value.id : "")}
                            renderInput={(params) => (
                                <TextField {...params} label="Assignee" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>
                }
                {formType === "Update" &&
                    <>
                        <p><strong>Delete Item</strong></p>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => setShowDeleteDialog(true)}
                            className={classes.deleteButton}
                        >
                            Delete '{title}'
                        </Button>
                    </>
                }
            </DrawerForm>
            <DialogForm
                isOpen={showDeleteDialog}
                formTitle={`Delete '${title}'`}
                formType={"Delete"}
                onSubmit={handleDelete}
                dismissPanel={() => setShowDeleteDialog(false)}
            >
                Are you sure you want to delete the item {<b>{title}</b>}?
            </DialogForm>
            <Snackbar open={showFeedback} autoHideDuration={6000} onClose={handleCloseDialog}>
                <Alert onClose={handleClose} severity={(error) ? "error" : "success"}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Could not delete Project. Error: {feedbackMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default BacklogItemForm;