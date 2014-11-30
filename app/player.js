define(['app/video', 'jquery', 'keymaster'], function(Video) {
    "use strict";

    var video = new Video('video-player');

    function Player() {
        this.container = $('#player');

        key('ctrl+x', 'player', $.proxy(this.close, this));
    };

    Player.prototype.open = function() {
        key.setScope('player');

        this.container.fadeIn($.proxy(function(){
            $(document).trigger('player.open');
            video.play();
        }, this));
    };

    Player.prototype.close = function() {
        key.deleteScope('player');

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
