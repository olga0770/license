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
    MenuItem,
    Typography,
    Divider
} from '@material-ui/core';
import {IPartner, IUser} from "../ITypes";
import AddIcon from '@material-ui/icons/Add';
import {userInitialState} from "../InitialState";
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
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

const UserCreate = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>(userInitialState);

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
        cleanInput();
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    // Save user and close modal form
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
       fetch(SERVER_URL +'partners')
           .then(res => res.json())
           .then(res => {
               setPartner(res._embedded.partners);
                    console.log("fetch partners", res._embedded.partners)
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

                        <FormControl fullWidth style={{marginTop: 30, marginBottom: 15}}>
                            <Divider/>
                            <Typography variant="body1">Select Partner</Typography>
                            <SelectValidator
                                id="demo-simple-select"
                                value={user.username}
                                name="username"
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                {partners.map((partner: any, index: number) => (<MenuItem key={index} value={partner}>{partner.companyName}</MenuItem>))}
                            </SelectValidator>
                        </FormControl>

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

export default UserCreate;
