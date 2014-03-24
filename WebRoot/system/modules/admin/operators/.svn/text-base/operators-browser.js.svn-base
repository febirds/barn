Ext.override(MC.app.Operators, {
 	browser : function(win){
 		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    //{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{header : "操作员编号",dataIndex : "operId"},
			{header : "登陆名",dataIndex : "operName"},
			{header : "职员名称",dataIndex : "cemployeeName"},
			//{header : "使用状态",dataIndex : "userState",renderer:this.getHost().uUserStateFormat},
			{header : "操作员姓名",dataIndex : "zhName"},
			{header : "管理邮箱",dataIndex : "coMail"}
			//{header : "创建时间",dataIndex : "createTime"},
			//{header : "结束时间",dataIndex : "endTime"}
		];
		this.queryOperatorsStore1= temp;
		var cmConfig = [], sm, tmp;
		for (var i = 0, len = temp.length; i < len; i++) {
			tmp = system.prepareCMConfig(temp[i]);
			cmConfig.push(tmp);
			if (tmp.xtype == 'checkboxSelectionModel') {
				sm = tmp;
			}
		}
		var cm = new Ext.grid.ColumnModel(cmConfig);
		cm.defaultSortable=true;
		var viewpanel = new Ext.grid.GridPanel({
			itemId:'operatorsgrid',
			anchor :'100% 0',
			ds : this.getStore('operators'),
			cm : cm,
			//sm : sm,
			border:false,
			height:600,
			loadMask :{msg:'正在加载用户列表'},
			viewConfig : {//一个用于gird ui 视图的配置对象.Ext.grid.GridView中所有的配置项都可以在这设置.
				forceFit : true//Ture表示自动扩展或缩小列的宽度以适应grid的宽度,从而避免出现水平滚动条.
			},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
			bbar : new Ext.PagingToolbar({
						pageSize : 50,
						store : this.getStore('operators'),
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
				activeItem:'qTbar',//活跃的Item,即生效的组件的itemId
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
	                    	itemId:'operName',
				        	name: 'operName',
				        	width:80
	                    },{
					   	xtype:'label',
		        		text: '操作员名称:',
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
	                    	handler:this.qQueryOperators
                    	}
	    			]
				}]
			},viewpanel]
		});
		win.doLayout();
 	},
 	qQueryOperators : function(btn){		
 		var operName = btn.ownerCt.getComponent('operName').getValue();
 		var zhName = btn.ownerCt.getComponent('zhName').getValue();
 		//system.look(operName);
		//var param={operName:operName,zhName:zhName,start : 0,limit : 15};			
 		//this.getStore('operators').setLink('temp');
 		//var s = this.getStore('operators').load({params:param});
		var s = this.getStore('operators');
		s.baseParams.operName=operName;
		s.baseParams.zhName=zhName;	
		s.load({params:{start : 0,limit : 50}});
 	}
 });
