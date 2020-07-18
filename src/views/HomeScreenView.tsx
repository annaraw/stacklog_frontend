import React from 'react';
import MenuBar from '../components/MenuBar/MenuBar';
import AddCalendarForm from '../components/CalendarForm/AddCalendarForm';
import UserService from '../services/UserService';
import Planner from '../components/Planner/Planner';
import LandingPage from './LandingPage/LandingPage';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {

    return (
        <React.Fragment>
            {UserService.getCurrentUser().id !== undefined ? 
            <div style={{ padding: "20px" }}><Planner /></div>
            : <LandingPage />}
        </React.Fragment>
    )
}

export default HomeScreen;