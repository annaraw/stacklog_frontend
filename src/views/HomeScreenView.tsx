import React from 'react';
import MenuBar from '../components/MenuBar/MenuBar';
import AddCalendarForm from '../components/CalendarForm/AddCalendarForm';
import UserService from '../services/UserService';
import Planner from '../components/Planner/Planner';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {

    return (
        <React.Fragment>
            <MenuBar title="Home" />
            <div style={{ padding: "20px" }}><Planner /></div>
        </React.Fragment>
    )
}

export default HomeScreen;