# Meteor paypal
This package implements all paypal payements methods.

> Simple button so far. Updates are coming !

## To install
From your Meteor project directory:
```sh
$ meteor add ie76:paypal-button
```
## Basic Usage

##### Client side
How to implement a simple paypal button in your template :
```html
    {{> iPaypalButton
        email="john.doe@domaine.com"
        itemName="An item name"
        itemName="{{product._id}}"
        userId="{{userId}}"
        returnUrl="http://domain.com/thankyou"
        notifyUrl="http://domain.com/paypalcallback"
        cancelUrl="http://domain.com/"
        amount="9"
        currency="USD"
        btnText="Subscribe Now"
    }}
```
This is it ! Now you will need to create some routing for:
* Return url
* Notify url | For : **Server Side**
* Cancel url

## Walkthrough
For this example we will use __picker__ :
```sh
$ meteor add meteorhacks:picker
```
We will create a backend route for the notify url.
```js
import bodyParser from 'body-parser';

var postRoutes = Picker.filter(function(req, res) {
    return req.method == "POST";
});

Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

postRoutes.route('/paypalcallback', function(params, request, response, next) {

    PaypalReturn = request.body;

    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;
    response.end(JSON.stringify(PaypalReturn));

});
```
Now you got a response from paypal with the transaction data, if you want to verify PayPal IPN messages, you will need to require paypal-ipn.
```sh
$ npm install paypal-ipn
```
Once done your code will become :
```js
import bodyParser from 'body-parser';
import ipn from 'paypal-ipn';
import { Picker } from 'meteor/meteorhacks:picker';
import { Async } from 'meteor/meteorhacks:async';
import { Payments } from './collections';


function handlePayment(paypalReturn) {
  const payment = {
      _id = paypalReturn.txn_id,
      userId = paypalReturn.custom, // I sent the userId in it from the HTML button component.
      amount = Number(paypalReturn.mc_gross),
      transactionId = paypalReturn.txn_id,   
      itemName = paypalReturn.item_name,
      itemNumber = paypalReturn.item_number, // I sent the product_id in it.
      payerEmail = paypalReturn.payer_email,
      paymentMethod = 'paypal',
  };
  const alreadyPaid = Payments.findOne(payment._id); 

  if (payment.amount > 0 && !alreadyPaid) { // ignore duplicate calls from paypal.
    //Try the code block, as i have implemented Payments.after.insert() hook, which may throw an exception.
    //You can also insert without try/catch block.
    try {     
      Payments.insert(payment);
    } catch(err) {
      console.log(`Error in saving payment id(${payment.transactionId}): `, err);
    }
  }
  console.log('payment done, for txnID: ', payment.transactionId);
}


var postRoutes = Picker.filter(function(req, res) {
    return req.method == "POST";
});

Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

postRoutes.route('/paypalcallback', function(params, request, response, next) {

    PaypalReturn = request.body;

    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;

    ipn.verify(PaypalReturn, {'allow_sandbox': true}, function callback(err, mes) {
        if(mes === 'VERIFIED'){
            //For more information on PaypalReturn object
            //Visit https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guide/Appx_websitestandard_htmlvariables/
            handlePayment(PaypalReturn);
        }
    });
    // call response.end(), otherwise paypal will keep on posting the data on the notify_url.
    // which may create duplicate transactions, though i handled the duplicate check in the handle payment.
    response.end(); 
    
});

```

## Credits
This package uses Open Source components. You can find the source code of their open source projects along with license information below. We acknowledge and are grateful to these developers for their contributions to open source.

* andzdroid : [PayPal IPN Verification](https://github.com/andzdroid/paypal-ipn)
* meteorhacks : [Picker - Server Side Router for Meteor](https://github.com/meteorhacks/picker)


License
----

MIT
