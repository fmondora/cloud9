/**
 * Code Editor for the Ajax.org Cloud IDE
 */
require.def("ext/browser/browser",
    ["core/ide", "core/ext", "text!ext/browser/browser.xml"],
    function(ide, ext, markup) {

return ext.register("ext/browser/browser", {
    name    : "Browser View",
    dev     : "Ajax.org",
    type    : ext.EDITOR,
    contentTypes : [
        "text/html",
        "application/xhtml+xml"
    ],
    markup  : markup,

    nodes : [],

    init : function(amlPage){
        this.brView = amlPage.appendChild(new apf.vbox({
            anchors    : "0 0 0 0",
            childNodes : [new apf.browser({
                src  : "{location.protocol + '//' + location.host + '/workspace/' + [@path]}",
                flex : 1
            })]
        }));

        //Append the button bar to the main toolbar
        var nodes = barBrowserTb.childNodes;
        for (var i = nodes.length - 1; i >= 0; i--) {
            this.nodes.push(ide.barTools.appendChild(nodes[0]));
        }
    },

    enable : function() {
        this.nodes.each(function(item){
            item.show();
        });
    },

    disable : function() {
        this.nodes.each(function(item){
            item.hide();
        });
    },

    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });

        if (this.brView)
            this.brView.destroy(true, true);
        barBrowserTb.destroy(true, true);

        this.nodes = [];
    }
});

});