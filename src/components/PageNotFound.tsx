import React from 'react';
import {Typography, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

const PageNotFound = () => {

    return (
        <Grid container spacing={0} alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Typography variant="h3" style={{color: 'Grey', padding: 30, textAlign: "center"}}>This page is not available.</Typography>
                <Typography style={{textAlign: "center"}}><Link to="/login" style={{color: 'Grey', padding: 30}}>Go to Login Page</Link></Typography>
            </Grid>
        </Grid>
    )
};

export default PageNotFound;
