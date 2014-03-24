Ext.override(MC.app.Operators, {
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
	queryEmployee : function(win) {
		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    //{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{id:'cemployeeCode',header: '雇员编码',width: 150,dataIndex:'cemployeeCode'},
			{id:'cemployeeName',header: '雇员名称',width: 150,dataIndex:'cemployeeName'},
			{id:'cdepCode',header: '部门编码',width: 150,dataIndex:'cdepCode'}	,
			{id:'cdepName',header: '部门名称',width: 150,dataIndex:'cdepName'}			
		];
		this.queryEmployeeStore1 = temp;
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
		// ------传递参数---------------//
		win.add({
			// title:'报价单产品列表',
			xtype : 'grid',
			buttonAlign : 'center',
			store : this.getStore('queryEmployeeStoreOperators'),
			border : true,
			cm : cm,			
			tbar : [{
				xtype : 'label',
				text : '雇员编码:',
				width : 60
			}, {
				xtype : 'textfield',	
				itemId:'cemployeeCode',
				width:100,
				name : 'cemployeeCode'

			}, {
				xtype : 'label',
				text : '雇员名称:',
				width : 60
			}, {
				xtype : 'textfield',
				width:100,
				itemId:'cemployeeName',
				name : 'cemployeeName'
			}, {
	        		xtype:'label',   
	        		text: '所属部门：',
					width:60
	        	},	      
	        	{
	        	xtype:'combo',      			
      			store:this.getStore('cpersonCodeStoreOperators'),      					  
			    displayField:'displayField',
			    valueField:'valueField',//只有在forceSelection: true的情况下，valueField里值才会被提交，否则提交的是displayField的值							    				
				forceSelection: true,				
				hiddenName:'cdepCode',
				emptyText : '请选择',
			    width:100,
				triggerAction: 'all',
				itemId:'cdepCode',
		        name: 'cdepCode',		       	    				
				queryParam:"cdepName",  //   toolbar.getComponent("cdepCode") is undefined		       
		        minChars:1		       
	        	},
	        	/*{
				xtype : 'textfield',
				width:100,
				itemId:'cdepCode',
		        name: 'cdepCode'
				},*/
	        	{
				text : '查  询',
				iconCls:'query',
				width : 100,
				scope : win,
				handler : this.qEQuery
			}],
			viewConfig : {
				forceFit : true
			},
			bbar : new Ext.PagingToolbar({// 增加分页栏按钮设置为tbar可放置在顶部
				pageSize : 15,
				store : this.getStore('queryEmployeeStoreOperators'),
				displayInfo : true,
				displayMsg : '第{0} 到 {1} 条数据 共{2}条',
				emptyMsg : "没有数据"
			})
			
		});
		win.doLayout();
		win.buttons[0].setHandler(this.qEFormFZ,win);
		win.buttons[1].setHandler(win.close,win);
	},	
	// 查询按钮监听事件
	qEQuery : function() {
		var toolbar = this.getComponent(0).getTopToolbar();
		
		var cemployeeCode = encodeURIComponent(toolbar.getComponent('cemployeeCode').getValue());
		var cemployeeName = encodeURIComponent(toolbar.getComponent('cemployeeName').getValue());		
		var cdepCode = encodeURIComponent(toolbar.getComponent('cdepCode').getValue());		
		var param={cemployeeCode:cemployeeCode,cemployeeName:cemployeeName,cdepCode:cdepCode,start : 0,limit : 15};		
		this.getHost().getStore('queryEmployeeStoreOperators').load({params:param});		
	},		
	// 添加记录
	qEFormFZ:function() {
		
		var record = this.getComponent(0).getSelectionModel().getSelected();
		//alert(record.get('cemployeeName'));
		//alert(this.parent.title);
		//alert(this.parent.lookupI('empId').itemId);
		//alert(record.get('cemployeeCode'));
		this.parent.lookupI('empId').setValue(record.get('cemployeeCode'));
		this.parent.lookupI('zhName').setValue(record.get('cemployeeName'));
		//alert('ok');
		//this.parent.lookupI('empId').setValue(record.data.cemployeeCode);
		//this.parent.getComponent(0).getComponent(0).getForm().loadRecord(record);
		this.close();
	}
});