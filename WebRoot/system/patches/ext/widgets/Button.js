/**
*补丁
*/
Ext.override(Ext.Button,{
        initButtonEl : function(btn, btnEl){

        this.el = btn;
        if(this.id){//element's id must be assigned before add listeners, otherwise removeAllListeners can't remove these listeners, because element's id not same between "on()" and "removeAllListeners()".
            Ext.Element.uncache(this.el);
            this.el.dom.id = this.el.id = this.id;
        }
				// move
        btn.addClass("x-btn");

        if(this.icon){
            btnEl.setStyle('background-image', 'url(' +this.icon +')');
        }
        if(this.iconCls){
            btnEl.addClass(this.iconCls);
            if(!this.cls){
                btn.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
            }
        }
        if(this.tabIndex !== undefined){
            btnEl.dom.tabIndex = this.tabIndex;
        }
        if(this.tooltip){
            if(typeof this.tooltip == 'object'){
                Ext.QuickTips.register(Ext.apply({
                      target: btnEl.id
                }, this.tooltip));
            } else {
                btnEl.dom[this.tooltipType] = this.tooltip;
            }
        }
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(this.handleMouseEvents){
            btn.on("mouseover", this.onMouseOver, this);
            // new functionality for monitoring on the document level
            //btn.on("mouseout", this.onMouseOut, this);
            btn.on("mousedown", this.onMouseDown, this);
        }
        if(this.menu){
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }

				/* //move ahead //id  must be changed before add listeners
				        if(this.id){
				            this.el.dom.id = this.el.id = this.id;
				        }
				*/
        if(this.repeat){
            var repeater = new Ext.util.ClickRepeater(btn,
                typeof this.repeat == "object" ? this.repeat : {}
            );
            repeater.on("click", this.onClick,  this);
        }
        btn.on(this.clickEvent, this.onClick, this);
    },
    beforeDestroy: function(){
    	if(this.rendered){
	        var btn = this.el.child(this.buttonSelector);
	        if(btn){
                if(this.tooltip){//do unregister quicktips, reduce quicktip targets's size
                    if(typeof this.tooltip == 'object'){
                        Ext.QuickTips.unregister(btn);
                    }
                }
	            btn.removeAllListeners();
	        }
	    }
        if(this.menu){
            Ext.destroy(this.menu);
        }
    }
});
