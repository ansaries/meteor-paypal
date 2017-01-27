# Meteor paypal
This package implements "**Will have**" all paypal payements methods.

> Simple button so far. Updates are coming !

## To install
From your Meteor project directory:
```sh
$ meteor add ie76:paypal-button
```
## Basic Usage

Simply add the lines below in your template:
```markdown
{{> iPaypalButton
    email="john.doe@domaine.com"
    name="An item name"
    returnUrl="/thankyou"
    cancelUrl="/"
    amount="9"
    currency="USD"
    text="Subscribe Now"
}}
```

## Collection

We have add `ipay` collection to mongo. You can use it to find records like :
``` javascript
ipay.find({txn_id: object.txn_id});
```

## Methods

There's two methods so far, `payementExist` and `handlePayement`.

```javascript
Meteor.methods({
    /*
     *  Check if paiement already exists
     *
     * @parm Number payementID
     * @return Boolean
     */
    payementExist: (payementID) => {
        check(payementID, Number);
        let finder = iPay.find({txn_id: payementID}).count();
        return (finder > 1) ? true : false;
    },
    /*
     *  Handle paypal process
     *
     * @param Object paypalReturn
     */
    handlePayement: (paypalReturn) => {

        /*
         *  Append userID to paypalReturn Object
         */
        paypalReturn.userID = this.userID;

        /*
         * Check if object exists
         *
         * @param Number txn_id
         * @return void
         */
        Meteor.call("payementExist", paypalReturn.txn_id, function(error, result){
            if(!result)
                iPay.insert(paypalReturn);
            else
                console.log(error);
        });
    },
});
```

## Credits
This package uses Open Source components. You can find the source code of their open source projects along with license information below. We acknowledge and are grateful to these developers for their contributions to open source.

* andzdroid : [PayPal IPN Verification](https://github.com/andzdroid/paypal-ipn)
* meteorhacks : [Picker - Server Side Router for Meteor](https://github.com/meteorhacks/picker)


License
----

MIT
