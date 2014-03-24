/**
*Ext.PagingToolbar补丁
*/
Ext.override(Ext.PagingToolbar,{
    onDestroy : function(){//unbind store when destroy
        if (this.store) {this.unbind(this.store);}
        Ext.PagingToolbar.superclass.onDestroy.call(this);
    },
    reset : function(){
    	this.afterTextEl.el.innerHTML = String.format(this.afterPageText, 1);
    	this.displayEl.update("");
        this.field.dom.value = 1;
        this.first.setDisabled(true);
        this.prev.setDisabled(true);
        this.next.setDisabled(true);
        this.last.setDisabled(true);
    }
});
