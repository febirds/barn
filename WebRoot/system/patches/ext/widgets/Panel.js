/**
*补丁
*/
Ext.override(Ext.Panel,{
    addTool : function(){
        if(!this[this.toolTarget]) { // no where to render tools!
            return;
        }
        if(!this.toolTemplate){
            // initialize the global tool template on first use
            var tt = new Ext.Template(
                 '<div class="x-tool x-tool-{id}">&#160;</div>'
            );
            tt.disableFormats = true;
            tt.compile();
            Ext.Panel.prototype.toolTemplate = tt;
        }
        for(var i = 0, a = arguments, len = a.length; i < len; i++) {
            var tc = a[i], overCls = 'x-tool-'+tc.id+'-over';
            if (!this.tools[tc.id]) {//prevent build same id tool
	            var t = this.toolTemplate.insertFirst((tc.align !== 'left') ? this[this.toolTarget] : this[this.toolTarget].child('span'), tc, true);
	            this.tools[tc.id] = t;
	            t.enableDisplayMode('block');
	            t.on('click', this.createToolHandler(t, tc, overCls, this));
	            if(tc.on){
	                t.on(tc.on);
	            }
	            if(tc.hidden){
	                t.hide();
	            }
	            if(tc.qtip){
	                if(typeof tc.qtip == 'object'){
	                    Ext.QuickTips.register(Ext.apply({
	                          target: t.id
	                    }, tc.qtip));
	                } else {
	                    t.dom.qtip = tc.qtip;
	                }
	            }
	            t.addClassOnOver(overCls);
	        }
        }
    },
    beforeDestroy : function(){
        if(this.header) {//remove header's listeners.
            this.header.removeAllListeners();
            if (this.headerAsText){
                Ext.Element.uncache(this.header.child('span'));
            }
        }
        Ext.Element.uncache(
            this.header,
            this.tbar,
            this.bbar,
            this.footer,
            this.body
            ,this.bwrap
        );
        if(this.tools){
            for(var k in this.tools){
                Ext.destroy(this.tools[k]);
            }
        }
        if(this.buttons){
            for(var b in this.buttons){
                Ext.destroy(this.buttons[b]);
            }
        }
        Ext.destroy(
            this.topToolbar,
            this.bottomToolbar
        );
        Ext.Panel.superclass.beforeDestroy.call(this);
    }
});
