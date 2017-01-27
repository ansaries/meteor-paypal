Template.iPaypalButton.helpers({
    transactionType: function(type, eq){
        if(type == eq){
            return true;
        }
    },
    getUrl: function(){
        return (_.includes(window.location.origin, 'localhost')) ? 'https://07a592d4.ngrok.io' : window.location.origin;
    },
    getUser: function(){
        return Meteor.userId();
    }
});
