require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
    stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        payment_method_types: ['ideal', 'card', 'bancontact', 'giropay', 'p24', 'giropay', 'sofort', 'eps'],
    }).then(intent => {
            if (intent === null) {
                throw 500;
            }
            callback(null, {
                statusCode,
                headers,
                body: JSON.stringify({ client_secret: intent.client_secret }),
            });

            return intent;
        }).catch(err => {
        callback(err, {
            statusCode,
            headers,
            body: JSON.stringify({ status: 'failed' }),
        });
    });
};