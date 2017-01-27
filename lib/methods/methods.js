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
