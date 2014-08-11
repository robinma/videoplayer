    var videPlayerObj = new videoPlayer();

    return function(playerId, params) {
        return videPlayerObj.add(playerId, params);
    };
});