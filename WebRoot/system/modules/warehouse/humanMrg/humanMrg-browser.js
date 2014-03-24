Ext.override(MC.app.HumanMrg, {
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
 	browser : function(win){
 		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    //{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{header : "用户编号",dataIndex : "userId"},
			{header : "登陆名",dataIndex : "logName"},
			{header : "雇员编号",dataIndex : "empId"},
			{header : "使用状态",dataIndex : "userState",renderer:this.getHost().humanMrgStateFormat},
			{header : "用户姓名",dataIndex : "zhName"},
			{header : "管理邮箱",dataIndex : "email"},
			{header : "创建时间",dataIndex : "createTime"},
			{header : "结束时间",dataIndex : "endTime"}
		];
		this.queryHumanMrgStore= temp;
		var cmConfig = [], sm, tmp;
		for (var i = 0, len = temp.length; i < len; i++) {
			tmp = this.prepareCMConfig(temp[i]);
			cmConfig.push(tmp);
			if (tmp.xtype == 'checkboxSelectionModel') {
				sm = tmp;
			}
		}
		var cm = new Ext.grid.ColumnModel(cmConfig);
		cm.defaultSortable=true;
		var viewpanel = new Ext.grid.GridPanel({
			itemId:'humanMrggrid',
			anchor :'100% 0',
			ds : this.getStore('humanMrg'),
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
						store : this.getStore('humanMrg'),
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
 		this.getStore('humanMrg').setLink('temp');
 		this.getStore('humanMrg').load({params:param});
 	}
 });
