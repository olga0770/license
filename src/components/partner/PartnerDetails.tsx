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
import PartnerCreateUser from "./PartnerCreateUser";
import PartnerUpdateUser from "./PartnerUpdateUser";

interface IRouterProps extends RouteComponentProps<IPartner>{}


const PartnerDetails: React.SFC<IRouterProps> = ({match}) => {

    console.log(match);

    const [partner, setPartner] = useState<IPartnerDetails>(partnerDetailsInitialState);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);


    useEffect(() => {
        fetchPartner();
    }, []);



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
            .catch(() => {console.log('Getting problems with fetching PartnerDetails')})
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
                .then(() => {
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
            .catch(() =>
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
                    <IconButton>
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
            accessor: 'partnerId',
            show: false
        },

        {
            sortable: false,
            filterable: false,
            width: 50,
            accessor: '',
            Cell: ({value, row}) => (
                <PartnerUpdateUser user={row} userId={value} updateUser={updateUser} fetchUsers={fetchPartner}
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
                <IconButton aria-label="delete" onClick={()=>{onDelClick(row.id); } } >
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
                    <Divider/>
                </Grid>
            </Grid>

            {loading ? <Typography style={{padding: 15}}>Loading...</Typography>:


                <Grid container style={{padding: 15}}>

                    <Grid item xs={12} sm={10} md={6} lg={3} style={{marginLeft: 15, marginTop: -15}}>

                        <Card>
                            <CardHeader avatar={<Avatar aria-label="recipe">P</Avatar>} style={{marginBottom: -15}}/>
                            <CardContent>
                                <Typography variant="h5">{partner.companyName}</Typography>
                                <Divider style={{marginBottom: 15}}/>
                                <Typography>{partner.address}, {partner.zip} {partner.city}, {partner.country}</Typography>
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0, marginBottom: 50}}>
                        <Typography variant="h5" style={{color: 'Grey', marginTop: 15}}>Users</Typography>
                        <Divider style={{marginBottom: 15}}/>
                        <PartnerCreateUser addUser={addUser} fetchUsers={fetchPartner} partnerId={partner.id} />
                    </Grid>

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, marginTop: -65}}>

                        <Badge badgeContent={totalUsers} color="secondary" style={{position: "absolute", right: 30}}><PermIdentityIcon /></Badge>

                        <Paper style={{marginTop: 30}}>
                            <ReactTable data={partner.users} columns={columns}
                                        filterable={true} pageSize={5} className="-striped -highlight" />
                        </Paper>

                        <Divider style={{marginBottom: 30, marginTop: 30}}/>

                    </Grid>
                    <ToastContainer autoClose={3000} />

                </Grid>}



        </React.Fragment>
    );
};

export default withRouter(PartnerDetails);

