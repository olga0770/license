import React, {useState} from 'react';
import {IUserDetails} from "../ITypes";
import {Link, RouteComponentProps} from "react-router-dom";
import {SERVER_URL} from "../constants";
import {userDetailsInitialState} from "../InitialState";
import {Breadcrumbs, Divider, Grid, Typography, Card, CardHeader, Avatar, CardContent} from "@material-ui/core";


interface IRouterProps extends RouteComponentProps<IUserDetails>{}

const UserDetails: React.SFC<IRouterProps> = ({match}) => {

    console.log(match);

    const [user, setUser] = useState<IUserDetails>(userDetailsInitialState);

    React.useEffect(() => {
        fetch(SERVER_URL +`users/${match.params.id}`)
            .then(res => res.json())
            .then(res => {setUser(res); console.log('user details', res._embedded.partner)})
            .catch(err => {console.log('Getting problems with fetching UserDetails')})
    }, [match.params.id]);

    return (
        <React.Fragment key={match.params.id}>

            <Grid container style={{padding: 15}} key={match.params.id}>

                <Grid item style={{padding: 15}} xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                        <Link to="/" style={{color: 'Grey'}}>Dashboard</Link>
                        <Link to="/users" style={{color: 'Grey'}}>Users</Link>
                        <Typography color="textPrimary">{user.username}</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>User: {user.username}</Typography>
                    <Divider style={{marginBottom: 15}}/>
                </Grid>

                <Grid item xs={12} sm={6} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0}}>

                    <Card>
                        <CardHeader avatar={<Avatar aria-label="recipe">U</Avatar>}/>
                        <CardContent>
                            <Typography variant="h5">{user.username}</Typography>
                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="body1">First Name:</Typography>
                            <Typography variant="body1">Last Name:</Typography>
                            <Typography variant="body1">E-mail:</Typography>
                            <Typography variant="body1">Phone Number:</Typography>
                            <Typography variant="body1">Address:</Typography>
                            <Typography variant="body1">City:</Typography>
                            <Typography variant="body1">Country:</Typography>
                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="h6">Partner: </Typography>
                            <Typography variant="h6">Partner: {user._embedded.partner.companyName}</Typography>
                        </CardContent>


                    </Card>




                </Grid>

            </Grid>



        </React.Fragment>
    );
};

export default UserDetails;

