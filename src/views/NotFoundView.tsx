import React from 'react';
interface NotFoundProps {
    title: string
}

function NotFound(props: NotFoundProps) {
    return (
        <React.Fragment>
            <h1>404 Sorry Site not found</h1>
            <p>go to <a href="/">Home</a></p>
        </React.Fragment>

    )
}

export default NotFound;