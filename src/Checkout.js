import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentMethodSelection from './PaymentMethodSelection';
import PaymentForm from './PaymentForm';
import {useElements, useStripe} from '@stripe/react-stripe-js';

import {IdealBankElement, CardElement} from '@stripe/react-stripe-js';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Select payment method', 'Payment details'];


export default function Checkout() {
    const stripe = useStripe();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('card');
    const [paymentMethodOptions, setPaymentMethodOptions] = React.useState({});
    const [clientSecret, setClientSecret] = React.useState({});
    const elements = useElements();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !clientSecret) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const paymentMethodConfirmMethod = (paymentMethod) => {
            switch(paymentMethod) {
                case 'card':
                    return stripe.confirmCardPayment;
                case 'ideal':
                    return stripe.confirmIdealPayment;
                case 'bancontact':
                    return stripe.confirmBancontactPayment;
                case 'eps':
                    return stripe.confirmEpsPayment;
                case 'giropay':
                    return stripe.confirmGiropayPayment;
                case 'p24':
                    return stripe.confirmP24Payment;
                case 'sofort':
                    return stripe.confirmSofortPayment;
                default:
                    throw new Error('Unknown payment method');
            }
        };

        const paymentConfirmationPayload = (paymentMethod, paymentMethodOptions) => {
            switch(paymentMethod) {
                case 'card':
                    return {
                        payment_method: {
                            card: elements.getElement(CardElement),
                            billing_details: {
                                name: paymentMethodOptions.name
                            }
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'ideal':
                    return {
                        payment_method: {
                            ideal: elements.getElement(IdealBankElement),
                            billing_details: {
                                name: paymentMethodOptions.name
                            }
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'bancontact':
                    return {
                        payment_method: {
                            billing_details: {
                                name: paymentMethodOptions.name
                            },
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'eps':
                    return {
                        payment_method: {
                            billing_details: {
                                name: paymentMethodOptions.name
                            },
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'giropay':
                    return {
                        payment_method: {
                            billing_details: {
                                name: paymentMethodOptions.name
                            },
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'p24':
                    return {
                        payment_method: {
                            billing_details: {
                                email: paymentMethodOptions.email
                            },
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                case 'sofort':
                    return {
                        payment_method: {
                            sofort: {
                                country: paymentMethodOptions.country
                            },
                        },
                        return_url: 'https://www.michaelcribbin.com/checkout/complete',
                    };
                default:
                    throw new Error('Unknown payment method');
            }
        };

        const {error} = paymentMethodConfirmMethod(paymentMethod)(clientSecret, paymentConfirmationPayload(paymentMethod, paymentMethodOptions));

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }
    };


    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return <PaymentMethodSelection
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />;
            case 1:
                return <PaymentForm
                    paymentMethod={paymentMethod}
                    paymentMethodOptions={paymentMethodOptions}
                    setPaymentMethodOptions={setPaymentMethodOptions}
                    setClientSecret={setClientSecret}
                />;
            default:
                throw new Error('Unknown step');
        }
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent()}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}