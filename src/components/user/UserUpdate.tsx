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
import IUser from "../ITypes";
import EditIcon from '@material-ui/icons/Edit';

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
    const [user, setUser] = useState<IUser>({username: ''});

    const handleClickOpen = () => {
        setUser({username: props.user.username});
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
                    <TextField autoFocus fullWidth label="Username" name="username"
                               value={user.username} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" className={classes.button} onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserUpdate;
