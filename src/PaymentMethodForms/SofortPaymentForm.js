import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CountrySelect from "../CountrySelect";

export default function SofortPaymentForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Make a payment with Sofort
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <CountrySelect
                        value={props.paymentMethodOptions?.country}
                        onChange={(e, newValue) => props.setPaymentMethodOptions(
                            {...props.paymentMethodOptions,
                                country: newValue.code
                            }
                        )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
