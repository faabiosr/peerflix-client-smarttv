define(['app/video', 'smarttv', 'jquery'], function(Video, SmartTv) {
    "use strict";

    var video = new Video('video-player');

    function Player() {
        this.container = $('#player');
        this.smartTv   = new SmartTv();
        this.tvKey     = this.smartTv.tvKey;

        $(document).on('keydown', $.proxy(function(e) {
            if (!this.container.is(':visible')) {
                return;
            }

            if (e.keyCode == this.tvKey.KEY_PLAY) {
                e.preventDefault();
                video.play();
            }

            if (e.keyCode == this.tvKey.KEY_PAUSE) {
                e.preventDefault();
                video.pause();
            }

            if (e.keyCode == this.tvKey.KEY_STOP) {
                e.preventDefault();
                video.pause();
            }

            if (e.keyCode == this.tvKey.KEY_RETURN) {
                e.preventDefault();
                this.close();
            }
        }, this));
    };

    Player.prototype.open = function() {
        this.container.fadeIn($.proxy(function(){
            $(document).trigger('player.open');
            video.play();
        }, this));
    };

    Player.prototype.close = function() {
        video.pause();

        this.container.fadeOut(function() {
            $(document).trigger('player.close');
        });
    };

    Player.prototype.setSource = function(source) {
        video.src(source);
        return this;
    };

    return Player;
});
