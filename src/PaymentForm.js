import React, {Component} from 'react';
import CardPaymentForm from "./PaymentMethodForms/CardPaymentForm";
import IdealPaymentForm from "./PaymentMethodForms/IdealPaymentForm";
import P24PaymentForm from "./PaymentMethodForms/P24PaymentForm";
import BancontactPaymentForm from "./PaymentMethodForms/BancontactPaymentForm";
import EPSPaymentForm from "./PaymentMethodForms/EPSPaymentForm";
import GiropayPaymentForm from "./PaymentMethodForms/GiropayPaymentForm";
import SofortPaymentForm from "./PaymentMethodForms/SofortPaymentForm";

function getPaymendMethodForm(props) {
    switch (props.paymentMethod) {
        case 'card':
            return <CardPaymentForm
                {...props}
            />;
        case 'ideal':
            return <IdealPaymentForm
                {...props}
            />;
        case 'p24':
            return <P24PaymentForm
                {...props}
            />;
        case 'eps':
            return <EPSPaymentForm
                {...props}
            />;
        case 'giropay':
            return <GiropayPaymentForm
                {...props}
            />;
        case 'sofort':
            return <SofortPaymentForm
                {...props}
            />;
        case 'bancontact':
            return <BancontactPaymentForm
                {...props}
            />;
        default:
            throw new Error('Unknown step');
    }
}

export default class PaymentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client_secret: '',
        };
        this.props = props
    }


    componentDidMount() {
        fetch('/.netlify/functions/createPaymentIntent', {
            body: JSON.stringify({amount: 1299}),
            method: 'POST'
        }).then(response => {
            return response.json()
        }).then(intent => {
            this.props.setClientSecret(intent.client_secret)
        })
    }

    render() {
        return getPaymendMethodForm(this.props)
    }

}