import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    IconButton,
    makeStyles, MenuItem,
    TextField, Typography
} from '@material-ui/core';
import {IPartner, IUser} from "../ITypes";
import EditIcon from '@material-ui/icons/Edit';
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

const UserUpdate = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>(userInitialState);

    const handleClickOpen = () => {
        setUser({id: props.user.id, partnerId: props.user.partnerId, username: props.user.username});
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.updateUser(user, props.link, user.id);
        handleClose();
    };

    const [partners, setPartner] = useState<IPartner[]>([]);

    useEffect(() => {
        fetch(SERVER_URL +'partners')
            .then(res => res.json())
            .then(res => {
                setPartner(res);
                console.log("fetch partners", res)
            })
            .catch(err => {console.log("Problems with fetching partners", err)})
    }, []);


    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User</DialogTitle>
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
                                value={user.partnerId}
                                name="partnerId"
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                {partners.map((partner: any, index: number) => (<MenuItem key={index} value={partner.id}>{partner.companyName}</MenuItem>))}
                            </SelectValidator>
                        </FormControl>

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

export default UserUpdate;
