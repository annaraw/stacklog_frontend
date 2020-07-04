import React from 'react';
import MenuBar from '../components/MenuBar';
import AddCalendarForm from '../components/CalendarForm/AddCalendarForm';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {
    
    return (
        <React.Fragment>
            <MenuBar title="Home" />
            <div style={{padding: "20px"}}><AddCalendarForm /></div>
        </React.Fragment>
    )
}

export default HomeScreen;