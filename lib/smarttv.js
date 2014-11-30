define(function (){
    "use strict";

    function SmartTv() {
        this.widget = new Common.API.Widget();
        this.tvKey = new Common.API.TVKeyValue();
    };

    SmartTv.prototype.ime = function(inputId, callback) {
        return new IMEShell(inputId, callback);
    };

    return SmartTv;
});
