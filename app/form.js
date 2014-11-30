define(['jquery'], function() {
    "use strict";

    function Form() {
        this.container = $("#form");
        this.input     = this.container.find('input[type=text]');
        this.button    = this.container.find('.button');

        this.input.on('keyup', $.proxy(this.validate, this));
        this.button.on('click', $.proxy(this.submit, this));
    };

    Form.prototype.open = function() {
        this.container.fadeIn(function() {
            $(document).trigger('form.open');
        });
    };

    Form.prototype.close = function() {
        this.container.fadeOut($.proxy(function() {
            $(document).trigger('form.close', [this.input.val()]);
        }, this));
    };

    Form.prototype.submit = function() {
        if (this.validate()) {
            this.close();
        }
    };

    Form.prototype.validate = function() {
        if (!this.input.val()) {
            this.container
                .find('.action.input')
                .addClass('error');

            this.button
                .removeClass('teal')
                .addClass('red');

            return false;
        }

        this.container
            .find('.action.input')
            .removeClass('error');

        this.button
            .removeClass('red')
            .addClass('teal');

        return true;
    };

    return Form;
});
