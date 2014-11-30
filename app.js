
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    },
    jquery: 'jquery'
});

requirejs(['app/main'], function(Main) {
    var app = new Main();
    app.init();
});
