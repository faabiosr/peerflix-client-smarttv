
define(['video-js/video'], function() {
    "use strict";

    function Player(id){
        this.options = {
            children: {
                controlBar: {
                    children: {
                        fullscreenToggle: false,
                        muteToggle: false,
                        volumeControl: false
                    }
                }
            }
        };

        this.player  = videojs(id, this.options);
    };

    Player.prototype.play = function() {
        this.player.play();
    };

    Player.prototype.stop = function() {
        this.player
            .pause()
            .currentTime(0);

        return this;
    };

    Player.prototype.pause = function() {
        if (this.player.paused()) {
            this.player.play();
            return;
        }

        this.player.pause();
    };

    Player.prototype.src = function(source) {
        this.player.src(source);
        return this;
    };

    return Player;
});
