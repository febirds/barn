/**
*补丁
*/
Ext.override(Ext.Resizable,{
    destroy : function(removeEl){
        this.proxy.removeAllListeners();//remove "this.proxy" all listeners for destroy
        this.proxy.remove();
        if(this.overlay){
            this.overlay.removeAllListeners();
            this.overlay.remove();
        }
        var ps = Ext.Resizable.positions;
        for(var k in ps){
            if(typeof ps[k] != "function" && this[ps[k]]){
                var h = this[ps[k]];
                h.el.removeAllListeners();
                h.el.remove();
            }
        }
        if(removeEl){
            this.el.update("");
            this.el.remove();
        }
    }
});
