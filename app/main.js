define(['app/player', 'app/form', 'smarttv'], function(Player, Form) {
    "use strict";

    function Main() {
        this.player = new Player();
        this.form   = new Form();
    };

    Main.prototype.init = function() {
        (new (require('smarttv'))).widget.sendReadyEvent();

        $(document).on('player.close', $.proxy(function() {
            this.form.open();
        }, this));

        $(document).on('form.close', $.proxy(function(e, url) {
            this.player
                .setSource(url)
                .open();
        }, this));
    }

    return Main;
});
