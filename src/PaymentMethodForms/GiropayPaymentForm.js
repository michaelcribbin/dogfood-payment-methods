import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function GiropayPaymentForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Make a payment with giropay
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="name" label="Name" fullWidth autoComplete="name"
                               value={props.paymentMethodOptions?.name}
                               onChange={e => props.setPaymentMethodOptions(
                                   {...props.paymentMethodOptions,
                                       name: e.target.value
                                   }
                               )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
