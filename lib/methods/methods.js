Meteor.methods({
    /*
     *  Check if paiement already exists
     *
     * @parm Number payementID
     * @return Boolean
     */
    payementExist: function (payementID){
        check(payementID, Number);

        let finder = iPay.find({txn_id: payementID}).count();

        return (finder > 1) ? true : false;
    },
    /*
     *  Handle paypal process
     *
     * @param Object paypalReturn
     */
    handlePayement: function(paypalReturn){
        /*
         *  Append userID to paypalReturn Object
         */
        paypalReturn.userID = paypalReturn.custom;

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
