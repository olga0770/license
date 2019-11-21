import React, {Component} from "react";
import IUser from "../ITypes";
import {SERVER_URL} from "../constants";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";
import {Grid, IconButton, Paper, Breadcrumbs, Typography, Divider} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import UserDetails from "./UserDetails";

interface IUserProps {
    users: IUser[];
    loading: boolean
}

class UserList extends Component {

    public state: IUserProps = {
        users: [],
        loading: true
    };

    public async componentDidMount() {
        await this.fetchUsers();
    }

    fetchUsers = () => {
        fetch(SERVER_URL + 'users')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: responseData._embedded.users, loading: false
                });
            })
            .catch(err => console.error(err));
    };

    // Delete user
    onDelClick = (link) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            fetch(link, {method: 'DELETE'})
                .then(res => {
                    toast.success("Deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchUsers();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    };

    // Add new user
    addUser(user) {
        fetch(SERVER_URL + 'users',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(res => this.fetchUsers())
            .catch(err => console.error(err))
    }


    // Update user
    updateUser(user, link) {
        fetch(link,
            { method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                toast.success("Updated", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchUsers();
            })
            .catch(err =>
                toast.error("Error when updating", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    // Get User Details
    // getUserDetails(user, link) {
    //     fetch(link,
    //         { method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(user)
    //         })
    //         .then(res => {
    //             this.fetchUsers();
    //         })
    //         .catch(err => console.error(err))
    // }


    // Get User Details
    // getUserDetails = (link) => {
    //         fetch(link, {method: 'GET'})
    //             .then(res => {
    //                 this.fetchUsers();
    //             })
    //             .catch(err => {console.error(err)
    //             })
    // };




    render() {
        const columns = [
            {
                id: '_links.self.href',
                sortable: false,
                filterable: false,
                width: 75,
                accessor: '_links.self.href',
                // Cell: ({value, row, index}) => (<UserDetails user={row} link={value} getUserDetails={this.getUserDetails} fetchUsers={this.fetchUsers}/>)

                Cell: ({ index }) => (
                    <Link to={`users/${index}`}>
                    <IconButton>
                        <InfoIcon fontSize="small" />
                    </IconButton>
                    </Link>
                )
            },

            {
                Header: 'Username',
                accessor: 'username'
            },

            {
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '_links.self.href',
                Cell: ({value, row}) => (<UserUpdate user={row} link={value} updateUser={this.updateUser} fetchUsers={this.fetchUsers} />)
            },

            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '_links.self.href',
                Cell: ({ value }) => (
                    <IconButton aria-label="delete" onClick={()=>{this.onDelClick(value); } }>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )
            }
        ];




        return (
            <Grid container style={{padding: 15}}>

                <Grid item style={{padding: 15}} xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                        <Link to="/" style={{color: 'Grey'}}>Dashboard</Link>
                        <Typography color="textPrimary">Users</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>Users</Typography>
                    <Divider style={{marginBottom: 15}}/>
                    <UserCreate addUser={this.addUser} fetchUsers={this.fetchUsers} />
                </Grid>

                <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0}}>

                    <Paper>
                        {this.state.loading ? <Typography style={{padding: 15}}>Loading...</Typography>:
                            <ReactTable data={this.state.users} columns={columns}
                                        filterable={true} pageSize={5} className="-striped -highlight" />}

                    </Paper>



                </Grid>

                <ToastContainer autoClose={2000} />
            </Grid>
        );
    }
}

export default UserList;
