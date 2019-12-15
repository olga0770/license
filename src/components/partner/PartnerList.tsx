import React, {Component} from "react";
import {IPartner} from "../ITypes";
import {SERVER_URL} from "../constants";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Grid, IconButton, Paper, Breadcrumbs, Typography, Divider, Badge} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Nav from "../nav/Nav";
import PartnerCreate from "./PartnerCreate";


interface IPartnerProps {
    partners: IPartner[];
    loading: boolean;
    totalElements: number;
}

class PartnerList extends Component {

    public state: IPartnerProps = {
        partners: [],
        loading: true,
        totalElements: 0
    };

    public async componentDidMount() {
        await this.fetchPartners();
    }

    fetchPartners = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'partners',
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
                    partners: responseData, loading: false, totalElements: responseData.length
                });
            })
            .catch(err => console.error(err));
    };

    onDelClick = (userId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL +`partners/delete-all-including-users/${userId}`,
                {method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    toast.success("Deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchPartners();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    };

    addPartner(partner) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'partners',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(partner)
            })
            .then(res => {
                if (res.status < 400) {
                    toast.success("Created", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchPartners();
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



    render() {
        const columns = [
            {
                id: 'id',
                filterable: false,
                width: 50,
                accessor: 'id',

                Cell: ({ row }) => (
                    <Link to={`partners/${row.id}`}>
                        <IconButton style={{marginTop: -10}}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Link>
                )
            },

            {
                Header: 'Company Name',
                accessor: 'companyName'
            },

            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '',
                Cell: ({ row }) => (
                    <IconButton aria-label="delete" onClick={()=>{this.onDelClick(row.id); } } style={{marginTop: -10}}>
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
                            <Typography color="textPrimary">Partners</Typography>
                        </Breadcrumbs>

                        <Typography variant="h4" style={{color: 'Grey', marginTop: 15}}>Partners</Typography>
                        <Divider style={{marginBottom: 15}}/>
                        <PartnerCreate addPartner={this.addPartner} fetchPartners={this.fetchPartners} />
                    </Grid>

                    <Grid item xs={12} style={{paddingLeft: 15, paddingRight: 15, paddingTop: 0}}>

                        <Badge badgeContent={this.state.totalElements} color="secondary" style={{position: "absolute", right: 40}}><PermIdentityIcon /></Badge>

                        <Paper style={{marginTop: 30}}>
                            {this.state.loading ? <Typography style={{padding: 15}}>Loading...</Typography>:
                                <ReactTable data={this.state.partners} columns={columns}
                                            filterable={true} pageSize={5} className="-striped -highlight" />}
                        </Paper>

                    </Grid>
                    <ToastContainer autoClose={3000} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default PartnerList;
