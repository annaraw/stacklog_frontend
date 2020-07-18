import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
interface NotFoundProps {
    title: string
}

function NotFound(props: NotFoundProps) {
    return (
        <React.Fragment>
            <div style={{
                background: "url('./assets/login_page.png')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                height: "calc(100vh - 64px)"
            }}>
                <div style={{ margin: "auto", height: "max-content", width: "700px", marginBottom: "500px" }}>
                    <div style={{ background: "url(./assets/logo_black.png) no-repeat center center", height: "200px", width: "auto" }}></div>
                    <Card >
                        <CardContent style={{ padding: "30px" }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                <h3>Sorry, the page you're looking for isn’t here anymore</h3>
                                <p>If you reached this page from another part of stacklog.com, please let us know so we can correct our mistake.</p>
                                <br />
                                <p>Your Stacklog-Team</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </React.Fragment>

    )
}

export default NotFound;