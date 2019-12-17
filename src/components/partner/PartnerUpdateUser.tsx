import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    makeStyles
} from '@material-ui/core';
import {IPartner, IUser} from "../ITypes";
import EditIcon from '@material-ui/icons/Edit';
import {userInitialState} from "../InitialState";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {SERVER_URL} from "../constants";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const PartnerUpdateUser = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>(userInitialState);

    const handleClickOpen = () => {
        setUser({
            id: props.user.id,
            partnerId: props.user.partnerId,
            companyName: props.user.companyName,
            username: props.user.username,
            password: props.user.password,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            phone: props.user.phone,
            address: props.user.address,
            zip: props.user.zip,
            city: props.user.city,
            country: props.user.country,
            role: props.user.role
        });
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.updateUser(user, props.user.id);
        handleClose();
    };

    const [partners, setPartner] = useState<IPartner[]>([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        const abortController = new AbortController();
        fetch(SERVER_URL +'partners',
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: abortController.signal
            }
        )
            .then(res => res.json())
            .then(res => {
                setPartner(res);
                console.log("fetch partners", res)
            })
            .catch(err => {console.log("Problems with fetching partners", err)});
        return () => { abortController.abort() }
    }, []);


    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User: {props.user.username}</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        onSubmit={handleSave}
                        onError={errors => console.log(errors)}
                    >
                        <Grid container spacing={3} style={{padding: 30}}>

                            <Grid item xs={12} sm={12} md={6}>


                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="First Name"
                                                   onChange={handleChange}
                                                   name="firstName"
                                                   value={user.firstName}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Last Name"
                                                   onChange={handleChange}
                                                   name="lastName"
                                                   value={user.lastName}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="E-mail"
                                                   onChange={handleChange}
                                                   name="email"
                                                   value={user.email}
                                                   validators={['required', 'isEmail']}
                                                   errorMessages={['this field is required', 'email is not valid']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Phone"
                                                   onChange={handleChange}
                                                   name="phone"
                                                   value={user.phone}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Address"
                                                   onChange={handleChange}
                                                   name="address"
                                                   value={user.address}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="ZIP"
                                                   onChange={handleChange}
                                                   name="zip"
                                                   value={user.zip}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="City"
                                                   onChange={handleChange}
                                                   name="city"
                                                   value={user.city}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Country"
                                                   onChange={handleChange}
                                                   name="country"
                                                   value={user.country}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                            </Grid>

                            <input name="partnerId" value={user.partnerId} onChange={handleChange} hidden/>


                        </Grid>

                        <DialogActions style={{marginRight: -15}}>
                            <Button variant="outlined" color="secondary" className={classes.button} onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="outlined" color="primary" className={classes.button} >Save</Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PartnerUpdateUser;
