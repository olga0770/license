import React, {useState, useEffect} from 'react';
import {IPartner, IPartnerDetails} from "../ITypes";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {SERVER_URL} from "../constants";
import {partnerDetailsInitialState} from "../InitialState";
import {
    Breadcrumbs,
    Divider,
    Grid,
    Typography,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Badge,
    Paper, IconButton
} from "@material-ui/core";
import Nav from "../nav/Nav";
import ReactTable from "react-table";
import InfoIcon from "@material-ui/icons/Info";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from "@material-ui/icons/Delete";
import UserCreate from "../user/UserCreate";
import UserUpdate from "../user/UserUpdate";

interface IRouterProps extends RouteComponentProps<IPartner>{}


const UserDetails: React.SFC<IRouterProps> = ({match}) => {

    console.log(match);

    const [partner, setPartner] = useState<IPartnerDetails>(partnerDetailsInitialState);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);


    useEffect(() => {
        fetchPartner();
    }, [match.params.id]);



    const fetchPartner = () => {
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
            .then(res => {
                setPartner(res);
                setLoading(false);
                setTotalUsers(res.users.length);
                console.log('partner details', res)})
            .catch(err => {console.log('Getting problems with fetching PartnerDetails')})
    };



    const onDelClick = (userId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL +`users/${userId}`,
                {method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    toast.success("Deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    fetchPartner();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    };

    const addUser = (user) => {
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
                    fetchPartner();
                }
                else {
                    console.log('error:' + res.status);
                    toast.error("Error when creating", {
                        position: toast.POSITION.BOTTOM_LEFT
                    })
                }
            })
            .catch(err => console.error(err))
    };

    const updateUser = (user, userId) => {
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
                    fetchPartner();
                }
                else {
                    console.log('error:' + res.status);
                    toast.error("Error when updating", {
                        position: toast.POSITION.BOTTOM_LEFT
                    })
                }
            })
            .catch(err =>
                toast.error("Error when updating", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            );

    };


    const columns = [
        {
            id: 'id',
            filterable: false,
            width: 50,
            accessor: 'id',

            Cell: ({ row }) => (
                <Link to={`users/${row.id}`}>
                    <IconButton style={{marginTop: -10}}>
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
            Header: 'Password',
            accessor: 'password',
            show: false
        },

        {
            Header: 'First Name',
            accessor: 'firstName'
        },

        {
            Header: 'Last Name',
            accessor: 'lastName'
        },

        {
            Header: 'E-mail',
            accessor: 'email'
        },

        {
            Header: 'Phone',
            accessor: 'phone'
        },

        {
            Header: 'Address',
            accessor: 'address'
        },

        {
            Header: 'ZIP',
            accessor: 'zip'
        },

        {
            Header: 'City',
            accessor: 'city'
        },

        {
            Header: 'Country',
            accessor: 'country'
        },

        {
            sortable: false,
            filterable: false,
            width: 50,
            accessor: '',
            Cell: ({value, row}) => (
                <UserUpdate user={row} userId={value} updateUser={updateUser} fetchUsers={fetchPartner}
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
                <IconButton aria-label="delete" onClick={()=>{onDelClick(row.id); } } style={{marginTop: -10}}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )
        }
    ];



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


            {loading ? <Typography style={{padding: 15}}>Loading...</Typography>:


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

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0}}>
                        <Typography variant="h5" style={{color: 'Grey', marginTop: 15}}>Users</Typography>
                        <Divider style={{marginBottom: 15}}/>
                        <UserCreate addUser={addUser} fetchUsers={fetchPartner} />
                    </Grid>

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0}}>

                        {/*<Link to="/users" style={{color: 'Grey'}}>Manage users</Link>*/}

                        <Badge badgeContent={totalUsers} color="secondary" style={{position: "absolute", right: 30}}><PermIdentityIcon /></Badge>


                        <Paper style={{marginTop: 30}}>
                            <ReactTable data={partner.users} columns={columns}
                                        filterable={true} pageSize={5} className="-striped -highlight" />
                        </Paper>

                    </Grid>
                    <ToastContainer autoClose={3000} />

                </Grid>}



        </React.Fragment>
    );
};

export default withRouter(UserDetails);

