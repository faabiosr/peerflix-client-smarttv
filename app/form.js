define(['smarttv'], function(SmartTv) {
    "use strict";

    function Form() {
        this.container = $("#form");
        this.input     = this.container.find('input[type=text]');
        this.button    = this.container.find('.button');
        this.smartTv   = new SmartTv();
        this.tvKey     = this.smartTv.tvKey;

        this.input.on('keyup', $.proxy(this.validate, this));
        this.button.on('click', $.proxy(this.submit, this));

        this.button.on('focus', function(){
            $(this).removeClass('teal red')
                   .addClass('purple');
        });

        this.button.on('blur', function() {
            $(this).removeClass('purple red')
                   .addClass('teal');
        });

        this.button.on('keydown', $.proxy(function(e){
            if (e.keyCode == this.tvKey.KEY_ENTER) {
                $(this).trigger('click');
            }
        }, this));

        $(document).on('keydown', $.proxy(function(e) {
            if (e.keyCode == this.tvKey.KEY_ENTER && !this.button.is(':focus')) {
                e.preventDefault();
                this.input.focus();
            }

            if ((e.keyCode == this.tvKey.KEY_LEFT || e.keyCode == this.tvKey.KEY_RIGHT) && this.button.is(':focus')) {
                this.input.focus();
            }
        }, this));

        this.ime = this.smartTv.ime(this.input.attr('id'), $.proxy(function(obj) {
            this.ime.setKeyFunc(this.tvKey.KEY_RETURN, $.proxy(function(keyCode){
                this.input.blur();
            }, this));

            this.ime.setKeyFunc(this.tvKey.KEY_EXIT, $.proxy(function(keyCode){
                this.button.focus();
            }, this));
        }, this));
    };

    Form.prototype.open = function() {
        this.container.fadeIn(function() {
            $(document).trigger('form.open');
        });
    };

    Form.prototype.close = function() {
        this.container.fadeOut($.proxy(function() {
            this.button.blur();
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
