import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function P24PaymentForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Make a payment with p24
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="email" label="Email" fullWidth autoComplete="email"
                               value={props.paymentMethodOptions?.email}
                               onChange={e => props.setPaymentMethodOptions(
                                   {...props.paymentMethodOptions,
                                           email: e.target.value
                                       }
                                   )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
