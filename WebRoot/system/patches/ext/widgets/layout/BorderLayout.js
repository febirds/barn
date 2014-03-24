/**
*Ext.layout.BorderLayout补丁
*/
Ext.override(Ext.layout.BorderLayout,{
    destroy: function() {
        var r = ['north', 'south', 'east', 'west'];
        for (var i = 0; i < r.length; i++) {
            var region = this[r[i]];
            if (region) {//if find region's destroy, then run it first. for example, Ext.layout.BorderLayout.SplitRegion.destroy.
                if (region.destroy) {
                    region.destroy();
                } else if (region.split) {
                    region.split.destroy(true);
                }
            }
        }
        Ext.layout.BorderLayout.superclass.destroy.call(this);
    }
});

Ext.override(Ext.layout.BorderLayout.SplitRegion,{
	destroy : function() {
        Ext.destroy(this.miniSplitEl, this.split, this.splitEl);
    }
});
