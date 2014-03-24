/**
 * 视图类
 */
MC.Desktop = function(config){
	config = config || {};
    this.initialConfig = config;
    this.moduleId = 'desktop';
    Ext.apply(this, config);
    this.addEvents(
        'disable',
        'beforeshow',
        'show',
        'beforehide',
        'hide',
        'beforerender',
        'render'
    	);
    MC.Desktop.superclass.constructor.call(this);

    this.init();//初始化桌面
    system.desktop = this;
    this.WindowMgr =new Ext.WindowGroup();
    this.WindowMgr.zseed = 6000;
	//if(this.renderTo){
     //   this.render(this.renderTo);
      //  delete this.renderTo;
    //}
};
Ext.extend(MC.Desktop, Ext.util.Observable, {

    boxReady : false,
  
    deferHeight: false,
	/**
	 * 初始化桌面
	 */
    init : function(){
    	//创建上面任务栏的div着点
        this.taskbarElTop = Ext.getBody().createChild({id: 'uxx-taskbar', tag: 'div', cls:'xx-taskbar'});
        //创建中间桌面区的div着点
        this.el = Ext.getBody().createChild({id: 'x-desktop', tag: 'div',cls : 'x-desktop'});
        //创建下面任务栏的div着点
        this.taskbarEl = Ext.getBody().createChild({id: 'ux-taskbar', tag: 'div' , cls:'xx-taskbar'});
		
		//注册浏览器窗体大小变化事件
    	Ext.EventManager.onWindowResize(this.layout,this);
    	this.cmenu = new Ext.menu.Menu();
    	
    	this.el.on('contextmenu', function(e){
    	if(e.target.id === this.el.id){
	    	e.stopEvent();
			if(!this.cmenu.el){
				this.cmenu.render();
			}
			var xy = e.getXY();
			//xy[1] -= this.cmenu.el.getHeight();
			this.cmenu.showAt(xy);
		}
		}, this);
	
    	this.layout();
    	this.onRender();
    },
	layout : function(){
		this.el.setHeight(this.getViewHeight());
	},
	/**
	 * 创建一个系统级别的window
	 */
	createSysWindow : function(config,cls){
		var win;
    	win = Ext.WindowMgr.get(config.id);
    	if(!win)
    	{
	    	win = new (cls||Ext.Window)(
	            Ext.applyIf(config||{}, {
	                manager: this.sysWinMgr,
	                width:400,
	                height:250,
	                constrainHeader:true,
	                minimizable: true,
	                shadow:false,
	                maximizable: true
	            })
	        );
        }
        return win;
	},
    onRender : function(ct, position){
    	//任务栏对象
    	this.taskbar = new MC.TaskBar(system);
		this.taskbarTop = new MC.TopTaskBar(this);
		//初始化样式
		this.initStyles();
		//桌面图标容器对象
		this.shortcuts = new MC.Shortcuts({
	    	renderTo: 'x-desktop',
	    	taskbarEl: this.taskbarEl,
	    	taskbarElTop: this.taskbarElTop
    	});
    	//任务栏快速启动栏对象
    	this.taskbar.quickStartPanel.add({
			handler: function(){
				this.getManager().hideAll();
			},
			iconCls: 'showWin-icon',
			scope: this,
			//text: c.text,
			tooltip: '显示桌面'
		});
    	this.initLaunchers();
    },
    show:Ext.emptyFn,
    /**
     * 初始化样式
     */
    initStyles : function(){
    	if(Ext.isGecko)
		{
			Ext.util.CSS.swapStyleSheet("sys", "system/patches/patches.css");
		}
    	var s = system.selectReg('user.preferences').styles;
    	if(!s){
    		return false;
    	}
    	this.setBackgroundColor(s.backgroundcolor);
    	this.setFontColor(s.fontcolor);
    	this.setTheme(s.theme);
    	this.setTransparency(s.transparency);
    	this.setWallpaper(s.wallpaper);
    	this.setWallpaperPosition(s.wallpaperposition);
    	return true;
    },
    /**
     * 初始化各类应用触发
     */
    initLaunchers : function(isReset){
    	var l = system.selectReg('user.preferences').launchers;
    	var tree = system.selectReg("user.menutree");
    	//var l = false;//不添加任何快捷方式
    	if(!l){
    		return false;
    	}
    	//初始化右键菜单
    	var t;
    	if(l.contextmenu){
			for(var i=0;i<l.contextmenu.length;i++)
			{
				t = l.contextmenu[i];
				if(typeof tree.getNodeById(t) =="object")
				{
					this.addContextMenuItem(t);
				}else{
					l.contextmenu.remove(t);
				}
			}
		}
		//初始化桌面图标
		if(l.shortcut){
			for(var i = 0, len = l.shortcut.length; i < len; i++){
	            t = l.shortcut[i];
				if(typeof tree.getNodeById(t) =="object")
				{
					this.addShortcut(t,false);
				}else{
					l.shortcut.remove(t);
				}
	        }
		}
		//初始化快速启动栏对象
		if(l.quickstart){
			for(var i = 0, len = l.quickstart.length; i < len; i++){
	            //this.addQuickStartButton(l.quickstart[i], false);
	            t = l.quickstart[i];
				if(typeof tree.getNodeById(t) == "object")
				{
					this.addQuickStartButton(t,false);
				}else{
					l.quickstart.remove(t);
				}
	        }
		}
		
		//自动启动项
		if(!isReset)
		{
			setTimeout(function(){
				system.desktop.initAutoRun();
			},500);
		}
		return true;
    },
    initAutoRun : function(){
    	var ar = system.selectReg('user.preferences').autorun;
    	var tree = system.selectReg("user.menutree");
		if(Ext.isArray(ar))
		{
			for(var i = 0;i<ar.length;i++)
			{
				if(typeof tree.getNodeById(ar[i]) =="object")
				{
					eval("setTimeout(function(){system.execute('"+ar[i]+"');},"+i+"*1000)");
				}else{
					ar.remove(ar[i]);
				}
			}
		}
    },
    afterRender : function(){
        this.boxReady = true;
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }else if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },
    /**
     * 获得窗体管理器
     */
    getManager : function(){
        return this.WindowMgr;
    },
	/**
	 * 获得一个指定的窗体
	 */
    getWindow : function(id){
        return this.WindowMgr.get(id);
    },
    /**
     * 获得桌面区高度
     */
    getViewHeight : function(){
    	return (Ext.lib.Dom.getViewHeight()-this.taskbarEl.getHeight()-this.taskbarElTop.getHeight());
    },
    /**
     * 获得桌面区大小
     */
    getViewSize: function(){
    	return {width:this.getViewWidth(),height:this.getViewHeight()};
    },
    /**
     * 获得桌面区宽度
     */
    getViewWidth : function(){
    	return Ext.lib.Dom.getViewWidth();
    },
    /**
     * 获得浏览器视图区宽度  >200
     */
    getWinWidth : function(){
		var width = Ext.lib.Dom.getViewWidth();
		return width < 200 ? 200 : width;
	},
	/**
	 * 获得浏览器视图区高度  >100
	 */
	getWinHeight : function(){
		var height = (Ext.lib.Dom.getViewHeight()-this.taskbarEl.getHeight());
		return height < 100 ? 100 : height;
	},
		
	getWinX : function(width){
		return (Ext.lib.Dom.getViewWidth() - width) / 2
	},
		
	getWinY : function(height){
		return (Ext.lib.Dom.getViewHeight()-this.taskbarEl.getHeight() - height) / 2;
	},
	/**
	 * 设置背景颜色
	 */
	setBackgroundColor : function(hex){
		if(hex){
			Ext.get(document.body).setStyle('background-color', '#'+hex);
			system.styles.backgroundcolor = hex;
		}
	},
	/**
	 * 设置字体颜色
	 */
	setFontColor : function(hex){
		if(hex){
			Ext.util.CSS.updateRule('.ux-shortcut-btn-text', 'color', '#'+hex);
			system.styles.fontcolor = hex;
		}
	},
	/**
	 * 设置主题
	 */
	setTheme : function(o){
		if(o && o.id && o.name && o.pathtofile){
			Ext.util.CSS.swapStyleSheet('theme', o.pathtofile);
			system.styles.theme = o;
		}
	},
	/**
	 * 设置透明度
	 */
	setTransparency : function(v){
		if(v >= 0 && v <= 100){
			this.taskbarEl.addClass("transparent");
			this.taskbarElTop.addClass("transparent");
			Ext.util.CSS.updateRule('.transparent','opacity', v/100);
			Ext.util.CSS.updateRule('.transparent','-moz-opacity', v/100);
			Ext.util.CSS.updateRule('.transparent','filter', 'alpha(opacity='+v+')');
			//system.styles.transparency = v;
			system.selectReg('user.preferences.styles').transparency = v<=20?20:v;
		}
	},
	setShortMenu : function(f){//----------------------------------------------------------------------------------------------
		var s = system.selectReg("user.preferences.styles");
		if(f)
		{
			s.shortMenu = true;
		}else{
			s.shortMenu = false;
		}
		this.taskbarTop.quickMenuPanel.setVisible(s.shortMenu);
		
	},
	/**
	 * 设置墙纸
	 */
	setWallpaper : function(o){
		
		if(o && o.id && o.name && o.pathtofile){
			var notifyWin = this.showNotification({
				html: '正在加载壁纸...'
				, title: '请稍候.'
			});
			var wp = new Image();
			wp.src = o.pathtofile;
			
			var task = new Ext.util.DelayedTask(verify, this);
			task.delay(200);
			//system.styles.wallpaper = o;
			Ext.apply(system.selectReg('user.preferences.styles').wallpaper,o);
		}
		
		function verify(){
			if(wp.complete){
				task.cancel();
				
				notifyWin.setIconClass('x-icon-done');
				notifyWin.setTitle('完成');
				notifyWin.setMessage('壁纸加载完成.');
				this.hideNotification(notifyWin);
				
				document.body.background = wp.src;
			}else{
				task.delay(200);
			}
		}
	},
	/**
	 * 设置墙纸显示方式
	 */
	setWallpaperPosition : function(pos){
		if(pos){
			if(pos === "center"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-tile');
				b.addClass('wallpaper-center');
			}else if(pos === "tile"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-center');
				b.addClass('wallpaper-tile');
			}			
			//system.styles.wallpaperposition = pos;
			system.selectReg('user.preferences.styles').wallpaperposition = pos;
		}
	},
	/**
	 * 显示提示窗
	 */
	showNotification : function(config){
		var win = new Ext.ux.Notification(Ext.apply({
			animateTarget: this.taskbarEl
			, autoDestroy: true
			, hideDelay: 5000
			, html: ''
			, iconCls: 'x-icon-waiting'
			, title: ''
		}, config));
		win.show();
		return win;
	},
	/**
	 * 渐隐提示窗
	 */
	hideNotification : function(win, delay){
		if(win){
			(function(){ win.animHide(); }).defer(delay || 3000);
		}
	},
	/**
	 * 增加一个自启动项
	 */
	addAutoRun : function(id){
		var ar = system.selectReg('user.preferences').autorun;
		ar.push(id);
		/*var m = system.getModule(id),
			c = system.launchers.autorun;
			
		if(m && !m.autorun){
			m.autorun = true;
			c.push(id);
		}*/
	},
	/**
	 * 移除一个自启动项
	 */
	removeAutoRun : function(id){
		var ar = system.selectReg('user.preferences').autorun;
		ar.remove(id);
		/*var m = system.getModule(id);
		var	c = system.launchers.autorun;
			
		if(m && m.autorun){
			var i = 0;
				
			while(i < c.length){
				if(c[i] == id){
					c.splice(i, 1);
				}else{
					i++;
				}
			}
			
			m.autorun = null;
		}*/
	},
	/**
	 * 增加一个右键菜单
	 */
	addContextMenuItem : function(id){
		var ms = system.selectReg('sys.modules');
		for(o in ms)
		{
			if(ms[o].moduleId === id)
			{
				this.cmenu.add(ms[o]);
			}
		}
	},
	/**
	 * 移除一个右键菜单
	 */
	removeContextMenuItem : function(id){
		var tmp = {id:id};
		this.cmenu.items.each(function(itm){
			if(itm.moduleId==this.id)
			{
				this.result = itm;
				return false;
			}
		},tmp);
		if(tmp.result)
		{
			this.cmenu.remove(tmp.result);
		}
	},
	/**
	 * 增加一个桌面图标
	 */
	addShortcut : function(id, updateConfig){
		var ms = system.selectReg('sys.modules');
		for(o in ms)
		{
			if(ms[o].moduleId === id)
			{
				this.shortcuts.addShortcut({
				handler: function(){
					system.execute(this.appId);
				},
				appId:id,
				iconCls: ms[o].shortcutIconCls,
				//scope: ms[o].scope||undefined,
				text: ms[o].text,
				tooltip: ms[o].tooltip || ''
			});
			}
		}
			/*if(updateConfig){
				system.launchers.shortcut.push(id);
			}*/
	},
	/**
	 * 移除一个桌面图标
	 */
	removeShortcut : function(id, updateConfig){
		var tmp;
		if(tmp = this.shortcuts.getItemById(id))
		{
			this.shortcuts.removeShortcut(tmp);
		}
		return;
		if(m && m.shortcut){
			this.shortcuts.removeShortcut(m.shortcut);
			m.shortcut = null;
			
			if(updateConfig){
				var sc = system.launchers.shortcut;
					var i = 0;
				while(i < sc.length){
					if(sc[i] == id){
						sc.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
	},
	/**
	 * 增加一个快速启动对象
	 */
	addQuickStartButton : function(id, updateConfig){
		var ms = system.selectReg('sys.modules');
		for(var o in ms)
		{
			if(ms[o].moduleId === id)
			{
				this.taskbar.quickStartPanel.add({
				appId:id,
				handler: function(){
					system.execute(this.appId);
				},
				iconCls: ms[o].iconCls,
				scope: ms[o].scope,
				text: ms[o].text,
				tooltip: ms[o].tooltip || ''
			});
			}
		}
    },
    /**
     * 移除一个快速启动对象
     */
    removeQuickStartButton : function(id, updateConfig){
    	var tmp;
		if(tmp = this.taskbar.quickStartPanel.getItemById(id))
		{
			this.taskbar.quickStartPanel.remove(tmp);
		}
		return;
    	
    	var m = system.getModule(id);
    	
		if(m && m.quickStartButton){
			this.taskbar.quickStartPanel.remove(m.quickStartButton);
			m.quickStartButton = null;
			
			if(updateConfig){
				var qs = system.launchers.quickstart;
					var i = 0;
				while(i < qs.length){
					if(qs[i] == id){
						qs.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
    },
    /**
     * 标记当前窗体
     */
    markActive : function (win){
    	if(win != this.activeWindow)
    	{
    		if(this.activeWindow)
    		{
    			this.markInactive(this.activeWindow);
    		}
    		this.taskbar.setActiveButton(win.taskButton);
	        this.activeWindow = win;
	        Ext.fly(win.taskButton.el).addClass('active-win');
	        win.minimized = false;
    	}
    },
    
    /**
     * 撤销标记的当前窗体
     */
    markInactive : function (win){
        if(win == this.activeWindow){
            this.activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    },
    /**
     * 锁定桌面
     */
    lock : function(){
    	if(!this.lockWin){
			this.lockWin = new Ext.Window({
				title:'屏幕锁',
				iconCls:'lock',
				modal:true,
				width:300,
				height:200,
				closeAction :'hide',
				resizable : false,
				bodyStyle:'padding:15px;',
				constrainHeader : true,
				layout:'form',
				listeners:{
					'hide':function(){
						this.getComponent(1).reset();
						this.getComponent(2).reset();
						}
					},
					items:[{
							xtype:'label',
							//html : '<div align="center" style="font-size:15px;padding-bottom:15px;">输入挂机密码,请不要与登陆密码相同!</div>'
							html : '<div align="center" style="padding-bottom:15px;">输入锁定密码,请不要与登陆密码相同!</div>'
						},
						{
							xtype:'textfield',
							fieldLabel: '密码',
							allowBlank : false,
							blankText : '密码不能为空',
							msgTarget : 'side',
							inputType:'password'
						},{
							xtype:'textfield',
							fieldLabel: '确认密码',
							allowBlank : false,
							blankText : '确认密码不能为空',
							msgTarget : 'under',
							inputType:'password'
						}],
					buttons:[
							{text:'确定',scope:this,handler:function(btn){
								cmp1 = btn.ownerCt.getComponent(1);
								cmp2 = btn.ownerCt.getComponent(2);
									if (cmp1.validate()&&cmp2.validate()) {
										if(cmp1.getValue()!==cmp2.getValue())
										{
											cmp2.markInvalid('两次密码不一样');
											return;
										}
										system.LOCKPWD = cmp1.getValue();
										btn.ownerCt.hide();
										this.setVisible(false,true);
										if(!this.relockWin){
											this.relockWin = new Ext.Window({
												title:'屏幕解锁',
												iconCls:'key',
												modal:true,
												width:300,
												height:140,
												closable:false,
												resizable : false,
												bodyStyle:'padding:15px;',
												constrainHeader : true,
												layout:'form',
												listeners:{
													'hide':function(){
														this.getComponent(0).reset();
														}
													},
													items:[
														{
															xtype:'textfield',
															fieldLabel: '输入解锁密码',
															allowBlank : false,
															blankText : '密码不可能为空',
															msgTarget : 'under',
															inputType:'password'
														}
													],
													buttons:[
															{text:'确定',handler:function(){
																area = this.ownerCt.getComponent(0);
																	if (area.validate()) {
																		if(area.getValue()!==system.LOCKPWD)
																		{
																			area.markInvalid('密码错误');
																			//formpl.getComponent(0).fireEvent('invalid');
																			return;
																		}
																		system.LOCKPWD = '';
																		this.ownerCt.hide();
																		system.desktop.setVisible(true,true);
																	}
																}}
																]
														})
													}
											this.relockWin.show();
									}
								}},
								{text:'取消',handler:function(){
									this.ownerCt.hide();	
								}}
								]
						})
					}
			this.lockWin.show();
    },
    /**
     * 设置桌面是否可见
     * @param visible true为可见
     * @param animate true为有动画效果
     */
    setVisible : function(visible,animate){
    	//desktopEl.setVisible(visible,animate);
    	this.el.setOpacity(visible?1.0:0.0,animate);
    	//desktopEl.hide(visible,animate);
    	//Ext.get('x-desktop').hide();
    	this.taskbarEl.setVisible(visible,animate);
    	this.taskbarElTop.setVisible(visible,animate);
    }
});
 MC.Desktop.singleTon = true;
 Ext.onReady(function(){
  	window.system.install('desktop',MC.Desktop);
 });