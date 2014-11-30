define(['app/player', 'jquery'], function(Player) {
    "use strict";

    function Main() {
        this.formContent     = $('#client');
        this.inputField      = this.formContent.find('input[type=text]');
        this.sendButton      = this.formContent.find('.button');
        this.player = new Player('#player');
    };

    Main.prototype.init = function() {
        this.sendButton.on('click', $.proxy(this.open, this));
        this.inputField.on('keyup', $.proxy(this.validate, this));

        $(document).on('player.close', $.proxy(function() {
            this.formContent.fadeIn();
        }, this));
    };

    Main.prototype.open = function(){
        if (!this.validate()) {
            return;
        }

        this.formContent.fadeOut($.proxy(function() {
            this.player
                .setSource(this.inputField.val())
                .open();
        }, this));
    };

    Main.prototype.validate = function() {
        if (!this.inputField.val()) {
            this.formContent
                .find('.input')
                .addClass('error');

            this.sendButton
                .removeClass('teal')
                .addClass('red');

            return false;
        }

        this.formContent
            .find('.input')
            .removeClass('error');

        this.sendButton
            .removeClass('red')
            .addClass('teal');

        return true;
    };

    return Main;
});
