Ext.override(MC.app.Role, {
	browser : function(win) {	
		// 字段列配置
		//var sm = new Ext.grid.CheckboxSelectionModel();
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    //{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{id:'roleId',header: '角色编号', width: 80,     dataIndex:'roleId'},			
			{id:'roleName',header: '角色名称', width: 80,   dataIndex:'roleName'},
			{id:'createTime',header: '创建日期', width:80,  dataIndex:'createTime'}//,
			//{id:'cCreatePerson',header: '录入者编号', width:80,  dataIndex:'cCreatePerson'},
			//{id:'cCreateDate',header: '录入时间', width: 80, dataIndex:'cCreateDate'},
			//{id:'cChangePerson',header: '修改者编号', width: 40,  dataIndex:'cChangePerson'},
			//{id:'cChangeDate',header: '修改时间', width: 100,  dataIndex:'cChangeDate'}			
		];
		this.roles= temp;
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
			itemId:'rolegrid',
			anchor :'100% 0',
			ds : this.getStore('roles'),
			cm : cm,			
			border:false,
			height:600,
			loadMask :{msg:'正在加载用户列表'},
			viewConfig : {forceFit : true},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
			bbar : new Ext.PagingToolbar({
						pageSize : 50,
						store : this.getStore('roles'),
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
		        		text: '角色名称:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
	                    	itemId:'roleName',
				        	name: 'roleName',
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
		// ------传递参数---------------//		
		win.doLayout();
		//win.buttons[0].setHandler(this.qForward, win);		
		//win.buttons[1].setHandler(win.close, win);		
	},
	// 查询按钮监听事件
	qQuery : function(btn) {
		var roleName = btn.ownerCt.getComponent('roleName').getValue();	
		var s = this.getStore('roles');
		s.baseParams.roleName=roleName;
		s.load({params:{start : 0,limit : 50}});
		/*var param={roleName:roleName,start : 0,limit : 15};			
 		this.getStore('roles').setLink('temp');
 		this.getStore('roles').load({params:param});*/
	}	
});