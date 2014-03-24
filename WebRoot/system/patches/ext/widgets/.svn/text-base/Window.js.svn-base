/**
*补丁
*/
Ext.override(Ext.Window,{
    beforeDestroy : function(){
        this.hide();//do hide before destroy
        Ext.destroy(
            this.focusEl,//destroy this.focusEl
            this.resizer,
            this.dd,
            this.proxy,
            this.mask
        );
        Ext.Window.superclass.beforeDestroy.call(this);
    }
});
