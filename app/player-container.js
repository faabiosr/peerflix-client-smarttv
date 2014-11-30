define(['app/player', 'jquery', 'keymaster'], function(Player) {

    function PlayerContainer(container) {
        this.container = $(container);
        this.player = new Player('video-player');

        key('ctrl+x', 'player-container', $.proxy(this.close, this));
    };

    PlayerContainer.prototype.open = function() {
        key.setScope('player-container');

        this.container.fadeIn($.proxy(function(){
            $(document).trigger('playercontainer.open');
            this.player.play();
        }, this));
    };

    PlayerContainer.prototype.close = function() {
        key.deleteScope('player-container');

        this.player.pause();

        this.container.fadeOut(function() {
            $(document).trigger('playercontainer.close');
        });
    }

    return PlayerContainer;
});
