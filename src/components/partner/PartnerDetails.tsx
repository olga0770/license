import React, {useState, useEffect} from 'react';
import {IPartner} from "../ITypes";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {SERVER_URL} from "../constants";
import {partnerInitialState} from "../InitialState";
import {Breadcrumbs, Divider, Grid, Typography, Card, CardHeader, Avatar, CardContent} from "@material-ui/core";
import Nav from "../nav/Nav";


interface IRouterProps extends RouteComponentProps<IPartner>{}

const UserDetails: React.SFC<IRouterProps> = ({match}) => {

    console.log(match);

    const [partner, setPartner] = useState<IPartner>(partnerInitialState);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL +`partners/${match.params.id}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(res => {setPartner(res); console.log('partner details', res)})
            .catch(err => {console.log('Getting problems with fetching PartnerDetails')})
    }, [match.params.id]);

    return (
        <React.Fragment key={match.params.id}>
            <Nav/>

            <Grid container style={{padding: 15}} key={match.params.id}>

                <Grid item style={{padding: 15}} xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                        <Link to="/dashboard" style={{color: 'Grey'}}>Dashboard</Link>
                        <Link to="/partners" style={{color: 'Grey'}}>Partners</Link>
                        <Typography color="textPrimary">{partner.companyName}</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>Partner: {partner.companyName}</Typography>
                    <Divider style={{marginBottom: 15}}/>
                </Grid>
            </Grid>


            <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item xs={12} sm={10} md={6} lg={3}>

                    <Card>
                        <CardHeader avatar={<Avatar aria-label="recipe">P</Avatar>}/>
                        <CardContent>
                            <Typography variant="h5">{partner.companyName}</Typography>
                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="body1"><span style={{display: "inline-block", width: 150}}><b>Company Name:</b></span> <span>{partner.companyName}</span></Typography>

                            <Divider style={{marginBottom: 15}}/>
                            <Typography variant="h6">Partner: {partner.companyName}</Typography>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>



        </React.Fragment>
    );
};

export default withRouter(UserDetails);

