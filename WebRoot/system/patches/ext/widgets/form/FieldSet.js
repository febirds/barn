/**
*补丁
*/
Ext.override(Ext.form.FieldSet,{
    beforeDestroy : function(){//unset "this.checkbox" listener
        if (this.checkbox) {
            this.checkbox.un('click', this.onCheckClick, this);
        }
        Ext.form.FieldSet.superclass.beforeDestroy.call(this);
    }
});
