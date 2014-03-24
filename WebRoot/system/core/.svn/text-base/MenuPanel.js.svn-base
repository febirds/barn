/**
 * 菜单面板 类
 */
MC.MenuPanel = function(config){
    if(Ext.isArray(config)){
        config = {buttons:config};
    }
    Ext.ux.MenuPanel.superclass.constructor.call(this, config);
};

MC.MenuPanel = Ext.extend(Ext.BoxComponent, {
	activeButton: null,
	enableScroll: true,
	scrollIncrement: 0,
  scrollRepeatInterval: 400,
  scrollDuration: .35,
  animScroll: true,
  resizeButtons: true,
  buttonWidth: 60,
  minButtonWidth: 60,
  buttonMargin: 2,
  buttonWidthSet: false,
	
	
	trackMenus : true,
	

	
	
	initComponent : function() {
        MC.MenuPanel.superclass.initComponent.call(this);
        if(this.items){
            this.buttons = this.items;
        }
        this.items = new Ext.util.MixedCollection(false, function(o){
            return o.itemId || o.id || Ext.id();
          });
        this.on('resize', this.delegateUpdates);
	},
	onRender : function(ct, position){
				this.el = ct.createChild(Ext.apply({ id: this.id },this.autoCreate), position);
				//this.el.addClass('uxx-menutoolbar-panel');
        this.stripWrap = this.el.createChild({
        	cls: 'ux-menutoolbar-strip-wrap',/*x-toolbar x-small-editor*/
        	cn: {
            	tag:'ul', cls:'ux-menutoolbar-strip'
            }
		});
				
				
        this.stripSpacer = this.el.createChild({
        	cls:'ux-menutoolbar-strip-spacer'
        });
        this.strip = new Ext.Element(this.stripWrap.dom.firstChild);
        
        this.tr = this.strip;
        
        this.edge = this.strip.createChild({
        	tag:'li',
        	cls:'ux-menutoolbar-edge'
        });
        this.strip.createChild({
        	cls:'x-clear'
        });
        
    },
    
   autoCreate: {
       cls:'ux-menutoolbar-panel'

    },
   
     
    afterRender : function(){
        MC.MenuPanel.superclass.afterRender.call(this);
        if(this.buttons){
            this.add.apply(this, this.buttons);
            delete this.buttons;
        }
    },

	setActiveButton : function(btn){
		
		if(!this.buttonWidthSet){
			this.lastButtonWidth = btn.container.getWidth();
		}
		
		this.scrollPosButton = btn;
		this.delegateUpdates();
	},
	
	delegateUpdates : function(){
		/*if(this.suspendUpdates){
            return;
        }*/
        if(this.resizeButtons && this.rendered){
            this.autoSize();
        }
        if(this.enableScroll && this.rendered){
            this.autoScroll();
        }
    },
    
    autoSize : function(){
    		//if(this.buttonWidth!=50)
    		//{
		        var count = this.items.length;
		        var ow = this.el.dom.offsetWidth;
		        var aw = this.el.dom.clientWidth;
		        if(!this.resizeButtons || count < 1 || !aw){ 
		            return;
		        }
		        
		        var each = Math.max(Math.min(Math.floor((aw-4) / count) - this.buttonMargin, this.buttonWidth), this.minButtonWidth); // -4 是因为在 IE中的float errors
		
		        var btns = this.stripWrap.dom.getElementsByTagName('button');
		
		        this.lastButtonWidth = Ext.get(btns[0].id).findParent('li').offsetWidth;
		       
		        for(var i = 0, len = btns.length; i < len; i++) {            
		            var btn = btns[i];
		            
		            var tw = Ext.get(btns[i].id).findParent('li').offsetWidth;
		            var iw = btn.offsetWidth;
		            
		            btn.style.width = (each - (tw-iw)) + 'px';
		        }
      	//}
    },
    
    autoScroll : function(){
    	var count = this.items.length;
        var ow = this.el.dom.offsetWidth;
        var tw = this.el.dom.clientWidth;
        
        var wrap = this.stripWrap;
        var cw = wrap.dom.offsetWidth;
        var pos = this.getScrollPos();
        var l = this.edge.getOffsetsTo(this.stripWrap)[0] + pos;
        
        if(!this.enableScroll || count < 1 || cw < 20){ 
            return;
        }
        
        wrap.setWidth(tw); // 移动到这里是因为浏览器 Safari
        if(l <= tw){
        	
            wrap.dom.scrollLeft = 0;
            //wrap.setWidth(tw); 移动从这里是因为浏览器 Safari
            if(this.scrolling){
                this.scrolling = false;
                this.el.removeClass('x-menutoolbar-scrolling');
                this.scrollLeft.hide();
                this.scrollRight.hide();
            }
        }else{
            if(!this.scrolling){
                this.el.addClass('x-menutoolbar-scrolling');
            }
            tw -= wrap.getMargins('lr');
            wrap.setWidth(tw > 20 ? tw : 20);
            if(!this.scrolling){
                if(!this.scrollLeft){
                    this.createScrollers();
                }else{
                    this.scrollLeft.show();
                    this.scrollRight.show();
                }
            }
            this.scrolling = true;
            if(pos > (l-tw)){ 
                wrap.dom.scrollLeft = l-tw;
            }else{ 
							this.scrollToButton(this.scrollPosButton, true); 
            }
            this.updateScrollButtons();
        }
    },

    createScrollers : function(){
        var h = this.el.dom.offsetHeight; 
		
        // left
        var sl = this.el.insertFirst({
            cls:'ux-menutoolbar-scroller-left'
        });
        sl.setHeight(h);
        sl.addClassOnOver('ux-menutoolbar-scroller-left-over');
        this.leftRepeater = new Ext.util.ClickRepeater(sl, {
            interval : this.scrollRepeatInterval,
            handler: this.onScrollLeft,
            scope: this
        });
        this.scrollLeft = sl;

        // right
        var sr = this.el.insertFirst({
            cls:'ux-menutoolbar-scroller-right'
        });
        sr.setHeight(h);
        sr.addClassOnOver('ux-menutoolbar-scroller-right-over');
        this.rightRepeater = new Ext.util.ClickRepeater(sr, {
            interval : this.scrollRepeatInterval,
            handler: this.onScrollRight,
            scope: this
        });
        this.scrollRight = sr;
    },
    
    getScrollWidth : function(){
        return this.edge.getOffsetsTo(this.stripWrap)[0] + this.getScrollPos();
    },

    getScrollPos : function(){
        return parseInt(this.stripWrap.dom.scrollLeft, 10) || 0;
    },

    getScrollArea : function(){
        return parseInt(this.stripWrap.dom.clientWidth, 10) || 0;
    },

    getScrollAnim : function(){
        return {
        	duration: this.scrollDuration,
        	callback: this.updateScrollButtons,
        	scope: this
        };
    },

    getScrollIncrement : function(){
    	return (this.scrollIncrement || this.lastButtonWidth+2);
    },
    
    /* getBtnEl : function(item){
        return document.getElementById(item.id);
    }, */
    
    scrollToButton : function(item, animate){
    	item = item.el?item.el.dom.parentNode:undefined;
        if(!item){ return; }
        var el = item; //this.getBtnEl(item);
        var pos = this.getScrollPos(), area = this.getScrollArea();
        var left = Ext.fly(el).getOffsetsTo(this.stripWrap)[0] + pos;
        var right = left + el.offsetWidth;
        if(left < pos){
            this.scrollTo(left, animate);
        }else if(right > (pos + area)){
            this.scrollTo(right - area, animate);
        }
    },
    
    scrollTo : function(pos, animate){
        this.stripWrap.scrollTo('left', pos, animate ? this.getScrollAnim() : false);
        if(!animate){
            this.updateScrollButtons();
        }
    },
    
    onScrollRight : function(){
        var sw = this.getScrollWidth()-this.getScrollArea();
        var pos = this.getScrollPos();
        var s = Math.min(sw, pos + this.getScrollIncrement());
        if(s != pos){
        	this.scrollTo(s, this.animScroll);
        }        
    },

    onScrollLeft : function(){
        var pos = this.getScrollPos();
        var s = Math.max(0, pos - this.getScrollIncrement());
        if(s != pos){
            this.scrollTo(s, this.animScroll);
        }
    },
    
    updateScrollButtons : function(){
        var pos = this.getScrollPos();
        this.scrollLeft[pos == 0 ? 'addClass' : 'removeClass']('ux-menutoolbar-scroller-left-disabled');
        this.scrollRight[pos >= (this.getScrollWidth()-this.getScrollArea()) ? 'addClass' : 'removeClass']('ux-menutoolbar-scroller-right-disabled');
    },
    
    	/*
		remove : function(btn){
			Ext.ux.MenuPanel.superclass.remove.call(this);
			this.delegateUpdates();
		},
	*/
    add : function(){
        var a = arguments, l = a.length;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.isFormField){ 
                this.addField(el);
            }else if(el.render){ 
                this.addItem(el);
            }else if(typeof el == "string"){ 
                if(el == "separator" || el == "-"){
                    this.addSeparator();
                }else if(el == " "){
                    this.addSpacer();
                }else if(el == "->"){
                    this.addFill();
                }else{
                    this.addText(el);
                }
            }else if(el.tagName){ 
                this.addElement(el);
            }else if(typeof el == "object"){ 
                if(el.xtype){
                    var btn = this.addField(Ext.ComponentMgr.create(el, 'button'));
                    this.scrollPosButton = btn;
                    btn.on('click',function(){
                    		alert(this.id);
                    	});
                }else{
                    //this.scrollPosButton = this.addButton(el);
                    var btn = this.scrollPosButton = this.addButton(el);
                    this.scrollPosButton = btn;
                    btn.on('click',function(btn){
                    		this.scrollPosButton = btn;
                    	},this);
                }
            }
            
        }

    },
    
    addSeparator : function(){
        return this.addItem(new Ext.Toolbar.Separator());
    },

  
    addSpacer : function(){
        return this.addItem(new Ext.Toolbar.Spacer());
    },

    
    addFill : function(){
        return this.addItem(new Ext.Toolbar.Fill());
    },

 
    addElement : function(el){
        return this.addItem(new Ext.Toolbar.Item(el));
    },
    

    addItem : function(item){
        var td = this.nextBlock();
        this.initMenuTracking(item);
        item.render(td);
        this.items.add(item);
        return item;
    },
    
  
    addButton : function(config){
        if(Ext.isArray(config)){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!(config instanceof Ext.Toolbar.Button)){
            b = config.split ? 
                new Ext.Toolbar.SplitButton(config) :
                new Ext.Toolbar.Button(config);
        }
        var td = this.nextBlock();
        this.initMenuTracking(b);
        b.render(td);
        this.items.add(b);
        
        return b;
    },

  
    initMenuTracking : function(item){
        if(this.trackMenus && item.menu){
            item.on({
                'menutriggerover' : this.onButtonTriggerOver,
                'menushow' : this.onButtonMenuShow,
                'menuhide' : this.onButtonMenuHide,
                scope: this
            })
        }
    },

 
    addText : function(text){
        return this.addItem(new Ext.Toolbar.TextItem(text));
    },
    
   
    insertButton : function(index, item){
        if(Ext.isArray(item)){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
               buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof Ext.Toolbar.Button)){
           item = new Ext.Toolbar.Button(item);
        }
        var td = document.createElement("li");
        this.tr.insertBefore(td, this.tr.childNodes[index]);
        this.initMenuTracking(item);
        item.render(td);
        this.items.insert(index, item);
        return item;
    },
    
  
    addDom : function(config, returnEl){
        var td = this.nextBlock();
        Ext.DomHelper.overwrite(td, config);
        var ti = new Ext.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return ti;
    },

   
    addField : function(field){
        var td = this.nextBlock();
        field.render(td);
        var ti = new Ext.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(field);
        return ti;
    },

 
    nextBlock : function(){
    		var li = this.strip.createChild({tag:'li'}, this.edge);
    		return li;
    		/*
        var td = document.createElement("li");
        this.tr.appendChild(td);//这样的方法也可以加入，但是添加的位置不同会造成计算距离的错误从而使scroll出现问题
        return td;
        */
    },

   
    onDestroy : function(){
        MC.MenuPanel.superclass.onDestroy.call(this);
        if(this.rendered){
            if(this.items){ 
                Ext.destroy.apply(Ext, this.items.items);
            }
            Ext.Element.uncache(this.tr);
        }
    },

    
    onDisable : function(){
        this.items.each(function(item){
             if(item.disable){
                 item.disable();
             }
        });
    },

   
    onEnable : function(){
        this.items.each(function(item){
             if(item.enable){
                 item.enable();
             }
        });
    },

  
    onButtonTriggerOver : function(btn){
        if(this.activeMenuBtn && this.activeMenuBtn != btn){
            this.activeMenuBtn.hideMenu();
            btn.showMenu();
            this.activeMenuBtn = btn;
            this.scrollPosButton = this.activeMenuBtn;
        }
    },

  
    onButtonMenuShow : function(btn){
        this.activeMenuBtn = btn;
        this.scrollPosButton = this.activeMenuBtn;
    },

   
    onButtonMenuHide : function(btn){
        delete this.activeMenuBtn;
    }    
    
   
});