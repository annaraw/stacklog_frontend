import React from 'react';
import MenuBar from '../components/MenuBar';
import UserService from '../services/UserService';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {

    return (
        <React.Fragment>
            <MenuBar title="Home" />
            {(UserService.isAuthenticated()) ?
                <p>Logged in</p> : <p>Logged out</p>
            }
        </React.Fragment>
    )
}

export default HomeScreen;