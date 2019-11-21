import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Button, TextField, makeStyles} from '@material-ui/core';
import IUser from "../ITypes";
import AddIcon from '@material-ui/icons/Add';

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
    const [user, setUser] = useState<IUser>({username: ''});

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    // Save user and close modal form
    const handleSave = () => {
        props.addUser(user);
        handleClose();
    };


    return (
        <React.Fragment>
            <Fab color="primary" variant="extended" aria-label="like" className={classes.fab} onClick={handleClickOpen} style={{marginLeft: -5}}>
                <AddIcon className={classes.extendedIcon} />New user
            </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Username" name="username"
                               value={user.username} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" className={classes.button} onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UserCreate;
