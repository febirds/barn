Ext.override(MC.app.Users, {
 	query : function(win){
 		//var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([ {
					header : "用户编号",
					dataIndex : "userId"
				}, {
					header : "登陆名",
					dataIndex : "logName"
				},  {
					header : "雇员编号",
					dataIndex : "empId"
				}, {
					header : "使用状态",
					dataIndex : "userState",
					renderer:this.getHost().uUserStateFormat
				}, {
					header : "用户姓名",
					dataIndex : "zhName"
				}, {
					header : "管理邮箱",
					dataIndex : "email"
				}, {
					header : "创建时间",
					dataIndex : "createTime"
				}, {
					header : "结束时间",
					dataIndex : "endTime"
				}]);
		cm.defaultSortable = true;
		var viewpanel = new Ext.grid.GridPanel({
			itemId:'usersgrid',
			anchor :'100% 0',
			ds : this.getStore('users'),
			cm : cm,
			//sm : sm,
			border:false,
			height:600,
			loadMask :{msg:'正在加载用户列表'},
			viewConfig : {
				forceFit : true
			},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
			bbar : new Ext.PagingToolbar({
						pageSize : 15,
						store : this.getStore('users'),
						displayInfo : true,
						displayMsg : "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
						emptyMsg : "没有记录"
					})

		});
		win.add({border:false,
			itemId:'ctnr',
			layout:'anchor',
			items:[{
				anchor :'100%',
				itemId:'condition',
				hidden : true,
				autoHeight:true,
				layout:'card',
				activeItem:'qTbar',
				items:[{
					xtype:'toolbar',
					itemId:'bTbar',
					items:[{
					   	xtype:'label',
		        		text: '查询条件:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
				        	name: 'tiaojian',
				        	width:80
	                    },{
					   	xtype:'label',
		        		text: '查询条件:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
				        	name: 'tiaojian',
				        	width:80
	                    },'-',{
	                    	text:"浏览",
	                    	scope:win,
	                    	iconCls:'query',
	                    	handler:this.bQuery
                    	}
	    			]
				},{
					xtype:'toolbar',
					itemId:'qTbar',
					items:[{
					   	xtype:'label',
		        		text: '登陆名称:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
	                    	itemId:'logName',
				        	name: 'logName',
				        	width:80
	                    },{
					   	xtype:'label',
		        		text: '用户名称:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
	                    	itemId:'zhName',
				        	name: 'zhName',
				        	width:80
	                    },'-',{
	                    	text:"查询",
	                    	scope:win,
	                    	iconCls:'query',
	                    	handler:this.qQuery
                    	}
	    			]
				}]
			},viewpanel]
		});
		win.doLayout();
 	},
 	qQuery : function(btn){		
 		var logName = btn.ownerCt.getComponent('logName').getValue();
 		var zhName = btn.ownerCt.getComponent('zhName').getValue();
 		//system.look(logName);
		var param={logName:logName,zhName:zhName,start : 0,limit : 15};			
 		this.getStore('users').setLink('temp');
 		this.getStore('users').load({params:param});
 	}
 });
