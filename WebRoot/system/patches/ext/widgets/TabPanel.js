/**
*补丁
*/
Ext.override(Ext.TabPanel,{
      beforeDestroy : function() {
        if (this.items) {
            this.items.each(function(item) {
                if (item && item.itemTabStrip) {
                    Ext.get(item.itemTabStrip).removeAllListeners();
                    item.itemTabStrip = null;
                }
            }, this);
        }
        if (this.strip) {
            this.strip.removeAllListeners();
        }

        Ext.TabPanel.superclass.beforeDestroy.apply(this);
        
    }
});
