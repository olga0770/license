import React from 'react';
import {makeStyles, Grid, Paper, IconButton, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Nav from "../nav/Nav";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Nav/>

            <Grid container spacing={3} style={{padding: 30}}>

                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Paper className={classes.paper}>
                        <Link to="/partners">
                            <IconButton>
                                <PeopleOutlineIcon style={{ fontSize: 100, color: "silver" }}/>
                            </IconButton>
                        </Link>
                        <Typography variant="h6" style={{ color: "silver" }}>PARTNERS</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Paper className={classes.paper}>
                        <Link to="/users">
                            <IconButton>
                                <PermIdentityIcon style={{ fontSize: 100, color: "silver" }}/>
                            </IconButton>
                        </Link>
                        <Typography variant="h6" style={{ color: "silver" }}>USERS</Typography>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
};

export default Dashboard;
