/*
 * 桌面图标 类
 */
Ext.ns("MC");
MC.Shortcuts = function(config){
	var desktopEl = Ext.get(config.renderTo)
		, taskbarEl = config.taskbarEl
		, btnHeight = 74
		, btnWidth = 64
		, btnPadding = 15
		, col = null
		, row = null
		, items = [];
	
	initColRow();
	
	function initColRow(){
		col = {index: 1, x: btnPadding};
		row = {index: 1, y: btnPadding};
	}
	
	function isOverflow(y){
		if(y > (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight())){
			return true;
		}
		return false;
	}
	
	this.addShortcut = function(config){
		var div = desktopEl.createChild({tag:'div', cls: 'ux-shortcut-item'});
		var	btn = new MC.ShortcutButton(Ext.apply(config, {
				text: Ext.util.Format.ellipsis(config.text, 16)
			}), div);
		
		//btn.container.initDD('DesktopShortcuts');
		
		items.push(btn);
		this.setXY(btn.container);
		
		return btn;
	};
	this.getItemById = function(id){
		for(var i=0,len=items.length;i<len;i++)
		{
			if(id==items[i].appId)
			{
				return items[i];
			}
		}
	};
	this.removeShortcut = function(b){
		var d = document.getElementById(b.container.id);
		
		b.destroy();
		d.parentNode.removeChild(d);
		
		var s = [];
		for(var i = 0, len = items.length; i < len; i++){
			if(items[i] != b){
				s.push(items[i]);
			}
		}
		items = s;
		
		this.handleUpdate();
	}
	
	this.handleUpdate = function(){
		initColRow();
		for(var i = 0, len = items.length; i < len; i++){
			this.setXY(items[i].container);
		}
	}
	
	this.setXY = function(item){
		var bottom = row.y + btnHeight,
			overflow = isOverflow(row.y + btnHeight);
		
		if(overflow && bottom > (btnHeight + btnPadding)){
			col = {
				index: col.index++
				, x: col.x + btnWidth + btnPadding
			};
			row = {
				index: 1
				, y: btnPadding
			};
		}
		
		item.setXY([
			col.x
			, row.y
		]);
		
		row.index++;
		row.y = row.y + btnHeight + btnPadding;
	};
	
	Ext.EventManager.onWindowResize(this.handleUpdate, this, {delay:500});
};




MC.ShortcutButton = function(config, el){
	
    MC.ShortcutButton.superclass.constructor.call(this, Ext.apply(config, {
        renderTo: el,
        //clickEvent: 'dblclick',
		template: new Ext.Template(
			'<div class="ux-shortcut-btn"><div>',
				'<img src="'+Ext.BLANK_IMAGE_URL+'" />',
				'<div class="ux-shortcut-btn-text">{0}</div>',
			'</div></div>')
    }));
    
};

Ext.extend(MC.ShortcutButton, Ext.Button, {

	buttonSelector : 'div:first',
	
    onRender : function(){
        MC.ShortcutButton.superclass.onRender.apply(this, arguments);

        this.cmenu = new Ext.menu.Menu({
            items: [{
                id: 'open',
                text: '打开',
                handler: this.handler,
                scope: this
            }, '-', {
                id: 'remove',
                iconCls: 'remove',
                text: '删除快捷方式',
                handler: function(){
                	system.desktop.removeShortcut(this.appId);
                },
                //handler: this.closeWin.createDelegate(this, this.win, true),
                scope: this
            }]
        });

        this.el.on('contextmenu', function(e){
        	e.stopEvent();
            if(!this.cmenu.el){
                this.cmenu.render();
            }
            var xy = e.getXY();
            //xy[1] -= this.cmenu.el.getHeight();
            this.cmenu.showAt(xy);
        }, this);
    }, 
    
    initButtonEl : function(btn, btnEl){
    	MC.ShortcutButton.superclass.initButtonEl.apply(this, arguments);
    	
    	btn.removeClass("x-btn");
    	
    	if(this.iconCls){
            if(!this.cls){
                btn.removeClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
            }
        }
    },
    
    autoWidth : function(){

    },
	

    setText : function(text){
        this.text = text;
        if(this.el){
        	this.el.child("div.ux-shortcut-btn-text").update(text);
        }
    }
});