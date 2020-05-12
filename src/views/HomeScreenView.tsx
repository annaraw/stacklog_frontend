import React from 'react';
import MenuBar from '../components/MenuBar';


interface HomeScreenProps {
}

function HomeScreen(props: HomeScreenProps) {
    
    return (
        <React.Fragment>
            <MenuBar title="Home" />
        </React.Fragment>
    )
}

export default HomeScreen;