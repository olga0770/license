import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Button,
    makeStyles,
    FormControl,
    Grid
} from '@material-ui/core';
import {IPartner, IUser} from "../ITypes";
import AddIcon from '@material-ui/icons/Add';
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

const PartnerCreateUser = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>(userInitialState);

    // const handleClickOpen = () => {
    //     setOpen(true);
    //     props.partnerId(user)
    // };

    const handleClickOpen = () => {
        setUser({
            id: '',
            partnerId: props.partnerId,
            companyName: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            zip: '',
            city: '',
            country: '',
            role: ''
        });
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        cleanInput();
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.addUser(user);
        handleClose();
        cleanInput();
    };

    const cleanInput = () => {
        setUser(userInitialState)
    };

    const [partners, setPartner] = useState<IPartner[]>([]);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL +'partners',
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
                console.log("fetch partners", res)
            })
            .catch(err => {console.log("Problems with fetching partners", err)})
    }, []);

    return (
        <React.Fragment>
            <Fab color="primary" variant="extended" aria-label="like" className={classes.fab} onClick={handleClickOpen} style={{marginLeft: -5}}>
                <AddIcon className={classes.extendedIcon} />New user
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        onSubmit={handleSave}
                        onError={errors => console.log(errors)}
                    >

                        <Grid container spacing={3} style={{padding: 30}}>

                            <Grid item xs={12} sm={12} md={6}>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth
                                                   label="Username"
                                                   onChange={handleChange}
                                                   name="username"
                                                   value={user.username}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Password"
                                                   onChange={handleChange}
                                                   name="password"
                                                   value={user.password}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                                   type="password"
                                    />
                                </FormControl>

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

                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth
                                                   label="Phone"
                                                   onChange={handleChange}
                                                   name="phone"
                                                   value={user.phone}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

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

                                <input type="hidden" name="role" value={user.role}/>
                                <input name="partnerId" value={user.partnerId} onChange={handleChange} hidden/>

                            </Grid>


                        </Grid>

                        <DialogActions style={{marginRight: -15}}>
                            <Button variant="outlined" color="secondary" className={classes.button} onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="outlined" color="primary" className={classes.button} >Save</Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default PartnerCreateUser;
