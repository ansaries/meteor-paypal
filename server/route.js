/*
 *  Imports
 */
import bodyParser from 'body-parser';
import ipn from 'paypal-ipn';

/*
 *  Allow Picker to work on POST requests
 */
var postRoutes = Picker.filter(function(req, res) {
    return req.method == "POST";
});

/*
 *  Add BodyParse json to Picker
 *  Add BodyParse urlencoded to Picker
 */
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

/*
 *  Paypal notifier
 *
 *  DO NOT: Change this route
 */
postRoutes.route('/ipaycallback', function(params, request, response, next) {

    PaypalReturn = request.body;

    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;

    ipn.verify(PaypalReturn, {'allow_sandbox': true}, Meteor.bindEnvironment(function (err, mes) {
        if(mes === 'VERIFIED'){
            /*
             * For more information about PaypalReturn Object.
             * Please visit :
             * https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guide/Appx_websitestandard_htmlvariables/
             */
            Meteor.call("handlePayement", PaypalReturn, function(error, result){
                if(!error)
                    console.log('Payement done.');
            });
        }
    }));

    /*
     *  Close Response.
     */
    response.end(JSON.stringify(PaypalReturn));

});
