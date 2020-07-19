import React from 'react';
import UserService from '../services/UserService';
import Planner from './Planner/Planner';
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