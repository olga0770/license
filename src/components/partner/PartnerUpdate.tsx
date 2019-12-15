import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,
    IconButton,
    makeStyles
} from '@material-ui/core';
import {IPartner} from "../ITypes";
import EditIcon from '@material-ui/icons/Edit';
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

const PartnerUpdate = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [partner, setPartner] = useState<IPartner>(partnerInitialState);

    const handleClickOpen = () => {
        setPartner({
            id: props.partner.id,
            companyName: props.partner.companyName,
            address: props.partner.address,
            zip: props.partner.zip,
            city: props.partner.city,
            country: props.partner.country
        });
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setPartner({...partner, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.updatePartner(partner, props.partner.id);
        handleClose();
    };


    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen} style={{marginTop: -10}}>
                <EditIcon fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Partner: {props.partner.companyName}</DialogTitle>
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

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Address"
                                                   onChange={handleChange}
                                                   name="address"
                                                   value={partner.address}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth
                                                   label="ZIP"
                                                   onChange={handleChange}
                                                   name="zip"
                                                   value={partner.zip}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="City"
                                                   onChange={handleChange}
                                                   name="city"
                                                   value={partner.city}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextValidator autoFocus fullWidth style={{marginTop: 30}}
                                                   label="Country"
                                                   onChange={handleChange}
                                                   name="country"
                                                   value={partner.country}
                                                   validators={['required']}
                                                   errorMessages={['this field is required']}
                                    />
                                </FormControl>


                            </Grid>

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

export default PartnerUpdate;
