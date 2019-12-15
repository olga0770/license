import React, {useState} from 'react';
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
import {IPartner} from "../ITypes";
import AddIcon from '@material-ui/icons/Add';
import {partnerInitialState} from "../InitialState";
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

const PartnerCreate = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [partner, setPartner] = useState<IPartner>(partnerInitialState);

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
        setPartner({...partner, [event.target.name]: event.target.value});
    };

    // Save user and close modal form
    const handleSave = () => {
        props.addPartner(partner);
        handleClose();
        cleanInput();
    };

    const cleanInput = () => {
        setPartner(partnerInitialState)
    };



    return (
        <React.Fragment>
            <Fab color="primary" variant="extended" aria-label="like" className={classes.fab} onClick={handleClickOpen} style={{marginLeft: -5}}>
                <AddIcon className={classes.extendedIcon} />New partner
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Partner</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        onSubmit={handleSave}
                        onError={errors => console.log(errors)}
                    >

                        <Grid container spacing={3} style={{padding: 30}}>

                            <Grid item xs={12} sm={12} md={6}>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth
                                                   label="Company Name"
                                                   onChange={handleChange}
                                                   name="companyName"
                                                   value={partner.companyName}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>

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

export default PartnerCreate;
