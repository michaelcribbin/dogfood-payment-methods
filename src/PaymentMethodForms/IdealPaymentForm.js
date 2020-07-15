import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {IdealBankElement} from '@stripe/react-stripe-js';

const IDEAL_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
        base: {
            padding: '10px 12px',
            color: '#32325d',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
    },
};


export default function IdealPaymentForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Make a payment with Ideal
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="name" label="Name" fullWidth autoComplete="full-name"
                               value={props.paymentMethodOptions?.name}
                               onChange={e => props.setPaymentMethodOptions(
                                   {
                                       name: e.target.value
                                   }
                               )} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>
                        iDEAL Bank
                        <IdealBankElement options={IDEAL_ELEMENT_OPTIONS} />
                    </label>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
