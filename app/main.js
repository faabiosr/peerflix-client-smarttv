define(['app/player', 'app/form', 'jquery'], function(Player, Form) {
    "use strict";

    function Main() {
        this.player = new Player();
        this.form   = new Form();
    };

    Main.prototype.init = function() {
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
