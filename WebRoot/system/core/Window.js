/**
 * 应用窗体类
 */
MC.Window = Ext.extend(Ext.Window, {

	sorted:true,
	modal : false,
	constrainHeader : true,
	cacheable:false,//可否缓存
	defaultClear:true,//是否启动默认组件数据缓存清除处理
	relativeSize : '90% 90%',//子窗体与相对窗体的相对量
	relativer : 'parent',//相对窗体
	minimizable : true,
	maximizable : true,
	minHeight : 300,
	minWidth : 600,
	innerView : 'welcome',
	cached : false,
	hasStatusBar : false,
	clearLayout : true,//是否在缓存是重新布局
	initMethod : 'init',
	init : Ext.emptyFn,
	// focus : Ext.emptyFn,
	// border : false,
	// plain : true,
	// onEsc : Ext.emptyFn,
	welcome : function(win) {//抽象方法
		win.add({
			frame : true,
			html : '<span style="font-size:24px;color:#FF0000;">提示，没有设置第一视图，缺少欢迎视图！</span>'
		});
		win.doLayout();
	},
	//private
	parseSize : function(a, start) {
		if (a) {
			if (a.indexOf('%') != -1) {
				return start * parseFloat(a.replace('%', '')) * .01;
			} else {
				a = parseInt(a, 10);
				if (!isNaN(a)) {
					return a > 0 ? a : start + a
				}
				return start * .9;
			}
		} else {
			return start * .9;
		}
	},
	//private
	setDefaultConfig : function() {
		return {
			layout : 'fit',
			manager : system.desktop.WindowMgr,
			renderTo : system.desktop.el
		};
	},
	constructor : function(config) {
		if (this.initConfig) {
			Ext.apply(config, this.initConfig(config));
		}
		MC.Window.superclass.constructor.call(this, config);
	},
	statusBarText : '就绪',
	createStore : Ext.emptyFn,//抽象方法
	/**
	 * 获得一个Store的短方法
	 */
	getStore : function(key) {
		if (system.getStore(key)) {
			return system.getStore(key);
		} else {
			this.getHost().createStore(key);
			return system.getStore(key);
		}
	},
	/**
	 * 得到此窗体的 根窗体
	 */
	getHost : function() {
		var host = this;
		while (true) {
			if (host.parent) {
				host = host.parent;
			} else {
				break;
			}
		}
		return host;
	},
	/**
	 * 初始化窗体内部组件
	 */
	initInnerView : function() {
		if(this.isEmptyWin)
		{
			return;
		}
		if (this.wType !== 'msg') {
			var host = this.getHost();
			if (!this.cached || typeof host[this.innerView] === 'undefined') {
				this.loadSource(this.innerView, this);
			}
		}
	},
	viewReady : function(){
		var host = this.getHost();
		var t = this;
		setTimeout(function(){
			host[t.initMethod].call(host,t);
		},0);
		//host[this.initMethod].call(host,this);
	},
	/**
	 * 加载异步资源
	 */
	loadSource : function(fun, owner,callback) {
		var param = this.getHost().moduleId + '-' + fun;
		Ext.Ajax.request({
			url : 'personal/com_getSource.action',
			params : {
				appId : param,
				fun : fun
			},
			callback : callback || this.sourceCallback,
			scope : owner || this
		});
	},
	sourceCallback : function(o,f,r) {
		var fun = o.params.fun;
		if(f)
		{
			window.eval(r.responseText);
			var host = this.getHost();
			host[fun].call(host, this);
			this.viewReady.call(this);
			if(this.cacheable)
			{
				this.cached = true;
			}
		}else{
			alert("加载方法("+fun+")发生错误");
		}
	},
	/**
	 * 创建一个 伪系统窗体 如提示窗
	 */
	createSysWindow : function(config, cls) {
		if(!this.children)
		{
			this.children = new Ext.util.MixedCollection();
		}
		var win = this.children.get(config.childrenId);
		if(!win){
		win = new (cls || MC.Window)(Ext.applyIf(config || {}, {
					wType : false,
					parent : this,
					minimizable : true,
					maskParent : false,
					constrainHeader : true,
					maximizable : true

				}));
		}
		if(!this.children)
		{
			this.children = new Ext.util.MixedCollection();
		}
		this.children.add(win.childrenId,win);
		return win;
	},
	/**
	 * 创建子窗体
	 */
	createWindow : function(config, cls) {
		var win;
		var key = this.getHost().moduleId + "-" + (config.winId?config.winId:config.title);
		if(/*config.wType != 'msg' && */config.cacheable && system.caches.containsKey(key))
		{
			win = system.caches.get(key);
			var lay = win.layout;
			Ext.apply(win,config);
			win.layout = lay;
			win.cacheReset.call(win);
		}else{
			win = new (cls || MC.Window)(Ext.applyIf(config || {}, {
					wType : 'child',
					clearLayout:false,
					parent : this,
					minimizable : false,
					maskParent : true,
					constrainHeader : true,
					maximizable : true

				}));
			if(config.cacheable)
			{
				system.caches.add(key,win);
			}
		}
		this.child = win;
		if (win.maskParent) {
			this.el.mask();
		}
		return win;
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
	},
	/**
	 * 创建提示窗
	 */
	msgWindow : function(option) {
		var config = {};
		config.title = option.title ? option.title : '';
		config.animEl = option.animEl ? option.animEl : 'undefined';

		var inner = (option.icon ? '<div class="ext-mb-icon ' + option.icon
				+ '"></div>' : '')
				+ '<div class="ext-mb-content"><span class="ext-mb-text">'
				+ (option.msg ? option.msg : '')
				+ '</span><br /><div class="ext-mb-fix-cursor">'
				+ (option.multiline
						? '<textarea class="ext-mb-textarea">'
								+ (option.value ? option.value : '')
								+ '</textarea>'
						: (option.value
								? ('<input class="ext-mb-input" value="'
										+ option.value
										+ '" type="'
										+ (option.inputType
												? option.inputType
												: 'text') + '"/>')
								: (option.inputType
										? ('<input class="ext-mb-input" type="'
												+ (option.inputType
														? option.inputType
														: 'text') + '"/>')
										: ''))) + '</div></div>';

		config.html = inner;
		config.buttons = [];
		for (var o in option.buttons) {
			config.buttons.push({
				text : option.buttons[o] === true
						? Ext.Msg.buttonText[o]
						: option.buttons[o],
				bType : o,
				fn : option.fn,
				scope : option.scope || window,
				handler : this.msgAction
			});
		}
		config.cacheable = option.cacheable?option.cacheable:config.cacheable;
		config.winId = option.winId?option.winId:config.winId;
		Ext.apply(config, {
			wType : 'msg',
			// autoCreate : true,
			resizable : false,
			//cacheable : true,
			width : 300,
			height : 200,
			cls : 'x-window-dlg',
			autoHeight : true,
			minimizable : false,
			maskParent : true,
			// constrainHeader: true,
			maximizable : false,
			border : false,
			buttonAlign : 'center',
			plain : true
		});
		var win = this.createWindow(config);

		if (option.progress === true || option.wait === true) {
			progressBar = new Ext.ProgressBar({
				renderTo : win.body
			});
			progressBar.setVisible(option.progress === true
					|| option.wait === true);
			// this.updateProgress(0, option.progressText);
			progressBar.updateProgress(0, option.progressText);
			progressBar.wait(option.waitConfig);
			// this.updateText(option.msg);
		}

		var btns = win.buttons?win.buttons:[];
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
			Ext.lib.Event.purgeElement(win.tools['close'].dom, false, 'click');
			win.tools['close'].on('click', function(b, e) {
				// alert(this.bType);
				// this.fireEvent('click',this,e);
				this.handler.call(this.scope || this, this, e);
			}, btn);
		}
		win.show();
		return win;
	},
	/**
	 * 类似Ext.Msg.wait
	 */
	wait : function(msg, title, config) {
		this.waitWindow = this.msgWindow({
			title : title,
			msg : msg,
			buttons : false,
			closable : false,
			wait : true,
			modal : true,
			minWidth : 100,
			waitConfig : config
		});
	},
	/**
	 * 类似Ext.Msg.alert
	 */
	alert : function(title, msg, fn, scope) {
		var config = {};
		if(Ext.type(title)=='object')
		{
			Ext.apply(config,title);
		}else{
			config.title = title;
		}
		config.msg = msg?msg:config.msg;
		if(!config.msg)
		{
			config.msg = config.title;
			config.title = "提示";
		}
		config.fn = fn?fn:config.fn;
		config.scope = scope?scope:config.scope;
		config.buttons=Ext.Msg.OK;
		//config.cacheable = true;
		config.winId = config.title+config.msg;
		this.msgWindow(config);
	},
	/**
	 * 类似Ext.Msg.confirm
	 */
	confirm : function(title, msg, fn, scope) {
		this.msgWindow({
			title : title,
			msg : msg,
			buttons : Ext.Msg.YESNO,
			fn : fn,
			scope : scope,
			icon : Ext.Msg.QUESTION
		});
	},
	/**
	 * 类似Ext.Msg.prompt
	 */
	prompt : function(title, msg, fn, scope, multiline, value) {
		this.msgWindow({
			title : title,
			msg : msg,
			buttons : Ext.Msg.OKCANCEL,
			fn : fn,
			minWidth : 250,
			scope : scope,
			prompt : true,
			multiline : multiline,
			value : value
		});
	},
	//@override
	initComponent : function() {
		Ext.applyIf(this, this.setDefaultConfig());
		if (!this.bbar && this.hasStatusBar) {
			if (!this.preventStatusBar) {
				this.bbar = new Ext.StatusBar({
					statusAlign : "left",
					defaultText : '',
					defaultIconCls : 'default-icon',
					text : this.statusBarText,
					iconCls : 'ready-icon'
				});
			}
		}
		if (this.getItems) {
			this.items = this.getItems();
		}
		MC.Window.superclass.initComponent.call(this);
		this.initSurround();
	},
	//@override
	afterRender : function() {
		MC.Window.superclass.afterRender.call(this);
		// this.resizer.maxHeight = window.screen.height; //availHeight;
		// this.resizer.maxWidth = window.screen.width; //availWidth;
		//this.cacheReset();
		this.initInnerView();
		// this.doLayout();
	},
	/**
	 * 用于缓存重置
	 */
	cacheReset : function(){
		this.initSurround();
		this.fireEvent("render",this);
		//this.doLayout(true);
		if(this.clearLayout)
		{
			this.setHeight(this.getSize().height-1);
		}
	},
	clear : Ext.emptyFn,//有缓存的情况下，假销毁要清除处理的方法
	initSurround : function() {
		this.setPlace();
		if (!this.wType) {
			this.taskButton = system.desktop.taskbar.taskButtonPanel.add(this);
			if(system.animative)
			{
				this.animateTarget = this.taskButton.el;
			}
		}
	},
	/*layoutflag : true,
	doLayout : function(shallow)
	{
		if(this.height)
		{
			this.height = this.layoutflag?this.height+1:this.height-1;
			this.layoutflag = !this.layoutflag;
		}
		MC.Window.superclass.doLayout.call(this, shallow);
	},*/
	/**
	 * 初始化各类事件
	 */
	initEvents : function() {
		MC.Window.superclass.initEvents.call(this);
		this.on("activate", this.onActivate, this);
		this.on("deactivate", this.onDeactivate, this);
		this.on("minimize", this.onMinimize, this);
		this.on("hide", this.onHide, this);
		this.on("show", this.onShow, this);
		this.on("close", this.onClose, this);
	},
	/**
	 * 当窗体置前的行为
	 */
	onActivate : function() {
		if(this.parent||this.child)
		{
			var host = this.getHost();
			if(this!=host&&host.sorted==this.sorted)
			{
				host.toFront();
				return;
			}
			this.sorted = !this.sorted;
		}
		if (this.child) {
			if(Ext.isIE)
			{
				var t = this;
				setTimeout(function(){
					t.child.toFront();
				},0);
			}
			// 2010.8.6解决窗口最大化后弹出新窗口灰屏问题。表面解决，更深层次的原因未明。
			else if (Ext.isSafari || Ext.isSafari3) 
			{
				var t = this;
				setTimeout(function(){
					t.child.toFront();
				},5);
			}
			else{
				this.child.toFront();
			}
		}
		system.desktop.markActive(this.getHost());
	},
	/**
	 * 当窗体丢失焦点的行为
	 */
	onDeactivate : function() {
		if (!this.wType) {
			system.desktop.markInactive(this);
		}
	},
	/**
	 * 最小化行为
	 */
	onMinimize : function() {
		this.minimized = true;
		if (this.child) {
			this.child.hide();
		}
		this.hide();
	},
	/**
	 * 隐藏的行为
	 */
	onHide : function() {
		if (this.child) {
			this.child.hide();
		}
	},
	/**
	 * 显示的行为
	 */
	onShow : function() {
		this.minimized = false;
		if (this.child) {
			this.child.show();
		}
		if(this.cached && this.cacheable)
		{
			this.viewReady.call(this);
			
		}
	},
	/**
	 * 当关闭的行为
	 */
	onClose : function() {
		if (this.parent && this.parent.waitWindow) {
			this.parent.waitWindow = null;
		}
		if (Ext.type(this.clearer) == 'array') {
			var tmp;
			for (var i = 0; i < this.clearer.length; i++) {
				tmp = system.getStore(this.clearer[i]);
				if (tmp) {
					tmp.removeAll();
				}
			}
		}
	},
	//@override
	maximize : function() {
		MC.Window.superclass.maximize.call(this);
	},
	getDefaultSize : function(){
		var config = this.initialConfig;
		var dsize = {width:config.width,height:config.height};
		if (!config.width || !config.height) {
			var size, arr, w, h;
			if (this.relativer == 'parent') {
				if (this.parent) {
					size = this.parent.getSize();
				} else {
					size = system.getViewSize();
				}
			} else if (this.relativer == 'host') {
				size = this.getHost().getSize();
			} else if (typeof this.relativer == 'object'
					&& this.relativer.getSize) {
				size = this.relativer.getSize();
			} else {
				size = system.getViewSize();
			}
			if (Ext.type(this.relativeSize) == 'string') {
				arr = this.relativeSize.split(' ');
				dsize.width = config.width ? config.width : this.parseSize(arr[0],
						size.width);
				dsize.height = config.height ? config.height : this.parseSize(
						arr[1], size.height);
				if (!this.parent) {
					if (dsize.width < this.minWidth) {
						dsize.width = this.minWidth;
					}
					if (dsize.height < this.minHeight) {
						dsize.height = this.minHeight;
					}
				}
			}
		}
		return dsize;
	},
	setPlace : function(){
		var size = this.getDefaultSize();
		if(size.height)
		{
			this.height = size.height;
		}
		if(size.width)
		{
			this.width=size.width;
		}
		//this.setSize(this.getDefaultSize());
		if(this.moduleId)
		{
			window.temp = this;
			setTimeout(function(){
				var p = window.temp;
				window.temp = undefined;
				p.center();
			},0);
		}else{
			var p = this.getDefaultPosition();
			this.setPagePosition(p.x,p.y);
		}
	},
	/**
	 * 获得配置第一次出现的位置
	 */
	getDefaultPosition : function() {
		var position = {x:null,y:null};
		if (this.parent) {
			var s = this.parent.getSize();
			var p = this.parent.getPosition();
			position.x = p[0] + s.width / 2 - this.width / 2;
			position.y = p[1] + s.height / 2 - this.height / 2;
			var vw = system.getViewSize().width;
			if (position.x + this.width > vw) {
				position.x = vw - this.width;
			}
		}else{
			var size = this.getDefaultSize();
			position.x = Ext.lib.Dom.getViewWidth()/2 - size.width / 2;
			position.y = Ext.lib.Dom.getViewHeight()/2 - size.height / 2;
		}
		return position;
		/*
		 * if (this.alignToEl) { this.getEl().setWidth(this.width); var position =
		 * this.getEl().getAlignToXY(this.alignToEl, this.alignToPosition);
		 * this.x = this.x || (position[0] + this.alignToXOffset); this.y =
		 * this.y || (position[1] + this.alignToYOffset); }
		 */
	},
	delayClose:function(win){
		var p = (win&&win.getXType()=='mcwindow')?win:this;
		setTimeout(function(){
			p.close();
		},0);
	},
	/**
	 * 清除缓存组件上的数据
	 */
	resetData : function(c){
		if(c.isFormField)
		{
			c.reset();
		}else{
			if(Ext.type(c.isXType)=="function" && c.isXType("panel") && c.bottomToolbar && c.bottomToolbar.isXType("paging"))
			{
				c.bottomToolbar.reset();
			}
		}
		if(c.initialConfig && c.initialConfig.hidden)
		{
			c.setVisible(false);
		}
	},
	//@override
	destroy : function() {
		if (system.desktop.activeWindow == this) {
			system.desktop.activeWindow = null;
		}
		//system.desktop.WindowMgr.unregister(this);//不能够注销，岂不是默认不能销毁？
		if (this.parent) {
			if(this.parent.children)
			{
				this.parent.children.remove(this);
			}
			if(this.parent.child)
			{
				this.parent.child = null;
				if (this.maskParent) {
					this.parent.el.unmask();
				}
			}
		}
		if (this.child) {
			this.child.destroy();
		}
		if(this.children)
		{
			this.children.each(function(item){
				this.remove(item);
				item.destroy();
			},this.children);
		}
		
		this.destroyed = true;
		
		if (this.taskButton) {
			this.taskButton.destroy();
			delete this.taskButton;
			system.tasks.removeKey(this.moduleId);
		}
		if(this.animateTarget)
		{
			this.animateTarget = null;
		}
		if(this.cacheable)
		{
			if(this.maximized)
			{
				this.restore();
			}
			if(this.defaultClear)
			{
				this.cascade(this.resetData);
			}
			this.clear.call(this.getHost(),this);
		}else
		{
			/*if (this.innerArgs) {
				this.innerArgs = null;
				delete this.innerArgs;
			}*/
			this.un("activate", this.onActivate, this);
			this.un("deactivate", this.onDeactivate, this);
			this.un("minimize", this.onMinimize, this);
			this.un("hide", this.onHide, this);
			this.un("show", this.onShow, this);
			this.un("close", this.onClose, this);
			delete this.context;
			MC.Window.superclass.destroy.call(this);
		}
	}

});

Ext.reg('mcwindow', MC.Window);