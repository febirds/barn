/**
 * 上边任务栏 类
 */
MC.TopTaskBar = function(desk){
    this.desk = desk;
    this.init();
};

Ext.extend(MC.TopTaskBar, Ext.util.Observable, {
	/**
	 * 菜单点击事件
	 */
	menuClick:function(item,e){
		/*
		if(typeof system.selectReg(item.id)!='object')
		{
			Ext.Ajax.request({
	    		url:'login/login.do?method=pageRightInit',
	    		params:{
	    			operId:system.config.userId,
	    			menuId:item.id
	    		},
	    		callback:function(o,f,r){
	    			if(!f)
	    			{
	    				Ext.Msg.alert("提示","获取模块权限失败！");
	    				return;
	    			}
	    			var rs = r.responseText;
	    			var right = Ext.decode(rs);
	    			system.insetReg(this.id,right);
	    			system.execute(this.id,{innerView:this.innerView?this.innerView:'browser'});
	    		},
	    		scope:item
    		});
    		return;
		}
		*/
		system.execute(item.id,{innerView:item.innerView?item.innerView:'browser'})
	},
	/**
	 * 初始化菜单
	 */
	menuInit:function(){
		var tree = system.selectReg("user.menutree");
		var result = tree.source+"";
		var menu = result.replace(/children/g,'menu');
		var is = Ext.decode(menu)[0].menu;
		try{
			this.quickMenuPanel.add(is);
		}catch(e){}
		var mp = Ext.menu.MenuMgr.get('module');
		
		for(var i=0;i<is.length;i++)
		{
			mp.addMenuItem(is[i]);
		}
		Ext.getBody().unmask();
		this.quickMenuPanel.delegateUpdates();
		system.desktop.setShortMenu(system.selectReg("user.preferences.styles").shortMenu);
	},
	/**
	 * 初始化上任务栏
	 */
    init : function(){
    	var browser = this;
    	setTimeout(function(){
    		browser.menuInit();
    	},0);
    	//模块菜单
		this.quickMenuPanel = new MC.MenuPanel({
	    	buttonWidth: 70,
  			minButtonWidth: 70,
			region:'center',
			hidden:true,
			split: true,
			width:800,
			listeners:{
			'hide':function(){
				if(!browser.menuPanel.westSplitBar)
				{
					var lyout = browser.menuPanel.getLayout();
					if(lyout['west'])
					{
						browser.menuPanel.westSplitBar = lyout['west'].getSplitBar().el;
					}
				}
				if(browser.menuPanel.westSplitBar)
				{
					browser.menuPanel.westSplitBar.hide();
				}
			},
			'show':function(){
				if(browser.menuPanel.westSplitBar)
				{
					browser.menuPanel.westSplitBar.show();
				}
				this.delegateUpdates();
								
        				 }
        			  } 
        		
		});
		var quickMenuPanel = this.quickMenuPanel;
		function hORsQMP(){
			var task = new Ext.util.DelayedTask(function(){
			if(quickMenuPanel.hidden)
			{
				
				quickMenuPanel.show();
			}else{
			
				quickMenuPanel.hide();
			}
			
			});
            task.delay(20);
			
		}
		//主功能菜单面板
		this.sysMemuPanel = new MC.MenuPanel({
	    	//id: 'uxx-menutoolbar-panel',
	    	split:true,
			region:'west',
	    	width:200,
	    	minWidth: 200,
	    	items:[{
	    			text:'系统(S)',
	    			cls:'noem',
	    			menu:new Ext.menu.Menu({items:[
					{text:'应用程序',disabled:true,scope:this,handler:function(){this.desk.createSysWindow({id:'application',title:'应用程序'}).show();}},
					{text:'个人设置',id:'preferences',innerView:'navigation',disabled:false,/*scope:this,*/handler:browser.menuClick/*function(){
						this.desk.createSysWindow({id:'set',title:'系统设置'}).show();}*/
					},
					{text:'屏幕锁',scope:this,handler:function(){this.desk.lock();}},
					{text:'安全退出',scope:this,handler:function(){
						window.location.href='index.jsp';
							/*var msgs = '当前没有任务在执行，可以安全退出.<br>';
							if(system.tasks.getCount()>1)
							{
								msgs = '有下列应用没有关闭：<br>';
								system.tasks.each(function(item,index,length){
									if(item.moduleId =='desktop')
									{
										return true;
									}
									msgs+=item.moduleId+"--"+item.title+"<br>";
								});
							}
							var w = this.desk.createSysWindow({
								id:'logout',
								width:300,
								height:200,
								minimizable:false,
								modal:true,
								title:'退出',
								html:'<div>'+msgs+'确定退出？</div>',
								buttons:[
									{text:'确定',handler:function(){system.logout();}},
									{text:'取消',handler:function(btn){btn.ownerCt.close();}}
								]
							});
							w.show();*/
						}}
					]})
	    			//,iconCls:'x-icon-done'
	    		},{
	    			text:'应用(M)',
	    			cls:'noem',
	    			menu:new Ext.menu.Menu({id: 'module',
	    									items:[/*{
	    										text:'快捷栏',
	    										checked: true,
	    										hideOnClick :false,
                								checkHandler: function(){
                									hORsQMP();
                								}
	    									},'-'*/]}),
	    			icon:'x-icon-information'
	    		},{
	    			text:'帮助(H)',
	    			cls:'noem',
	    			menu:new Ext.menu.Menu({items:[
	    			{text:'帮助',scope:this,handler:function(){
	    				var modelId = system.desktop.WindowMgr.getActive().getHost().moduleId;
	    				if(modelId!=''){
	    					 var params={modelId:modelId};//模块id
							 var url = 'buy/ob/purchaseOrder.do?method=loadHelp';
							 Ext.Ajax.request({
								url : url,
								params : params,
								method : 'POST',
								success : function(response, option) {						
									if(response.responseText=="1")
									{
										 window.open("/mcui/help/buyInfo.CHM"); 
										
									}
									else {
										this.alert("提示","帮助加载失败!!!");
									}
								},
								failure : function() {
									alert('error');
								}
							});
	    				}else{
	    					this.alert("提示","请选择相应的模块!!!");
	    				}
	    				
	    				}
	    			},
					{text:'帮助与支持中心',disabled:true,scope:this,handler:function(){this.desk.createSysWindow({id:'help',title:'帮助和支持中心'}).show();}},
					{text:'关于     本系统',disabled:false,scope:this,handler:function(){
								this.desk.createSysWindow({
									id:'about',
									title:'关于     本系统',
									width:200,
									height:260,
									maximizable:false,
									minimizable:false,
									resizable:false,
									items:[{
				        				//width:180,
										border:false,
				           				html:'<img src="images/logo.jpg" />'
				       				},{
				        				//width:180,
				       					margions:'5px 0 0 0',
				       					frame:true,
				       					border:false,
				           				html:'<span><br>本系统<br>版本 1.x.x<br><br>Copyright © </span>'
				       				}],
				       				buttons:[{text:'确定',handler:function(btn){
				       					btn.ownerCt.close();
				       				}}]
								}).show();
							}
						}
					]}),
	    				icon:'x-icon-alert'
	    		}]
		});
	
		
		
		this.trayPanel  = new MC.TrayPanel({
			//contentEl: 'uxx-quickstart-panel',
	    id: 'uxx-systemtray-panel',
	    minWidth: 140,
			region:'east',
			split: false,
			width: 140,
			layout: 'border'
		});
		var timeButton = {id:'bbb',text:new Date().dateFormat('l, n月j日 Y年'),width:80};

		//this.trayPanel.add({id:'info',tooltip:'网络状况 好',iconCls:'x-icon-information',handler:function(){/*this.win.show();*/}});
		this.trayPanel.add(timeButton);

		this.menuPanel = new Ext.Panel({
			//id: 'uxx-taskbar-panel-wrap',
			width:500,
			items: [this.quickMenuPanel,this.sysMemuPanel],
			listeners:{
			'afterlayout':function(){
					if(!this.flag)
					{
						if(!this.westSplitBar)
						{
							var lyout = this.getLayout();
							if(lyout['west'])
							{
								this.westSplitBar = lyout['west'].getSplitBar().el;
							}
						}
						if(this.westSplitBar)
						{
							this.westSplitBar.hide();
						}
						this.flag = true;
					}
				}
			},
			layout: 'border',
			region: 'center'
		});
		var panelWrap = new Ext.Panel({
			id: 'uxx-taskbar-panel-wrap',
			items: [this.menuPanel,this.trayPanel],
			layout: 'border',
			region: 'center'
		});
		
		
        var container = new MC.TaskBarContainer({
			el: 'uxx-taskbar',
			cls:'xx-taskbar',
			layout: 'border',
			items: [/*sbBox,*/panelWrap]/*---------------------------------------------------------------------------------------------------------------*/
		});
		
		this.el = container.el;
		
		return this;
    },
    /**
     * 
     */
	setActiveButton : function(btn){
		this.taskButtonPanel.setActiveButton(btn);
	}
});
