import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Divider} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";


const Nav = props => {

    const [value, setValue] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        localStorage.setItem('username', value);
        setValue(value);
    }, [value]);

    const [isAuthenticated, setAuth] = useState(true);

    const logout = () => {
        sessionStorage.removeItem('jwt');
        setAuth(false);
        localStorage.removeItem('username');
        setValue('')
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
                <Link to="/partners" style={{color: 'Grey', padding: 15}}>Partners</Link>
                <Link to="/users" style={{color: 'Grey', padding: 15}}>Users</Link>

                <div style={{padding: 15, position: "absolute", right: 10, textAlign: "right"}}>
                    <Typography>Welcome {value}!</Typography>
                    <Link to="/login" onClick={logout} style={{color: 'Grey'}}>Logout</Link>
                </div>



            </Toolbar>
        </AppBar>
    )
};

export default Nav;
