import React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Button, IconButton, Tooltip } from'@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Grid,  Paper, Drawer, List, ListItem, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BacklogSingleTaskItem } from '../../models/models';
import UserService from '../../services/UserService';
import TaskCreationFormStyles  from './TaskCreationFormStyles';
import { DummyTaskData } from '../../data/DummyData';


const AddBacklogItemForm: FunctionComponent < {tasks: BacklogSingleTaskItem[]; setTasks: (tasks: BacklogSingleTaskItem[]) => void } > = props => {


    const {tasks, setTasks} = props
    const formTitle = "Create to-do"
    const classes = TaskCreationFormStyles()


    const [isOpen, setIsOpen] = useState (false)
    const [error, setError] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState ("")
    const [dueDate, setDueDate] = useState (new Date())
    const [priority, setPriority] = useState ("")
    const [reminder, setReminder] = useState (Number)
    const [estimatedMIN, setEstimatedMIN] = useState (Number)
    const [description, setDescription] = useState("")
    const [completed, setCompleted] = useState(false)




    const openDrawer = (() => setIsOpen (true))
    const dismissDrawer = (() => setIsOpen (false))

    const showCategories =  DummyTaskData.map (taskData => {
        return(
            {categoryName: taskData.category!}
        )
    })


    const handleChange = ((date: Date) => setDueDate(date))
    
    const submit = (): void => {
        if (!checkInput()) {
            setError(true)
            return
        }
        const newTask : BacklogSingleTaskItem = {

            author: UserService.getCurrentUser().id,
            assignee: UserService.getCurrentUser().id,
            title : title,
            category : category,
            dueDate : dueDate,
            priority: priority,
            reminder: reminder,
            estimation: estimatedMIN,
            description: description,
            completed: completed,
        }
        tasks.push(newTask)
        setTasks(tasks)

        setError(false)
        setTitle ("")
        setCategory ("")
        setDueDate (new Date)
        setPriority ("")
        setReminder (Number) // kann ich das so machen?
        setDescription ("")
        setCompleted (false)
    }

    const checkInput = (): boolean => {
        if(!title ) {
            return false
        }
        return true
    }

    return (
        <div>
            <Button onClick = {openDrawer} variant = "contained">{formTitle}</Button>
            <Drawer
                anchor = "left"
                open = {isOpen} 
                variant = "permanent"
                className ={classes.drawer}
                >
                <Box className= {classes.box}>
                    <div className={classes.drawerHeading}>
                        <p><strong>{formTitle}</strong></p>
                            <Tooltip title="Close">
                                <IconButton
                                    aria-label="close"
                                    className={classes.closeButton}
                                    onClick={dismissDrawer}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                    </div>

                    <TextField
                        required
                        id = 'todo-title'
                        fullWidth
                        label = "Title"
                        placeholder = "Enter the to-do title"
                        //onChange = {(event) => setTitle (String (event.target.value))}
                        variant="outlined"
                    />
                  
                    <Autocomplete
                        id = "category-combo-box"
                        fullWidth
                        options={showCategories}
                        getOptionLabel = {option => option.categoryName }
                        //style = {styles}
                        renderInput={(params) => <TextField {...params} label="Enter or choose a category" variant="outlined" />}
                    />
                    

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker

                            variant="inline"
                            inputVariant="outlined"
                            label="With keyboard"
                            format="dd/MM/yyyy"
                            value={dueDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => handleChange(dueDate)}
                        />
                    </MuiPickersUtilsProvider>
                   
                    <Autocomplete
                        id = "priority-combobox"
                        fullWidth
                        options={["low", "medium", "high"]}
                        getOptionLabel = {(option) => option }
                        // style = {styles}
                        renderInput={(params) => <TextField {...params} label="Enter or choose a priority" variant="outlined" />}
                    />
                  
                    <Autocomplete
                        id = "reminder-combobox"
                        fullWidth
                        options={["10 minutes before", "30 min minutes before", "1 hours minutes before", "2 hours minutes before"]}
                        getOptionLabel = {(option) => option }
                        renderInput={(params) => <TextField {...params} label="Choose when you want to be reminded" variant="outlined" />}
                    />
                   

                    
                    <div> Estimated Time </div>
                    <Grid container >
                        <Grid item md = {4}>
                            <Grid container alignItems = "center">
                                <Grid container item>
                                    <TextField
                                        id = 'hours-box'
                                        placeholder = "0"
                                        variant="outlined"
                                        //onChange = {(event) => setTitle (String (event.target.value))}
                                        inputProps = {{style: { textAlign: "right" }}}
                                    />

                                </Grid>
                                <Grid container item>
                                    hours
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md= {4}>
                            <Grid container  alignItems = "center">
                                <Grid item>
                                    <TextField
                                        id = 'hours-box'
                                        placeholder = "0"
                                        variant="outlined"
                                        //onChange = {(event) => setTitle (String (event.target.value))}
                                        inputProps = {{style: { textAlign: "right" }}}
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
                        label = "Description"
                        placeholder ="Enter an optional to-do description"
                        fullWidth
                        multiline
                        rows={4}

                        variant="outlined"
                    />

                </Box>

            </Drawer>
        </div>
    );
}

export default AddBacklogItemForm;