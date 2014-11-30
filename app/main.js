define(['app/player-container', 'jquery'], function(PlayerContainer) {
    "use strict";

    function Main() {
        this.formContent     = $('#client');
        this.inputField      = this.formContent.find('input[type=text]');
        this.sendButton      = this.formContent.find('.button');
        this.playerContainer = new PlayerContainer('#player');
    };

    Main.prototype.init = function() {
        this.sendButton.on('click', $.proxy(this.open, this));
        this.inputField.on('keyup', $.proxy(this.validate, this));

        $(document).on('playercontainer.close', $.proxy(function() {
            this.formContent.fadeIn();
        }, this));
    };

    Main.prototype.open = function(){
        if (!this.validate()) {
            return;
        }

        this.formContent.fadeOut($.proxy(function() {
            this.playerContainer.player.src(this.inputField.val());
            this.playerContainer.open();
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
