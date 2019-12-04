import React, {useState} from 'react';
import {IUserDetails} from "../ITypes";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {SERVER_URL} from "../constants";
import {userDetailsInitialState} from "../InitialState";
import {Breadcrumbs, Divider, Grid, Typography, Card, CardHeader, Avatar, CardContent} from "@material-ui/core";
import Nav from "../nav/Nav";


interface IRouterProps extends RouteComponentProps<IUserDetails>{}

const UserDetails: React.SFC<IRouterProps> = ({match}) => {

    console.log(match);

    const [user, setUser] = useState<IUserDetails>(userDetailsInitialState);

    React.useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL +`users/${match.params.id}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(res => {setUser(res); console.log('user details', res)})
            .catch(err => {console.log('Getting problems with fetching UserDetails')})
    }, [match.params.id]);

    return (
        <React.Fragment key={match.params.id}>
            <Nav/>

            <Grid container style={{padding: 15}} key={match.params.id}>

                <Grid item style={{padding: 15}} xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                        <Link to="/dashboard" style={{color: 'Grey'}}>Dashboard</Link>
                        <Link to="/users" style={{color: 'Grey'}}>Users</Link>
                        <Typography color="textPrimary">{user.username}</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>User: {user.username}</Typography>
                    <Divider style={{marginBottom: 15}}/>
                </Grid>
            </Grid>


            <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item xs={12} sm={10} md={6} lg={3}>

                    <Card>
                        <CardHeader avatar={<Avatar aria-label="recipe">U</Avatar>}/>
                        <CardContent>
                            <Typography variant="h5">{user.username}</Typography>
                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>First Name:</b></span> <span>{user.firstName}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>Last Name:</b></span> <span>{user.lastName}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>E-mail:</b></span> <span>{user.email}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>Phone:</b></span> <span>{user.phone}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>Address:</b></span> <span>{user.address}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>ZIP:</b></span> <span>{user.zip}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>City:</b></span> <span>{user.city}</span></Typography>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>Country:</b></span> <span>{user.country}</span></Typography>
                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="h6">Partner: {user.partner.companyName}</Typography>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>



        </React.Fragment>
    );
};

export default withRouter(UserDetails);

