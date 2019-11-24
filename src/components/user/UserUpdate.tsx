import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    TextField
} from '@material-ui/core';
import {IUser} from "../ITypes";
import EditIcon from '@material-ui/icons/Edit';
import {userInitialState} from "../InitialState";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
        setUser({id: props.user.id, partnerid: props.user.partnerid, username: props.user.username});
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.updateUser(user, props.link);
        handleClose();
    };


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
                        <TextValidator autoFocus fullWidth
                                       label="Username"
                                       onChange={handleChange}
                                       name="username"
                                       value={user.username}
                                       validators={['required']}
                                       errorMessages={['this field is required']}
                        />
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
