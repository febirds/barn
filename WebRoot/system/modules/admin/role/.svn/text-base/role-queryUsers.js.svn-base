Ext.override(MC.app.Role, {
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
 	queryUsers : function(win){
 		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    {xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{header : "操作员编号",dataIndex : "operId"},
			{header : "登陆名",dataIndex : "operName"},
			//{header : "雇员编号",dataIndex : "cemployeeName"},
			//{header : "使用状态",dataIndex : "userState",renderer:this.getHost().uUserStateFormat},
			{header : "操作员姓名",dataIndex : "zhName"},
			{header : "管理邮箱",dataIndex : "coMail"}
		];
		this.queryUsersStore = temp;
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
	                    	handler:this.qQuery
                    	}
	    			];
		var viewpanel = new Ext.grid.GridPanel({
			itemId:'usersgrid',
			anchor :'100% 0',
			ds : this.getStore('queryUsersStore'),
			cm : cm,
			sm : sm,
			border:false,
			height:800,
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
						store : this.getStore('queryUsersStore'),
						displayInfo : true,
						displayMsg : "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
						emptyMsg : "没有记录"
					}),
			buttons : [{				
				text:"确定",
				scope : win,
				handler : this.aAddUsers
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
 		var operName = btn.ownerCt.getComponent('operName').getValue();
 		var zhName = btn.ownerCt.getComponent('zhName').getValue();
 		//system.look(logName);
		var param={operName:operName,zhName:zhName,start : 0,limit : 15};			 	
 		this.getStore('queryUsersStore').load({params:param});
 	},
 	//添加用户
	aAddUsers:function(){			
		var r = this.getComponent(0).getSelectionModel().getSelections();// 得到表格中选中的记录
			//过滤掉重复记录
		var store=this.getStore('userStore');
		var records = [];
		for (var i = 0; i < r.length; i++) {
			for (var j = 0; j < store.getCount(); j++) {
				if (r[i].get('operId') == store.getAt(j).get('operId')) {
					 r.splice(i,1);//过滤重复记录
				}
			}
		}	
		if(r.length>0){
			for (var i = 0; i < r.length; i++) {			
				records.push({				
					operId : r[i].data.operId,
					operName : r[i].data.operName,
					cemployeeName : r[i].data.cemployeeName,
					zhName : r[i].data.zhName,
					coMail : r[i].data.coMail				
				});
			}
			store.loadData({records : records}, true);
		}
		this.close();
	}
 });
