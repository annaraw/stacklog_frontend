import React from 'react';
import {
    DefaultButton,
} from 'office-ui-fabric-react';
import BacklogItemService from '../services/BacklogItemService';

interface NotFoundProps {
    title: string
}

function NotFound(props: NotFoundProps) {
    return (
        <React.Fragment>
            <img src="./assets/logo_black.png" alt="Stacklog Logo"></img>
            <h1>Sorry, the page you're looking for isn’t here anymore</h1>
            <p>If you reached this page from another part of stacklog.com, please let us know so we can correct our mistake.</p>
            <p>go to <a href="/">Home</a></p>

            <DefaultButton text="Get backlogItems" onClick={() => {
                BacklogItemService.getBacklogItems().then(data =>
                    console.log(data)
                )
            }} />
        </React.Fragment>

    )
}

export default NotFound;