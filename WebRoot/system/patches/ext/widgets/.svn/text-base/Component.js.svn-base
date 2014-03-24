/**
*Ext.Component补丁
*/
Ext.override(Ext.Component,{
	    // default function is not really useful
    onRender : function(ct, position){
        if(this.autoEl){
            if(typeof this.autoEl == 'string'){
                this.el = document.createElement(this.autoEl);
            }else{
                var div = document.createElement('div');
                Ext.DomHelper.overwrite(div, this.autoEl);
                this.el = div.firstChild;
                this._parentDivForAutoEl = div; //for destroy 
            }
            if (!this.el.id) {
            	this.el.id = this.getId();
            }
        }
        if(this.el){
            this.el = Ext.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
	            if (this._parentDivForAutoEl) {//remove the parent div for autoEl
	                Ext.removeNode(this._parentDivForAutoEl);
	                delete this._parentDivForAutoEl;
	            }
            }
            if(this.overCls) {
                this.el.addClassOnOver(this.overCls);
            }
        }
    },
	   destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.beforeDestroy();
            if(this.rendered && !Ext.isIE){//if is ie then do this follow! 
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Ext.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
            this.purgeListeners();
            if(this.rendered && Ext.isIE){//if is ie, do this after all be done, because the "this.el.remove()" will delete el and el's children in "Ext.removeNode", so child component can't get right element by element's id ("document.getElementById()" can't find element). in ie do "this.el.remove()" after onDestroy.
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            if (this._parentDivForAutoEl) {//remove the parent div for autoEl
                Ext.removeNode(this._parentDivForAutoEl);
                this._parentDivForAutoEl = null;
            }
        }
    }
});
