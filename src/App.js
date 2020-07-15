import React, { Component } from 'react';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Checkout from "./Checkout";

class App extends Component {

    render() {
        const stripePromise = loadStripe("pk_test_51H5Cu5KTIlAu8i0Tl1avGUXrHTNC319h2f3VMHaIyKeb19JQOgljZlpj53GxNH9iFQFrgNyZEdPe54R7vLZKbV5P00BRa0Zzof", {betas: ['sofort_pm_beta_1']});

        return (
            <div className="App">
                <Elements stripe={stripePromise}>
                    <Checkout/>
                </Elements>
            </div>
        );
    }
}

export default App;
