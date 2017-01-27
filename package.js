Package.describe({
    name: 'ie76:paypal-button',
    version: '0.1.0',
    summary: 'A simple paypal button using IPN and Picker',
    git: 'https://github.com/ie76/meteor-paypal',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.2.3');

    api.use('ecmascript');
    api.use('jquery');
    api.use('stevezhu:lodash@4.17.2');
    api.use(['blaze-html-templates@1.0.4'], 'client');
    api.use('mongo', ['client', 'server']);
    api.use(['meteorhacks:picker@1.0.3', 'check@1.2.4', ], 'server');

    Npm.depends({
       'paypal-ipn': '3.0.0'
    });


    api.add_files([
        'client/button/button-form.html',
        'client/button/button.js',
    ], 'client');
    api.add_files([
        'server/imports.js'
    ], 'server');

    api.mainModule('paypal-button.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('ie76:paypal-button');
    api.use('twbs:bootstrap');
});
