import React, {Component} from "react";
import IUser from "../ITypes";
import {Grid, Breadcrumbs, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";


interface IUserProps {
    user: IUser;
    link: string;
}


class UserDetails extends Component {

    public state: IUserProps = {
        user: {
            username: '',
        },
        link: ''
    };

    render() {
        return (
            <Grid container style={{padding: 15}}>
                <Grid item style={{padding: 15}} xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                        <Link to="/" style={{color: 'Grey'}}>Dashboard</Link>
                        <Typography color="textPrimary">Users</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item>
                <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>User Details</Typography><br/>
                <Typography variant="h6">Username: {this.state.user.username}</Typography>
                </Grid>
            </Grid>
        );
    }
}
export default UserDetails;




// import React, {useEffect, useState} from 'react';
// import IUser from "../ITypes";
// import {SERVER_URL} from "../constants";
//
// const UserDetails = (props) => {
//
//     const [user, setUser] = useState<IUser>({username: ''});
//
//     // useEffect(() => {
//     //     setUser({username: props.user.username});
//     // }, []);
//
//     // useEffect(() => {
//     //    fetch(SERVER_URL + `users/${1}`)
//     //        .then(res => res.json())
//     //        .then(res => setUser(res))
//     //        .catch(err => {console.log('Getting User Details problem', err)})
//     // }, []);
//
//     useEffect(() => {
//         props.getUserDetails(user, props.link);
//         setUser({username: props.user.username});
//     }, []);
//
//
//     return (
//         <div>
//             {user.username}
//         </div>
//     );
// };
//
// export default UserDetails;
