/**
 * 任务按钮 类
 */
MC.TaskButton = function(win,el){
	this.win = win;
	
    MC.TaskButton.superclass.constructor.call(this, {
        iconCls: win.iconCls,
        text: Ext.util.Format.ellipsis(win.title, 12),
        tooltip: win.taskbuttonTooltip || win.title,
        renderTo: el,
        handler : function(){
            if(win.minimized || win.hidden){
                win.show();
            }else if(win == win.manager.getActive()){
                win.minimize();
            }else{
                win.toFront();
            }
        },
        clickEvent:'mousedown'
    });
};

Ext.extend(MC.TaskButton, Ext.Button, {
    onRender : function(){
        MC.TaskButton.superclass.onRender.apply(this, arguments);

        this.cmenu = new Ext.menu.Menu({
            items: [{
            	id: 'restore',
                text: '还原窗口',
                handler: function(){
                    if(!this.win.isVisible()){
                        this.win.show();
                    }else{
                        this.win.restore();
                    }
                },
                scope: this
            },{
                id: 'minimize',
                text: '最小化',
                handler: this.win.minimize,
                scope: this.win
            },{
                id: 'maximize',
                text: '最大化',
                handler: this.win.maximize,
                scope: this.win
            }, '-', {
                id: 'close',
                text: '关闭',
                handler: this.closeWin.createDelegate(this, this.win, true),
                scope: this.win
            }]
        });

        this.cmenu.on('beforeshow', function(){
            var items = this.cmenu.items.items;
            var w = this.win;
            items[0].setDisabled(w.maximized !== true && w.hidden !== true);
            items[1].setDisabled(w.minimized === true);
            items[2].setDisabled(w.maximized === true || w.hidden === true);
			//items[2].setDisabled(w.maximizable === false);
			items[3].setDisabled(w.closable === false);
        }, this);

        this.el.on('contextmenu', function(e){
        	e.stopEvent();
            if(!this.cmenu.el){
                this.cmenu.render();
            }
            var xy = e.getXY();
            xy[1] -= this.cmenu.el.getHeight();
            this.cmenu.showAt(xy);
        }, this);
    },
    
    closeWin : function(cMenu, e, win){
		if(!win.isVisible()){
			win.show();
		}else{
			win.restore();
		}
		win.close();
	},
	
	
    setText : function(text){
		if(text){
			this.text = text;
			if(this.el){
				this.el.child("td.x-btn-center " + this.buttonSelector).update(Ext.util.Format.ellipsis(text, 12));
			}
		}
    },
    
   
    setTooltip : function(text){
    	if(text){
    		this.tooltip = text;
        	var btnEl = this.el.child(this.buttonSelector);
        	Ext.QuickTips.unregister(btnEl.id);
        	
            if(typeof this.tooltip == 'object'){                
                Ext.QuickTips.register(Ext.apply({
                      target: btnEl.id
                }, this.tooltip));
            } else {
            	btnEl.dom[this.tooltipType] = this.tooltip;
            }
        }
    }
});
