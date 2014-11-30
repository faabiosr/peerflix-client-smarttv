
define(['app/player', 'jquery'], function(Player) {
    "use strict";

    function Main() {
        this.formContent     = $('#client');
        this.inputField      = this.formContent.find('input[type=text]');
        this.sendButton      = this.formContent.find('.button');
        this.playerContainer = $('#player');
        this.player          = new Player('video-player');
    };

    Main.prototype.init = function() {
        this.sendButton.on('click', $.proxy(this.open, this));

        this.inputField.on('keyup', $.proxy(this.validate, this));
    };

    Main.prototype.open = function(){
        if (!this.validate()) {
            return;
        }

        this.formContent.fadeOut($.proxy(this.closeForm, this));
    }

    Main.prototype.closeForm = function() {
        this.playerContainer.fadeIn($.proxy(this.openPlayer, this));
    }

    Main.prototype.openPlayer = function() {
        this.player
            .src(this.inputField.val())
            .play();
    }

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
