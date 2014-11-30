
define(['video-js/video'], function() {
    "use strict";

    function Video(id){
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

        this.video  = videojs(id, this.options);
    };

    Video.prototype.play = function() {
        this.video.play();
    };

    Video.prototype.stop = function() {
        this.video
            .pause()
            .currentTime(0);

        return this;
    };

    Video.prototype.pause = function() {
        if (this.video.paused()) {
            this.video.play();
            return;
        }

        this.video.pause();
    };

    Video.prototype.src = function(source) {
        this.video.src(source);
        return this;
    };

    return Video;
});
