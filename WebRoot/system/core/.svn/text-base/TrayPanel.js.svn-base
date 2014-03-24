/**
 * 系统托盘 类
 */
MC.TrayPanel = Ext.extend(Ext.BoxComponent, {
	enableMenu: true,
	
	initComponent : function(){
        MC.TrayPanel.superclass.initComponent.call(this);
        
        this.on('resize', this.delegateUpdates);
        
        
        this.items = [];//var el = document.createElement('div');
        this.el=Ext.getBody().createChild({
        	cls:'ux-tray-panel',
        	tag:'div',
        	id:this.id
		});
        this.stripWrap = this.el.createChild({
        	cls: 'ux-quickstart-strip-wrap',
        	cn: {tag:'ul', cls:'ux-quickstart-strip'}
		});
		
        this.stripSpacer = this.el.createChild({
        	cls:'ux-quickstart-strip-spacer'
        });
        
        this.strip = new Ext.Element(this.stripWrap.dom.firstChild);
        
        this.edge = this.strip.createChild({
        	tag:'li',
        	cls:'ux-quickstart-edge'
        });
        
        this.strip.createChild({
        	cls:'x-clear'
        });
	},
	
	add : function(config){
		var li = this.strip.createChild({tag:'li'}, this.edge); 
        
		var btn = new Ext.Button(Ext.apply(config, {
			//cls:'x-btn-icon',
			menuText: config.text,
			renderTo: li
			//text: '' 
		}));
        
		this.items.push(btn);
		
		this.delegateUpdates();
		
		return btn;
	},
	
	remove : function(btn){
		var li = document.getElementById(btn.container.id);
		btn.destroy();
		li.parentNode.removeChild(li);
		
		var s = [];
		for(var i = 0, len = this.items.length; i < len; i++) {
			if(this.items[i] != btn){
				s.push(this.items[i]);
			}
		}
		this.items = s;
		
		this.delegateUpdates();
	},

	delegateUpdates : function(){
        if(this.enableMenu && this.rendered){
        	//this.showButtons();
        	//this.clearMenu();
            //this.autoMenu();
        }
    },
    
    showButtons : function(){
    	var count = this.items.length;
    	
    	for(var i = 0; i < count; i++){
			this.items[i].show(); 	
		}
    }

});