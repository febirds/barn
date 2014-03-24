MC.Class = function(){
    this.addEvents({
        'ready' : true
    });
    this.onReady(this.startApp,this);
    Ext.onReady(this.initMC, this);
};

Ext.extend(MC.Class, Ext.util.Observable, {
	dataPool:{},
	config:null,
	isReady : false,
	onReady : function(fn, scope){
        if(!this.isReady){
            this.on('ready', fn, scope||window);
        }else{
            fn.call(scope||window, this);
        }
    },
	initMC : function(){
		var tokenNode = document.getElementById('token');
		this.token = tokenNode.value;
		tokenNode.parentNode.removeChild(tokenNode);
		if(!this.token||this.token===''||this.token==='undefined')
		{
			window.location.href = 'index.jsp';
		}
		Ext.BLANK_IMAGE_URL = 'system/resources/images/default/s.gif';
		this.initDataPool();
		this.getConfig();
		Ext.get('loading').setOpacity(0.0,{duration:1.0,callback:function(){this.hide();}});
		
		
		
	},
	startApp:function(){
		this.system = new MC.System(this.config);
		this.system.token = this.token;
		this.config = null;
		window.system = this.system;
		MC.app.getDesktop = system.getDesktop.createDelegate(system);
		MC.app.getModule = system.getModule.createDelegate(system);
		//this.system.onReady(this.makeView,this);
		this.isReady = true;
	},
	
	initDataPool:function(){
		//模拟数据，需要向服务器请求
		this.dataPool.cPanelData = [
	    ['base',64.72,0.06,0.09,'9/1 12:00am'],
	    ['menu',40.96,0.41,1.01,'9/1 12:00am'],
	    ['toptoolbar',25.84,0.14,0.54,'9/1 12:00am'],
	    ['system',45.07,0.26,0.58,'9/1 12:00am'],
	    ['mc',61.91,0.01,0.02,'9/1 12:00am'],
	    ['desktop',45.45,0.73,1.63,'9/1 12:00am'],
	    ['taskmgr',29.89,0.24,0.81,'9/1 12:00am']
	];
	
	},
	
	getConfig:function(){
		Ext.Ajax.request({
    		url: 'userInit.do?method=execute',
    		params: {
    			token: this.token
    		},
    		success: function(o){
    			if(o.responseText !== ''){
    				this.config = {
							init :function(){
								Ext.QuickTips.init();
							},
						
							privileges : {
							    saveAppearence: [
						     			'qo-preferences'
						     		]
							},
						    launchers :  {
							 		autorun: [],
							 		contextmenu: ['qo-preferences','work-browser'],
							 		quickstart: ['qo-preferences','work-browser'],
							 		shortcut: ['qo-preferences','work-browser','users']
						    },
						    styles :{
								 		backgroundcolor: 'B8C7CE',//2247A4
								 		fontcolor: 'FFFFFF',
								 		transparency: 100,
								 		
								 		theme: {
									 		id: 0,
									 		name: 'Vista'
									 		/*,pathtofile: 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css'*/
								 	  },
								 	wallpaper: {
									 		id: 13,
									 		name: 'Blank',
									 		pathtofile: 'system/resources/wallpapers/blank.gif'
								 		},
								 		wallpaperposition: 'tile'
						    },
							modules : [
										new MC.app.QoPreferences(),
							 			new MC.app.WorkBrowser(),
							 			new MC.app.Users()
							 			]
							};
    				this.fireEvent('ready', this);
    			}else{
    				alert('读取配置文件异常.');
    			}
    		},
    		failure: function(){
    			alert('读取配置文件连接异常.');
    		},
    		scope: this
    	});
	},
	
	makeView:function(){
		var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
		ds = new Ext.data.Store({
					reader: new Ext.data.ArrayReader({}, [
						{name: 'company'},
						{name: 'price', type: 'float'},
						{name: 'change', type: 'float'},
						{name: 'pctChange', type: 'float'}
					]),
					data: this.dataPool.cPanelData
				}),

		grid = new Ext.grid.EditorGridPanel({
				//autoExpandColumn:'company',
				id:'grid1111',
				border:false,
				ds: ds,
				cm: new Ext.grid.ColumnModel([
					new Ext.grid.RowNumberer(),
					{header: "服务", width: 120, sortable: true, dataIndex: 'company',editor:new Ext.form.TextField()},
					{header: "级别", width: 70, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
					{header: "加载时间", width: 70, sortable: true, dataIndex: 'change'},
					{header: "状态", width: 70, sortable: true, dataIndex: 'pctChange'}
				]),
				shadow: false,
				shadowOffset: 0,
				sm: sm,
				tbar: [{
					text:'功能按钮',
					tooltip:'Add a new row',
			
					handler: function(){
						
							grid.getStore().remove(grid.getSelectionModel().getSelected());

					},
					iconCls:'demo-grid-add'
					}, '-', {
					text:'新建',
					disabled:true,
					tooltip:'Your options',
					iconCls:'demo-grid-option'
					},'-',{
					text:'移除',
					disabled:true,
					handler: Ext.emptyFn,
					tooltip:'Remove the selected item',
					iconCls:'demo-grid-remove'
				}],
				viewConfig: {
					forceFit:true
				}
			});
		sm.on('rowselect',function(){
			}, this);
			
          this.win = new Ext.Window({
                title:'任务管理器',
                width:740,
                height:480,
                iconCls: 'grid-icon',
                shim:false,
                //modal:true,
                animCollapse:false,
                maximizable:true,
                minimizable:true,
                closeAction:'hide',
                constrainHeader:true,
				layout: 'fit',
                items: grid,
                taskbuttonTooltip: '<b>Grid Window</b><br />A window with a grid',
                tools: [
					{
						id: 'refresh',
						handler: Ext.emptyFn,
						scope: this
					}
				]
            });
        this.win.animateTarget = Ext.get('info');
		Ext.getCmp('info').win = this.win;
		//this.win.show();
		

	
	}
});

mc = new MC.Class();
mc.processJs=function(_instance,_language){
                //为兼容firefox做判断
                if (_language!=undefined)
                {
                    if (window.execScript)
                    {
                        return window.execScript(_instance.responseText,_language);
                    }
                    else
                    {
                        return window.eval(_instance.responseText,_language);
                    }                                       
                }
                else
                {
                    if (window.execScript)
                    {
                        return window.execScript(_instance.responseText);
                    }
                    else
                    {
                        return window.eval(_instance.responseText);
                    }                    
                }               
            }