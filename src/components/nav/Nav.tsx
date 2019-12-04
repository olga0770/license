import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, MenuItem, Divider, makeStyles} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const Nav = () => {
    const classes = useStyles();

    const [isAuthenticated, setAuth] = useState(true);

    const logout = () => {
        sessionStorage.removeItem("jwt");
        setAuth(false);
    };

    if (isAuthenticated === false) {
        return (<Redirect to={"/login"}/>);
    }


    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit">License System</Typography>
                <Divider orientation="vertical" style={{marginLeft: 30, marginRight: 15}}/>

                    <MenuItem>
                        <Link to="/dashboard" style={{color: 'Grey'}}>Dashboard</Link>
                    </MenuItem>
                    < MenuItem >
                        < Link to="/partners" style={{color: 'Grey'}}>Partners</Link>
                    </MenuItem>
                    <MenuItem className={classes.title}>
                        <Link to="/users" style={{color: 'Grey'}}>Users</Link>
                    </MenuItem>

                    <MenuItem onClick={logout}>< Link to="/login" style={{color: 'Grey'}}>Logout</Link></MenuItem>
            </Toolbar>
        </AppBar>
)
};

export default Nav;
