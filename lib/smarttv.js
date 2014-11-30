define(function (){
    "use strict";

    function SmartTv() {
        this.widget = new Common.API.Widget();
        this.tvKey = new Common.API.TVKeyValue();
    };

    return SmartTv;
});
