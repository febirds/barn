/**
 * 快速启动按钮面板 类
 */
MC.QuickStartPanel = Ext.extend(Ext.BoxComponent, {
	enableMenu: true,
	
	initComponent : function(){
        MC.QuickStartPanel.superclass.initComponent.call(this);
        
        this.on('resize', this.delegateUpdates);
        
        this.menu = new Ext.menu.Menu();
        
        this.items = [];
        this.el=Ext.getBody().createChild({
        	tag:'div',
        	cls: 'ux-quickstart-panel',
        	id:this.id
		});
        
        
        this.stripWrap = Ext.get(this.el).createChild({
        	cls: 'ux-quickstart-strip-wrap',
        	cn: {tag:'ul', cls:'ux-quickstart-strip'}
		});
		
        this.stripSpacer = Ext.get(this.el).createChild({
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
	getItemById :function(id){
		for(var i=0,len=this.items.length;i<len;i++)
		{
			if(id==this.items[i].appId)
			{
				return this.items[i];
			}
		}
	},
	add : function(config){
		var li = this.strip.createChild({tag:'li'}, this.edge); // insert before the edge
        
		var btn = new Ext.Button(Ext.apply(config, {
			cls:'x-btn-icon',
			menuText: config.text,
			renderTo: li,
			text: '' // do not display text
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
	
	menuAdd : function(config){
		this.menu.add(config);
	},
	
	delegateUpdates : function(){
        if(this.enableMenu && this.rendered){
        	this.showButtons();
        	this.clearMenu();
            this.autoMenu();
            
        }
    },
    
    showButtons : function(){
    	var count = this.items.length;
    	
    	for(var i = 0; i < count; i++){
			this.items[i].show(); 	
		}
    },
    
    clearMenu : function(){
    	
    	this.menu.removeAll();
    },
	
	autoMenu : function(){
    	var count = this.items.length;
        var ow = this.el.dom.offsetWidth;
        var tw = this.el.dom.clientWidth;
        
        var wrap = this.stripWrap;
        var cw = wrap.dom.offsetWidth;
       	var l = this.edge.getOffsetsTo(this.stripWrap)[0];
       
        if(!this.enableMenu || count < 1 || cw < 20){ 
            return;
        }
        
        wrap.setWidth(tw);
        
        if(l <= tw){
            if(this.showingMenu){
                this.showingMenu = false;
                this.menuButton.hide();
            }
        }else{
        	tw -= wrap.getMargins('lr');
            
            wrap.setWidth(tw > 20 ? tw : 20);
            
            if(!this.showingMenu){
                if(!this.menuButton){
                    this.createMenuButton();
                }else{
                    this.menuButton.show();
                }
            }
            
            var mo = this.getMenuButtonPos();
            
            for(var i = count-1; i >= 0; i--){
            	var bo = this.items[i].el.dom.offsetLeft + this.items[i].el.dom.offsetWidth;
            	
            	if(bo > mo){
            		this.items[i].hide();

            		var ic = this.items[i].initialConfig,
            			config = {
            				appId:ic.appId,
	            			iconCls: ic.iconCls,
	            			handler: ic.handler,
	            			scope: ic.scope,
	            			text: ic.menuText
	            		};
            		
            		this.menuAdd(config);
            	}else{
            		this.items[i].show();
            	}
            }
            
            this.showingMenu = true;
        }
    },
    
    createMenuButton : function(){
    	
       	var h = this.el.dom.offsetHeight;

        var mb = this.el.insertFirst({
            cls:'ux-quickstart-menubutton-wrap'
        });
        
        mb.setHeight(h);
        
        var btn = new Ext.Button({
        	cls:'x-btn-icon',
        	id: 'ux-quickstart-menubutton',
        	menu: this.menu,
        	renderTo: mb
        });
        
        mb.setWidth(Ext.get('ux-quickstart-menubutton').getWidth());
        
        this.menuButton = mb;
    },
    
    getMenuButtonPos : function(){
    	return this.menuButton.dom.offsetLeft;
    }
});