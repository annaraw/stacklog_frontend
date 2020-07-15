import React from 'react';
import MenuBar from '../components/MenuBar/MenuBar';
import AddCalendarForm from '../components/CalendarForm/AddCalendarForm';
import UserService from '../services/UserService';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {

    return (
        <React.Fragment>
            <MenuBar title="Home" />
            <div style={{ padding: "20px" }}><AddCalendarForm /></div>
            {(UserService.isAuthenticated()) ?
                <p>Logged in</p> : <p>Logged out</p>
            }
        </React.Fragment>
    )
}

export default HomeScreen;