MC.MessageBox = Ext.extend(MC.Window, {
	wType : 'msg',
	layout : false,
	cls : 'x-window-dlg',
	autoHeight : true,
	maskParent : true,
	border : false,
	
	autoCreate : true,
    resizable:false,
    //constrain:true,
    //constrainHeader:true,
    minimizable : false,
    maximizable : false,
    //stateful: false,
    //shim:true,
    buttonAlign:"center",
    width : 300,
	height : 200,
    minHeight: 80,
    maxWidth : 600,
    minWidth : 100,
    plain:true,
    //footer:true,
    closable:true,
    close : function(){
       if(this.buttonc && this.buttonc.no && !this.buttonc.cancel){
           this.handleButton("no");
         }else{
           this.handleButton("cancel");
       }
    },
    initInnerView : function() {
		//加入窗体内容
    	this.buttonc = {};
        var bt = Ext.MessageBox.buttonText;
        this.buttonc["ok"] = this.addButton(bt["ok"], this.handleButton.createCallback("ok"));
        this.buttonc["yes"] = this.addButton(bt["yes"], this.handleButton.createCallback("yes"));
        this.buttonc["no"] = this.addButton(bt["no"], this.handleButton.createCallback("no"));
        this.buttonc["cancel"] = this.addButton(bt["cancel"], this.handleButton.createCallback("cancel"));
        this.buttonc["ok"].hideMode = this.buttonc["yes"].hideMode = this.buttonc["no"].hideMode = this.buttonc["cancel"].hideMode = 'offsets';
    	
    	 this.bodyEl = this.body.createChild({
             html:'<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'
         });
         this.iconCls = '';
         this.iconEl = Ext.get(this.bodyEl.dom.firstChild);
         this.contentEl = this.bodyEl.dom.childNodes[1];
         this.msgEl = Ext.get(this.contentEl.firstChild);
         this.textboxEl = Ext.get(this.contentEl.childNodes[2].firstChild);
         this.textboxEl.enableDisplayMode();
         this.textboxEl.addKeyListener([10,13], function(){
         if(this.isVisible() && this.buttonc){
             if(this.buttonc.ok){
                    this.handleButton("ok");
              }else if(this.buttonc.yes){
                    this.handleButton("yes");
                  }
             }
         });
         this.textareaEl = Ext.get(this.contentEl.childNodes[2].childNodes[1]);
         this.textareaEl.enableDisplayMode();
         this.progressBar = new Ext.ProgressBar({
              renderTo:this.bodyEl
         });
         this.bodyEl.createChild({cls:'x-clear'});
         
         this.viewReady();
	},
	viewReady : function(){
		//视图ok之后
            this.setTitle(this.title || "&#160;");
            var allowClose = (this.closable !== false && this.progress !== true && this.wait !== true);
            this.tools.close.setDisplayed(allowClose);
            this.activeTextEl = this.textboxEl;
            this.prompt = this.prompt || (this.multiline ? true : false);
            if(this.prompt){
                if(this.multiline){
                    this.textboxEl.hide();
                    this.textareaEl.show();
                    this.textareaEl.setHeight(typeof this.multiline == "number" ?
                        this.multiline : this.defaultTextHeight);
                    this.activeTextEl = this.textareaEl;
                }else{
                    this.textboxEl.show();
                    this.textareaEl.hide();
                }
            }else{
                this.textboxEl.hide();
                this.textareaEl.hide();
            }
            this.activeTextEl.dom.value = this.value || "";
            if(this.prompt){
                this.focusEl = this.activeTextEl;
            }else{
                var bs = this.buttonc;
                var db = null;
                if(bs && bs.ok){
                    db = this.buttonc["ok"];
                }else if(bs && bs.yes){
                    db = this.buttonc["yes"];
                }
                if (db){
                    this.focusEl = db;
                }
            }
            if(this.iconCls){
            	this.setIconClass(this.iconCls);
            }
            this.setIcon(this.icon);
            bwidth = this.updateButtons(this.initialConfig.buttons);
            this.progressBar.setVisible(this.progress === true || this.wait === true);
            this.updateProgress(0, this.progressText);
            this.updateText(this.msg);
            if(this.cls){
                this.el.addClass(this.cls);
            }
            this.proxyDrag = this.proxyDrag === true;
            this.modal = this.modal !== false;
            this.mask = this.modal !== false ? mask : false;
            if(!this.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                //document.body.appendChild(dlg.el.dom);
                this.setAnimateTarget(this.animEl);
                //this.show(this.animEl);
            }

            //workaround for window internally enabling keymap in afterShow
            this.on('show', function(){
                if(allowClose === true){
                    this.keyMap.enable();
                }else{
                    this.keyMap.disable();
                }
            }, this, {single:true});

            if(this.wait === true){
                this.progressBar.wait(this.waitConfig);
            }
	},
	/**
	 * 提示窗按钮行为
	 */
	msgAction : function(btn) {
		var value = '';
		var temp = btn.ownerCt.el.child('input', true);
		if (temp) {
			value = temp.value;
		} else {
			temp = btn.ownerCt.el.child('textarea', true);
			if (temp) {
				value = temp.innerHTML;
			}
		}
		Ext.callback(btn.fn, btn.scope, [btn.bType, value], 1);
		btn.ownerCt.close();
		/*btn.ownerCt.close();
		btn.fn.call(btn.scope,btn.bType, value);*/
	},
	/**
	 * 创建提示窗
	 */
	constructor : function(option) {
		var config = {};
		config.title = option.title ? option.title : '';
		config.animEl = option.animEl ? option.animEl : 'undefined';
		config.cacheable = option.cacheable?option.cacheable:config.cacheable;
		config.winId = option.winId?option.winId:config.winId;
		MC.MessageBox.superclass.constructor.call(this,config);
		/*if(this.iscache)
		{
			var bs = this.buttons;
			if(Ext.type(bs)=='array')
			{
				for (var i = 0; i < bs.length; i++) {
					bs[i].setHandler(option.fn,option.scope||window);
				}
			}
		}*/
		if (option.progress === true || option.wait === true) {
			progressBar = new Ext.ProgressBar({
				renderTo : this.body
			});
			progressBar.setVisible(option.progress === true
					|| option.wait === true);
			progressBar.updateProgress(0, option.progressText);
			progressBar.wait(option.waitConfig);
		}

		var btns = this.buttons?this.buttons:[];
		var btn = false;
		for (var i = 0; i < btns.length; i++) {
			if (!btn && (btns[i].bType == 'ok' || btns[i].bType == 'yes')) {
				btn = btns[i];
			}
			if (btns[i].bType == 'cancel' || btns[i].bType == 'no') {
				btn = btns[i];
			}
		}
		if (btn) {
			Ext.lib.Event.purgeElement(this.tools['close'].dom, false, 'click');
			this.tools['close'].on('click', function(b, e) {
				// alert(this.bType);
				// this.fireEvent('click',this,e);
				this.handler.call(this.fnscope || this, this, e);
			}, btn);
		}
	},
	getDefaultSize : function(){
		return {width:this.width,height:this.height};
	},
	handleButton : function(button){
        if(this.isVisible()){
            this.destroy();
            Ext.callback(this.fn, this.scope||window, [button, this.activeTextEl?this.activeTextEl.dom.value:null], 1);
        }
    },
    setIcon : function(icon){
            if(icon && icon != ''){
                this.iconEl.removeClass('x-hidden');
                this.iconEl.replaceClass(this.iconCls, icon);
                this.iconCls = icon;
            }else{
                this.iconEl.replaceClass(this.iconCls, 'x-hidden');
                this.iconCls = '';
            }
            return this;
    },
	updateText : function(text){
            if(!this.isVisible() && !this.width){
                this.setSize(this.maxWidth, 100);
            }
            this.msgEl.update(text || '&#160;');

            var iw = this.iconCls != '' ? (this.iconEl.getWidth() + this.iconEl.getMargins('lr')) : 0;
            var mw = this.msgEl.getWidth() + this.msgEl.getMargins('lr');
            var fw = this.getFrameWidth('lr');
            var bw = this.body.getFrameWidth('lr');
            if (Ext.isIE && iw > 0){
                //3 pixels get subtracted in the icon CSS for an IE margin issue,
                //so we have to add it back here for the overall width to be consistent
                iw += 3;
            }
            var w = Math.max(Math.min(/*opt.width || */iw+mw+fw+bw, this.maxWidth),
                        Math.max(this.minWidth, bwidth || 0));

            if(this.prompt === true){
                this.activeTextEl.setWidth(w-iw-fw-bw);
            }
            if(this.progress === true || this.wait === true){
                this.progressBar.setSize(w-iw-fw-bw);
            }
            this.setSize(w, 'auto')/*.center()*/;
            return this;
        },
        updateButtons : function(b){
	        var width = 0;
	        if(!b){
	            this.buttonc["ok"].hide();
	            this.buttonc["cancel"].hide();
	            this.buttonc["yes"].hide();
	            this.buttonc["no"].hide();
	            return width;
	        }
	        //this.footer.dom.style.display = '';
	        for(var k in this.buttonc){
	            if(typeof this.buttonc[k] != "function"){
	                if(b[k]){
	                    this.buttonc[k].show();
	                    this.buttonc[k].setText(typeof b[k] == "string" ? b[k] : Ext.MessageBox.buttonText[k]);
	                    width += this.buttonc[k].el.getWidth()+15;
	                }else{
	                    this.buttonc[k].hide();
	                }
	            }
	        }
	        return width;
    	},
        updateProgress : function(value, progressText, msg){
            this.progressBar.updateProgress(value, progressText);
            if(msg){
                this.updateText(msg);
            }
            return this;
        }
});