import React from 'react';
interface NotFoundProps {
    title: string
}

function NotFound(props: NotFoundProps) {
    return (
        <React.Fragment>
            <img src="./assets/logo_black.png" alt="Stacklog Logo" onClick={() => window.location.href = "/"}></img>
            <h1>Sorry, the page you're looking for isn’t here anymore</h1>
            <p>If you reached this page from another part of stacklog.com, please let us know so we can correct our mistake.</p>
        </React.Fragment>

    )
}

export default NotFound;