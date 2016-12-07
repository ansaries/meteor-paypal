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
        email="john.doe@gmail.com"
        itemName="An item name"
        returnUrl="http://domain.com/become-premium"
        notifyUrl="http://domain.com/paypalcallback"
        cancelUrl="http://domain.com/thankyou"
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
import ipn from 'paypal-ipn'

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
            //Do whatever you want with the data
            //Store data if you want
        }
    });
});

```

## Credits
This package uses Open Source components. You can find the source code of their open source projects along with license information below. We acknowledge and are grateful to these developers for their contributions to open source.

* andzdroid : [PayPal IPN Verification](https://github.com/andzdroid/paypal-ipn)
* meteorhacks : [Picker - Server Side Router for Meteor](https://github.com/meteorhacks/picker)


License
----

MIT
