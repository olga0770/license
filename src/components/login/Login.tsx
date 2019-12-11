import React, { useState } from 'react';
import {
    CardContent,
    Card,
    Grid,
    FormControl, Fab, InputAdornment
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SERVER_URL} from "../constants";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {Redirect} from "react-router-dom";


const Login = props => {
    const [user, setUser] = useState({username: '', password: ''});
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    };

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                    console.log("authenticated user: ", user, "username: ", user.username);
                    localStorage.setItem("username", user.username);
                }
                else {
                    toast.warn("Check your username and password", {
                        position: toast.POSITION.BOTTOM_LEFT
                    })
                }
            })
            .catch(err => console.error(err))
    };

    if (isAuthenticated === true) {
        return (<Redirect to={"/dashboard"}/>)
    }

        return (
            <div>
                    <Grid container spacing={0} alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                        <Grid item xs={12} sm={8} md={5} lg={3}>

                            <Card style={{padding: 15}}>
                                <Grid container spacing={0} alignItems="center">
                                    <Grid item xs={12}>
                                        <img src="logo-bw.png" alt="logo" style={{width: 250, padding: 30, display: "block", marginLeft: "auto", marginRight: "auto"}} />
                                    </Grid>
                                </Grid>

                                <CardContent>

                                    <ValidatorForm
                                        onSubmit={login}
                                        onError={errors => console.log(errors)}
                                    >

                                        <FormControl fullWidth>

                                            <TextValidator autoFocus fullWidth
                                                           label="Username"
                                                           type="text"
                                                           onChange={handleChange}
                                                           name="username"
                                                           value={user.username}
                                                           validators={['required']}
                                                           errorMessages={['this field is required']}
                                                           variant="outlined"
                                                           InputProps={{
                                                               startAdornment: (
                                                                   <InputAdornment position="start">
                                                                       <PermIdentityIcon color="action"/>
                                                                   </InputAdornment>
                                                               ),
                                                           }}

                                            />
                                        </FormControl>

                                        <FormControl fullWidth style={{paddingTop: 30}}>
                                            <TextValidator autoFocus fullWidth
                                                           label="Password"
                                                           type="password"
                                                           onChange={handleChange}
                                                           name="password"
                                                           value={user.password}
                                                           validators={['required']}
                                                           errorMessages={['this field is required']}
                                                           variant="outlined"
                                                           InputProps={{
                                                               startAdornment: (
                                                                   <InputAdornment position="start">
                                                                       <LockOpenIcon color="action"/>
                                                                   </InputAdornment>
                                                               ),
                                                           }}
                                            />
                                        </FormControl>
                                        <FormControl style={{width: 250, display: "block", marginLeft: "auto", marginRight: "auto", paddingTop: 40}}>
                                            <Fab color="primary" variant="extended" type="submit" style={{width: 250}}>Login</Fab>
                                        </FormControl>

                                    </ValidatorForm>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                    <ToastContainer autoClose={2500} />
            </div>
        );


};

export default Login;
