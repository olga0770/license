import React, {Component} from "react";
import IUser from "../ITypes";
import {Grid, Breadcrumbs, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {SERVER_URL} from "../constants";


interface IUserProps {
    user: IUser;
}

class UserDetails extends Component<IUserProps> {

    public state: IUserProps = {
        user: {
            username: ''
        }
    };


    public async componentDidMount() {
        await this.fetchUsers();
    }

    fetchUsers = () => {
        fetch(SERVER_URL + `users/${1}`)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('User Details', responseData);
                this.setState({
                    // user: responseData._links.self.href
                    // user: responseData._embedded.users[0]
                     user: responseData
                });
                console.log('User Details 2', responseData)
            })
            .catch(err => console.error(err));
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
                <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>User Details</Typography>
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
