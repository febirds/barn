MC.Desktop = function(system){
	
	this.taskbar = new MC.TaskBar(system);
	
	this.taskbarTop = new MC.TopTaskBar(system);
	
	var taskbar = this.taskbar;
	var taskbarTop = this.taskbarTop;
	
	this.el = Ext.get('x-desktop');
	var desktopEl = this.el;
	
    var taskbarEl = Ext.get('ux-taskbar');
    var taskbarElTop = Ext.get('uxx-taskbar');
    
    this.shortcuts = new MC.Shortcuts({
    	renderTo: 'x-desktop',
    	taskbarEl: taskbarEl,
    	taskbarElTop: taskbarElTop
    });
	
	this.taskbar.quickStartPanel.add({
				handler: function(){
					this.getManager().hideAll();
				
				},
				iconCls: 'showWin-icon',
				scope: this,
				//text: c.text,
				tooltip: '显示桌面'
			});
    var windows = new Ext.WindowGroup();
    windows.count=0;
    windows.base=20;
    windows.zseed = 8000;
    var activeWindow;
		
    
    
	function renderWin(win){
		if(win.hmenu)
		{
			
	        win.hmenu = new Ext.menu.Menu({
	            items: [
	            {text:'还原',handler:function(){}},
	            {text:'最大化',handler:function(){}},
	            {text:'最小化',handler:function(){}},
	          	'-',
	            {text:'关闭',handler:function(){}}
	
	            ]
	        }); 
	   
	        win.header.on('contextmenu', function(e){
				e.stopEvent();
		    	if(e.target.id === this.header.id){
					if(!this.hmenu.el){
						//this.hmenu.render();
					}
					var xy = e.getXY();
					this.hmenu.showAt(xy);
				}
			}, win);
			return;
			win.cmenu = new Ext.menu.Menu({
	            items: [{text:'窗口菜单'}
	
	            ]
	        });
	        
			win.body.on('contextmenu', function(e){
				e.stopEvent();var xy = e.getXY();this.cmenu.showAt(xy);
				/*
		    	if(e.target.id === this.body.id){
					if(!this.cmenu.el){
						this.cmenu.render();
					}
					var xy = e.getXY();
					this.cmenu.showAt(xy);
				}*/
			}, win);
		}
    }
    
	function minimizeWin(win){
		//if(win.child){
		///	win.child.minimized = true;
    	//	win.child.hide();
    	//}
    	if(win.child){
    		return;
    	}
        win.minimized = true;
        win.hide();
    }
    
    function markActive(win){
    	if(win.child){
    		win.child.show();
    		//win.child.toFront();
    	}
        if(activeWindow && activeWindow != win){
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win){
    	if(win.child)
    	{
    		return;
    	}
        if(win == activeWindow){
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }
	function beforecloseWin(win){
		if(win.inframe)
		{
    		win.inframe.removeAttribute('src');
    	}
    }
    function removeWin(win){
    	taskbar.taskButtonPanel.remove(win.taskButton);
    	win.taskButton=false;
        layout();
    }
    function destroyWin(win){
    	if(win.child)
		{
			win.child.destroy();
		}
    	if(win.inframe)
		{	
			win.vDestroy = true;
    		return false;
    	}
		
    }

    function layout(){
    	desktopEl.setHeight(Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight()-taskbarElTop.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls){
    	var win = new (cls||Ext.Window)(
            Ext.applyIf(config||{}, {
                manager: windows,
                minimizable: true,
                shadow:false,
                constrainHeader: true,
                hmenu:true,
                maximizable: true
            })
        );
        win.render(desktopEl);
        if(typeof win.wType === 'undefined')
        {
	        win.taskButton = taskbar.taskButtonPanel.add(win);
	
	        //win.animateTarget = win.taskButton.el;
	        
	        win.on({
        		'render': {
        			fn: renderWin
        		},
	        	'activate': {
	        		fn: markActive
	        	},
	        	'beforeshow': {
	        		fn: markActive
	        	},
	        	'deactivate': {
	        		fn: markInactive
	        	},
	        	'minimize': {
	        		fn: minimizeWin
	        	},
	        	'beforeclose': {
	        		fn: beforecloseWin
	        	},
	        	'close': {
	        		fn: removeWin
	        	},
	        	'beforedestroy': {
	        		fn: destroyWin
	        	}
	        });
        }
        layout();
        return win;
    };

    this.getManager = function(){
        return windows;
    };

    this.getWindow = function(id){
        return windows.get(id);
    };
    
    this.getViewHeight = function(){
    	return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
    };
    
    this.getViewWidth = function(){
    	return Ext.lib.Dom.getViewWidth();
    };
    
    this.getWinWidth = function(){
		var width = Ext.lib.Dom.getViewWidth();
		return width < 200 ? 200 : width;
	};
		
	this.getWinHeight = function(){
		var height = (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
		return height < 100 ? 100 : height;
	};
		
	this.getWinX = function(width){
		return (Ext.lib.Dom.getViewWidth() - width) / 2
	};
		
	this.getWinY = function(height){
		return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight() - height) / 2;
	};
	
	this.setBackgroundColor = function(hex){
		if(hex){
			Ext.get(document.body).setStyle('background-color', '#'+hex);
			system.styles.backgroundcolor = hex;
		}
	};
	
	this.setFontColor = function(hex){
		if(hex){
			Ext.util.CSS.updateRule('.ux-shortcut-btn-text', 'color', '#'+hex);
			system.styles.fontcolor = hex;
		}
	};
	
	this.setTheme = function(o){
		if(o && o.id && o.name && o.pathtofile){
			Ext.util.CSS.swapStyleSheet('theme', o.pathtofile);
			system.styles.theme = o;
		}
	};
	
	this.setTransparency = function(v){
		if(v >= 0 && v <= 100){
			taskbarEl.addClass("transparent");
			taskbarElTop.addClass("transparent");
			Ext.util.CSS.updateRule('.transparent','opacity', v/100);
			Ext.util.CSS.updateRule('.transparent','-moz-opacity', v/100);
			Ext.util.CSS.updateRule('.transparent','filter', 'alpha(opacity='+v+')');
			
			
			
			
			system.styles.transparency = v;
		}
	};
	
	this.setWallpaper = function(o){
		if(o && o.id && o.name && o.pathtofile){
			
			var notifyWin = this.showNotification({
				html: '正在加载壁纸...'
				, title: '请稍候.'
			});
			
			var wp = new Image();
			wp.src = o.pathtofile;
			
			var task = new Ext.util.DelayedTask(verify, this);
			task.delay(200);
			
			system.styles.wallpaper = o;
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
	};
	
	this.setWallpaperPosition = function(pos){
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
			system.styles.wallpaperposition = pos;
		}
	};
	
	this.showNotification = function(config){
		var win = new Ext.ux.Notification(Ext.apply({
			animateTarget: taskbarEl
			, autoDestroy: true
			, hideDelay: 5000
			, html: ''
			, iconCls: 'x-icon-waiting'
			, title: ''
		}, config));
		win.show();

		return win;
	};
	
	this.hideNotification = function(win, delay){
		if(win){
			(function(){ win.animHide(); }).defer(delay || 3000);
		}
	};
	
	this.addAutoRun = function(id){
		var m = system.getModule(id),
			c = system.launchers.autorun;
			
		if(m && !m.autorun){
			m.autorun = true;
			c.push(id);
		}
	};
	
	this.removeAutoRun = function(id){
		var m = system.getModule(id),
			c = system.launchers.autorun;
			
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
		}
	};
	

	this.addContextMenuItem = function(id){
		var m = system.getModule(id);
		if(m && !m.contextMenuItem){
			/* if(m.moduleType === 'menu'){ // handle menu modules
				var items = m.items;
				for(var i = 0, len = items.length; i < len; i++){
					m.launcher.menu.items.push(system.getModule(items[i]).launcher);
				}
			} */
			this.cmenu.add(m.launcher);
		}
	};

	this.addShortcut = function(id, updateConfig){
		var m = system.getModule(id);
		
		if(m && !m.shortcut){
			var c = m.launcher;
			
			m.shortcut = this.shortcuts.addShortcut({
				handler: c.handler,
				iconCls: c.shortcutIconCls,
				scope: c.scope,
				text: c.text,
				tooltip: c.tooltip || ''
			});
			
			if(updateConfig){
				system.launchers.shortcut.push(id);
			}
		}
		
	};

	this.removeShortcut = function(id, updateConfig){
		var m = system.getModule(id);
		
		if(m && m.shortcut){
			this.shortcuts.removeShortcut(m.shortcut);
			m.shortcut = null;
			
			if(updateConfig){
				var sc = system.launchers.shortcut,
					i = 0;
				while(i < sc.length){
					if(sc[i] == id){
						sc.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
	};

	this.addQuickStartButton = function(id, updateConfig){
    	var m = system.getModule(id);
    	
		if(m && !m.quickStartButton){
			var c = m.launcher;
			
			m.quickStartButton = this.taskbar.quickStartPanel.add({
				handler: c.handler,
				iconCls: c.iconCls,
				scope: c.scope,
				text: c.text,
				tooltip: c.tooltip || c.text
			});
			
			if(updateConfig){
				system.launchers.quickstart.push(id);
			}
		}
    };
    
    this.removeQuickStartButton = function(id, updateConfig){
    	var m = system.getModule(id);
    	
		if(m && m.quickStartButton){
			this.taskbar.quickStartPanel.remove(m.quickStartButton);
			m.quickStartButton = null;
			
			if(updateConfig){
				var qs = system.launchers.quickstart,
					i = 0;
				while(i < qs.length){
					if(qs[i] == id){
						qs.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
    };

    layout();
    
    this.cmenu = new Ext.menu.Menu();
    
    this.setVisible = function(visible,animate){
    	//desktopEl.setVisible(visible,animate);
    	desktopEl.setOpacity(visible?1.0:0.0,animate);
    	//desktopEl.hide(visible,animate);
    	//Ext.get('x-desktop').hide();
    	taskbarEl.setVisible(visible,animate);
    	taskbarElTop.setVisible(visible,animate);
    };
    this.lock = function(){
    	if(!this.lockWin){
			this.lockWin = new Ext.Window({
				title:'挂机锁',
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
							html : '<div align="center" style="font-size:15px;padding-bottom:15px;">输入挂机密码,请不要与登陆密码相同!</div>'
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
							{text:'确定',handler:function(){
								cmp1 = this.ownerCt.getComponent(1);
								cmp2 = this.ownerCt.getComponent(2);
									if (cmp1.validate()&&cmp2.validate()) {
										if(cmp1.getValue()!==cmp2.getValue())
										{
											cmp2.markInvalid('两次密码不一样');
											return;
										}
										desktop.LOCKPWD = cmp1.getValue();
										this.ownerCt.hide();
										desktop.setVisible(false,true);
										if(!desktop.relockWin){
											desktop.relockWin = new Ext.Window({
												title:'挂机锁',
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
																		if(area.getValue()!==desktop.LOCKPWD)
																		{
																			area.markInvalid('密码错误');
																			//formpl.getComponent(0).fireEvent('invalid');
																			return;
																		}
																		desktop.LOCKPWD = '';
																		this.ownerCt.hide();
																		desktop.setVisible(true,true);
																	}
																}}
																]
														})
													}
											desktop.relockWin.show();
									}
								}},
								{text:'取消',handler:function(){
									this.ownerCt.hide();	
								}}
								]
						})
					}
			desktop.lockWin.show();
    };
    desktopEl.on('contextmenu', function(e){
    	if(e.target.id === desktopEl.id){
	    	e.stopEvent();
			if(!this.cmenu.el){
				this.cmenu.render();
			}
			var xy = e.getXY();
			//xy[1] -= this.cmenu.el.getHeight();
			this.cmenu.showAt(xy);
		}
	}, this);
};