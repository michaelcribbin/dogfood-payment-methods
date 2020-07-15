import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

export default function PaymentMethodSelection(props) {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment Methods
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup aria-label="payment-methods" name="payment-methods" value={props.paymentMethod} onChange={e => props.setPaymentMethod(e.target.value)} >
                    <FormControlLabel value="card" control={<Radio />} label="Card" />
                    <FormControlLabel value="ideal" control={<Radio />} label="Ideal" />
                    <FormControlLabel value="p24" control={<Radio />} label="p24" />
                    <FormControlLabel value="bancontact"  control={<Radio />} label="Bancontact" />
                    <FormControlLabel value="sofort" control={<Radio />} label="Sofort" />
                    <FormControlLabel value="eps" control={<Radio />} label="EPS" />
                    <FormControlLabel value="giropay" control={<Radio />} label="giropay" />
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    );
}