Package.describe({
    name: 'ie76:paypal-button',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.2.3');
    api.use('ecmascript');
    api.mainModule('paypal-button.js');
    api.use(['templating'], 'client');

    api.add_files([
        'client/button/button-form.html',
    ], 'client');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('ie76:paypal-button');
    api.use('twbs:bootstrap');
});
