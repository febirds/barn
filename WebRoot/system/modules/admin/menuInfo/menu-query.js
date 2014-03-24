Ext.override(MC.app.Menu, {
	query: function(win) {	
		// 字段列配置
	//var sm = new Ext.grid.CheckboxSelectionModel();
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    //{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{id:'menuId',header: '菜单编号', width: 80,     dataIndex:'menuId'},
			{id:'menuName',header: '菜单名称', width:80,  dataIndex:'menuName'}
			//{id:'roleName',header: '父菜单编号', width:100,   dataIndex:'roleName'},
			//{id:'menuParentName',header: '父菜单名称', width:80,  dataIndex:'menuParentName'}
			//,
			//{id:'cCreatePerson',header: '创建者编号', width:80,  dataIndex:'cCreatePerson'},
			//{id:'createTime',header: '创建时间', width: 80, dataIndex:'createTime'},
			//{id:'cChangePerson',header: '修改者编号', width: 40,  dataIndex:'cChangePerson'},
			//{id:'cChangeDate',header: '修改时间', width: 100,  dataIndex:'cChangeDate'}			
		];
		this.menuStore= temp;
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
			itemId:'menuGrid',
			anchor :'100% 0',
			ds : this.getStore('menuStore'),
			cm : cm,			
			border:false,			
			loadMask :{msg:'正在加载用户列表'},
			//viewConfig : {forceFit : true},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
			tbar:[
				{
					   	xtype:'label',
		        		text: '菜单编号:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
	                    	itemId:'menuId',
				        	name: 'menuId',
				        	width:80
	                    },{
					   	xtype:'label',
		        		text: '菜单名称:',
						width:60
	                    },
	                    {
	                    	xtype:'textfield',
	                    	itemId:'menuName',
				        	name: 'menuName',
				        	width:80
	                    },'-',{
	                    	text:"查询",
	                    	scope:win,
	                    	iconCls:'query',
	                    	handler:this.qQueryMenu
                    	}
			],
			bbar : new Ext.PagingToolbar({
						pageSize : 50,
						store : this.getStore('menuStore'),
						displayInfo : true,
						displayMsg : "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
						emptyMsg : "没有记录"
					})

		});
		win.add(viewpanel);
		// ------传递参数---------------//		
		win.doLayout();
		win.buttons[1].setHandler(win.close, win);		
		win.buttons[0].setHandler(this.qVFormFZ, win);
		
	},
	// 查询按钮监听事件
	qQueryMenu : function(btn) {
		var menuId=btn.ownerCt.getComponent('menuId').getValue();		
		var menuName = btn.ownerCt.getComponent('menuName').getValue();	
		var s = this.getStore('menuStore');
		s.baseParams.menuId=menuId;
		s.baseParams.menuName=menuName;	
		s.load({params:{start : 0,limit : 50}});
//		var param={menuId:menuId,menuName:menuName,start : 0,limit : 50};			
// 		this.getStore('menuStore').setLink('temp');
// 		this.getStore('menuStore').load({params:param});
	},
	// 向form中对应字段赋值
	qVFormFZ : function() {
		 var record = this.lookupI('menuGrid').getSelectionModel().getSelected();		
		 this.parent.lookupI('menuParentId').setValue(record.data.menuId);	
		 this.parent.lookupI('menuParentName').setValue(record.data.menuName);	
		this.close();
	}	              
});