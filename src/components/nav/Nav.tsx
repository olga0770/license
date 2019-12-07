import React, {useEffect, useState} from 'react';
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


const Nav = props => {
    const classes = useStyles();

    // const [user, setUser] = useState({username: '', password: ''});


    // useEffect(() => {
    //     setUser({
    //         username: props.user.username,
    //         password: props.user.password
    //     });
    // }, []);



    const [isAuthenticated, setAuth] = useState(true);

    console.log("authenticated user isAuthenticated: ", isAuthenticated);

    console.log("authenticated user nav: ", props);




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


                        <Link to="/dashboard" style={{color: 'Grey', padding: 15}}>Dashboard</Link>


                        < Link to="/partners" style={{color: 'Grey', padding: 15}}>Partners</Link>


                        <Link to="/users" style={{color: 'Grey', padding: 15}}>Users</Link>


                    < Link to="/login" style={{color: 'Grey', padding: 15, position: "absolute", right: 10}} onClick={logout}>Logout</Link>


            </Toolbar>
        </AppBar>
)
};

export default Nav;
