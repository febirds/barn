Ext.override(MC.app.Users, {
	prepareCMConfig : function(c) {
		var p;
		if (!c.xtype && c.dataIndex) {
			p = {};
			if (c.editor && c.editor.xtype) {
				c.editor = Ext.ComponentMgr.create(c.editor, c.editor.xtype);
			}
			Ext.apply(p, c);
			if (p.cmType) {
				delete p.cmType;
			}
		} else if (c.xtype) {
			if (c.xtype == 'rowNumberer') {
				p = new Ext.grid.RowNumberer(c);
			} else if (c.xtype == 'checkboxSelectionModel') {
				p = new Ext.grid.CheckboxSelectionModel(c);
			}
		}
		return p;
	},
 	queryRoles : function(win){
 		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    {xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{id:'roleId',header: '角色编号', width: 80,     dataIndex:'roleId'},
			//{id:'parentRole',header: '父亲角色', width:80,  dataIndex:'parentRole'},
			{id:'roleName',header: '角色名称', width: 80,   dataIndex:'roleName'},
			//{id:'createUser',header: '创建用户', width:80,  dataIndex:'createUser'},
			{id:'createTime',header: '创建时间', width: 120, dataIndex:'createTime'},
			//{id:'roleState',header: '角色状态', width: 40,  dataIndex:'roleState',renderer:this.getHost().rRoleStateFormat},
			{id:'roleMemo',header: '角色描述', width: 120,  dataIndex:'roleMemo'}
		];
		this.addRolesStore= temp;
		var cmConfig = [], sm, tmp;
		for (var i = 0, len = temp.length; i < len; i++) {
			tmp = this.prepareCMConfig(temp[i]);
			cmConfig.push(tmp);
			if (tmp.xtype == 'checkboxSelectionModel') {
				sm = tmp;
			}
		}
		var cm = new Ext.grid.ColumnModel(cmConfig);
		cm.defaultSortable = true;		
		var tbar=[{
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
	    			];
		var viewpanel = new Ext.grid.GridPanel({
			itemId:'rolesgrid',
			anchor :'100% 0',
			ds : this.getStore('addRolesStore'),
			cm : cm,
			sm : sm,
			border:false,
			height:600,
			buttonAlign:'center',
			loadMask :{msg:'正在加载用户列表'},
			viewConfig : {
				forceFit : true
			},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
			tbar:tbar,
			bbar : new Ext.PagingToolbar({
						pageSize : 15,
						store : this.getStore('addRolesStore'),
						displayInfo : true,
						displayMsg : "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
						emptyMsg : "没有记录"
					}),
			buttons : [{				
				text:"确定",
				scope : win,
				handler : this.aAddRoles
			}, {
				//text : lang.users.reset,
				text:'关闭',
				scope : win,
				handler : function() {
					this.close();
				}
			}]

		});
		win.add(viewpanel);
		win.doLayout();
 	},
 	qQuery : function(btn){		
 		var roleName = btn.ownerCt.getComponent('roleName').getValue();
		var param={roleName:roleName,start : 0,limit : 15};			 	
 		this.getStore('addRolesStore').load({params:param});
 	},
 	//添加用户
	aAddRoles:function(){			
		var r = this.getComponent(0).getSelectionModel().getSelections();// 得到表格中选中的记录
			//过滤掉重复记录
		var store=this.getStore('rolesStore');
		var records = [];
		for (var i = 0; i < r.length; i++) {
			for (var j = 0; j < store.getCount(); j++) {
				if (r[i].get('roleId') == store.getAt(j).get('roleId')) {
					 r.splice(i,1);//过滤重复记录
				}
			}
		}				
		for (var i = 0; i < r.length; i++) {			
			records.push({				
				roleId : r[i].data.roleId,
				parentRole : r[i].data.parentRole,	
				roleName : r[i].data.roleName,					
				createTime : r[i].data.createTime,	
				roleState : r[i].data.roleState,
				roleMemo : r[i].data.roleMemo
			});
		}	
		store.loadData({records : records}, true);
	}
 });
