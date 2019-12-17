import React, {Component} from "react";
import {IUser} from "../ITypes";
import {SERVER_URL} from "../constants";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";
import {Grid, IconButton, Paper, Breadcrumbs, Typography, Divider, Badge} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Nav from "../nav/Nav";

interface IUserProps {
    users: IUser[];
    loading: boolean;
    totalElements: number;
}

class UserList extends Component {

    public state: IUserProps = {
        users: [],
        loading: true,
        totalElements: 0
    };

    public async componentDidMount() {
        await this.fetchUsers();
    }

    fetchUsers = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'users',
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: responseData, loading: false, totalElements: responseData.length
                });
            })
            .catch(err => console.error(err));
    };


    onDelClick = (userId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL +`users/${userId}`,
                {method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
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


    addUser(user) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'users',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                if (res.status < 400) {
                    toast.success("Created", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchUsers();
                }
                else {
                    console.log('error:' + res.status);
                    toast.error("Error when creating", {
                        position: toast.POSITION.BOTTOM_LEFT
                    })
                }
            })
            .catch(err => console.error(err))
    }



    updateUser(user, userId) {
        const url = SERVER_URL + `users/${userId}`;
        const token = sessionStorage.getItem("jwt");
        fetch(url,
            { method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                if (res.status < 400) {
                    toast.success("Updated", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchUsers();
                }
                else {
                    console.log('error:' + res.status);
                    toast.error("Error when updating", {
                        position: toast.POSITION.BOTTOM_LEFT
                    })
                }
            })
            .catch(() =>
                toast.error("Error when updating", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
        const columns = [
            {
                id: 'id',
                filterable: false,
                width: 50,
                accessor: 'id',

                Cell: ({ row }) => (
                    <Link to={`users/${row.id}`}>
                        <IconButton style={{marginTop: 0}}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Link>
                )
            },

            {
                Header: 'Username',
                accessor: 'username',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'Password',
                accessor: 'password',
                show: false
            },

            {
                Header: 'First Name',
                accessor: 'firstName',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'Last Name',
                accessor: 'lastName',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'E-mail',
                accessor: 'email',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'Phone',
                accessor: 'phone',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'Address',
                accessor: 'address',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'ZIP',
                accessor: 'zip',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'City',
                accessor: 'city',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                Header: 'Country',
                accessor: 'country',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                sortable: false,
                filterable: false,
                Header: 'Partner',
                accessor: 'companyName',
                style: { marginTop: 10, padding: 10 },
                headerStyle: {padding: 10}
            },

            {
                sortable: false,
                filterable: false,
                Header: 'Partner',
                accessor: 'partnerId',
                show: false
            },

            {
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '',
                Cell: ({value, row}) => (
                    <UserUpdate user={row} userId={value} updateUser={this.updateUser} fetchUsers={this.fetchUsers}
                    />
                )
            },

            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '',
                Cell: ({ row }) => (
                    <IconButton aria-label="delete" onClick={()=>{this.onDelClick(row.id); } } >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )
            }
        ];

        return (
            <React.Fragment>
                <Nav/>
                <Grid container style={{padding: 15}}>

                    <Grid item style={{padding: 15}} xs={12}>
                        <Breadcrumbs aria-label="breadcrumb" style={{marginTop: -15}}>
                            <Link to="/dashboard" style={{color: 'Grey'}}>Dashboard</Link>
                            <Typography color="textPrimary">Users</Typography>
                        </Breadcrumbs>

                        <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>Users</Typography>
                        <Divider style={{marginBottom: 15}}/>
                        <UserCreate addUser={this.addUser} fetchUsers={this.fetchUsers} />
                    </Grid>

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0, marginTop: -30}}>

                        <Badge badgeContent={this.state.totalElements} color="secondary" style={{position: "absolute", right: 40}}><PermIdentityIcon /></Badge>

                        <Paper style={{marginTop: 30}}>
                            {this.state.loading ? <Typography style={{padding: 15}}>Loading...</Typography>:
                                <ReactTable data={this.state.users} columns={columns}
                                            filterable={true} defaultPageSize={5} className="-striped -highlight" style={{padding: 5}}/> }
                        </Paper>
                    </Grid>
                    <ToastContainer autoClose={3000} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default UserList;
