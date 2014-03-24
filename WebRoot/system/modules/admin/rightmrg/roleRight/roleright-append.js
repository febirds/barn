Ext.override(MC.app.Roleright, {
	append : function(win) {
		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
			{id:'enterRight',
			header : "进入",
			dataIndex : "enterRight",
			renderer:this.vPaymentModeFormat},
			{id:'addRight',
			header : "新增",
			dataIndex : "addRight",
			renderer:this.vPaymentModeFormat},
			{id:'updateRight',
			header : "修改",
			dataIndex : "updateRight",
			renderer:this.vPaymentModeFormat},		
			{id:'selectRight',
			header : "查询",
			dataIndex : "selectRight",
			renderer:this.vPaymentModeFormat},
			{id:'deleteRight',
			header : "删除",
			dataIndex : "deleteRight",
			renderer:this.vPaymentModeFormat},
			{id:'printRight',
			header : "打印",
			dataIndex : "printRight",
			renderer:this.vPaymentModeFormat},
			{id:'checkRight',
			header : "签核",
			dataIndex : "checkRight",
			renderer:this.vPaymentModeFormat},
			{id:'clearRight',
			header : "结清",dataIndex : "clearRight",
			renderer:this.vPaymentModeFormat},
			{id:'moneyRight',
			header : "金额",
			dataIndex : "moneyRight",
			renderer:this.vPaymentModeFormat}
		];
		this.RoleRightStore= temp;
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
		var rightGrid = new Ext.grid.EditorGridPanel({
			region: 'center',
			itemId:'rightGrid',
			anchor :'100% 0',
			ds : this.getStore('RoleRightStore'),
			cm : cm,
			//sm : sm,
			border:false,
			height:600,
			loadMask :{msg:'正在加载用户列表'},
			viewConfig : {
				forceFit : true
			},
			listeners:{
				afteredit:function(e){
					//alert(e.record.get('enterRight'));
					if(e.field=="enterRight"&&e.value=="0")
					{
						this.getHost().disSelectAll();
					}
					if(e.record.get('enterRight')=="0"&&e.field!="enterRight"){
						this.alert("提示","先分配进入权限,再分配其他权限");
						this.getHost().disSelectAll();
					}
					
				},
				scope:this
			},
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					})
			});		
		// 树模块
	var treepanelForRole = new Ext.tree.TreePanel({
         onlyLeafCheckable:false, 
         bodyBorder:true,
         title: '系统菜单树',
         region: 'west',
        width: 200,
        split:true,  
        animate: false,  
        rootVisible: false,
        autoScroll:true,
        height:427,
        // 加载树节点JSON数据
        loader: new Ext.tree.TreeLoader({  
        	dataUrl:'adminTwo/menu/menu.do?method=loadMenuTree',  
        	baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI }  
       }),                  
		root: new Ext.tree.AsyncTreeNode({  
      	  	id:'root',text:'根结点'  
        })  
    });
	// 树的单击事件
    treepanelForRole.on('click', function(menu){
    	var menuId = menu.id;
		var roleId = this.getComponent(0).getTopToolbar().getComponent(1).getValue();
		var menuId = menu.id;
		var temp2=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
			{id:'enterRight',
			header : "进入",
			width: 60,
			dataIndex : "enterRight",
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			renderer:this.getHost().vPaymentModeFormat},
			{id:'addRight',
			header : "新增",
			dataIndex : "addRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),	
			hidden:menu.leaf=="true"?false:true,
			renderer:this.getHost().vPaymentModeFormat},
			{id:'updateRight',
			header : "修改",
			dataIndex : "updateRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),	
			hidden:menu.leaf=="true"?false:true,
			renderer:this.getHost().vPaymentModeFormat},		
			{id:'selectRight',
			header : "查询",
			dataIndex : "selectRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,
			renderer:this.getHost().vPaymentModeFormat},
			{id:'deleteRight',
			header : "删除",
			dataIndex : "deleteRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,	
			renderer:this.getHost().vPaymentModeFormat},
			{id:'printRight',
			header : "打印",
			dataIndex : "printRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        //width: 100,
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,	
			renderer:this.getHost().vPaymentModeFormat},
			{id:'checkRight',
			header : "签核",
			dataIndex : "checkRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,	
			renderer:this.getHost().vPaymentModeFormat},
			{id:'clearRight',
			header : "结清",
			dataIndex : "clearRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,
			renderer:this.getHost().vPaymentModeFormat},
			{id:'moneyRight',
			header : "金额",
			dataIndex : "moneyRight",
			width: 60,
			editor:new Ext.form.ComboBox({
		        mode: 'local',
		        triggerAction: 'all',
		        valueField: 'value',
		        displayField: 'text',
		        readOnly: true,
		        store: new Ext.data.SimpleStore({
		            fields: ['value', 'text'],
		            data: [['1', '有'], ['0', '没有']]
		        })
			}),
			hidden:menu.leaf=="true"?false:true,	
			renderer:this.getHost().vPaymentModeFormat}
		];
		this.RoleRightStore= temp2;
		var cmConfig = [], sm, tmp;
		for (var i = 0, len = temp2.length; i < len; i++) {
			tmp = system.prepareCMConfig(temp2[i]);
			cmConfig.push(tmp);
			if (tmp.xtype == 'checkboxSelectionModel') {
				sm = tmp;
			}
		}
		var cm2 = new Ext.grid.ColumnModel(cmConfig);
		cm2.defaultSortable=true;		
		rightGrid.reconfigure(rightGrid.getStore(),cm2);					
		var params = {roleId:roleId,menuId:menuId};
		var url = "adminTwo/roleRight/roleRight.do?method=queryRoleRight";
		this.body.mask('请稍候...', 'x-mask-loading');
		Ext.Ajax.request({
			url:url,
			params:params,
			method:'POST',
			scope:this,
			success : function(response,option) {
				var json = response.responseText;
				var resObj = Ext.decode(json);	
				var record = resObj.grid.records;
				var strArray = ["enterRight","addRight","updateRight","selectRight","deleteRight","printRight","checkRight","clearRight","moneyRight"];
				if(record.length>0)
				{
					for(var i=0;i<strArray.length;i++){
						//system.look(record[0]);
						//alert(record[0].enterRight);
						//alert(record[0][strArray[i]]);
						
						if(record[0][strArray[i]]==null||""==record[0][strArray[i]]){
							//alert(record[0][strArray[i]]);
							record[0][strArray[i]]="0";
							//alert(record[0][strArray[i]]);
						}
					}
					this.getStore('RoleRightStore').loadData(resObj.grid);// 加载grid
				}else{
					var store=rightGrid.getStore();
		    		store.removeAll();
					var person=new Ext.data.Record({
			                	enterRight:"0",
			                	addRight:"0",
						        updateRight:"0",
						        selectRight:"0",
						        deleteRight:"0",
						        printRight:"0",
						        checkRight:"0",
						        clearRight:"0",
						        moneyRight:"0"
						        });
					store.insert(0,person);
				}
			this.body.unmask();
			//this.lookupI("operatorForm").form.reset();																				
		},
		failure : function(form, action) {					
			this.alert('执行失败', '出错!');
			this.body.unmask();
		}
	});
    },win);
	/*var panel = new Ext.Panel({
		id:'parent',  
        region: 'west',
        title: '系统菜单树',
        width: 200,
		autoScroll: true,
        split: true,
        items:[treepanelForRole]
    });*/
	
	// 页面框架
	var main = new Ext.Panel({
		layout:'border',  
		width:300,
		tbar:[
				{xtype:'label',text: '角色编号:',width:60},
	            {xtype:'textfield',itemId:'roleId',name: 'roleId',width:80},
	            {xtype:'label',text: '角色名称:',width:60},
	            {xtype:'textfield',itemId:'roleName',name: 'roleName',width:80}//,'-',
	           // {text:"查询",scope:win,iconCls:'query',handler:this.qQuery}
	            ,'-', {
						text : '全选',
						iconCls : 'start',
						scope:this,
						handler : this.selectAll
					}, '-', {
						text : '反选',
						iconCls : 'stop',
						scope:this,
						handler : this.disSelectAll
					}, '-',{
						text : '保存',
						iconCls : 'save',
						scope : win,
						handler : this.aSave
					}, '-'
	            ],
		items:[rightGrid,treepanelForRole]
	});
		win.add(main);
		win.doLayout();		
		if(win.innerArgs)
		{			
			win.body.mask('loading');
			var url = 'adminTwo/role/role.do?method=queryRole';
		    var params={roleId:win.innerArgs};
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){
					var f1 = this.getComponent(0).getTopToolbar().getComponent(1);
					var f2 = this.getComponent(0).getTopToolbar().getComponent(3);
					//var f3 = this.getComponent(0).getComponent(0).getComponent(0);
					//system.look(this.getComponent(0).getComponent(0).title);
					var json = response.responseText;
					var resObj = Ext.decode(json);
					f1.setValue(resObj.form.roleId);
					f2.setValue(resObj.form.roleName);	
					/*if(resObj.grid!=null)
					{
						this.getStore('RoleRightStore').loadData(resObj.grid);// 加载grid
					}	*/				
					this.body.unmask();
				},
				failure : function(){
					this.body.unmask();
					alert('error');
				}
			});
			
		}
		//win.buttons[0].setHandler(this.aForward,win);
		//win.buttons[1].setHandler(this.aCloseWin,win);
	},
	/*aForward:function(){
		if(this.innerArgs&&this.winId=="modify"){			
			this.getHost().aModify.call(this);//修改
		}
		else if(this.innerArgs&&winId=="lookDetails"){
			//this.getHost().aModify.call(this);//查看详细
		}
		else {	
			this.getHost().aSave.call(this);//新增
		}		
	},*/
	getRolesIds : function(records) {
		var datas = new Array();
		for (var i = 0; i < records.length; i++) {
			datas[i] = records[i].data;
		}
		var json = Ext.util.JSON.encode(datas);
		return json;
	},
	
	//保存修改
	
	aSave:function(){
		if(this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode()==null||this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode()==""){
		this.alert("提示","请选择相应的菜单树");
		return;	
		}
		var roleId = this.getComponent(0).getTopToolbar().getComponent(1).getValue();
		var menuId = this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode().id;
		var records = this.getStore('RoleRightStore').getRange(0,this.getStore('RoleRightStore').getCount());
		var gridJson = this.getHost().getRolesIds(records);
		var params = {roleId:roleId,menuId:menuId,gridJson:gridJson}
		var url = "adminTwo/roleRight/roleRight.do?method=add";
		this.body.mask('请稍候...', 'x-mask-loading');
		Ext.Ajax.request({
			url:url,
			params:params,
			method:'POST',
			scope:this,
			success : function(result, request) {												
								this.body.unmask();
								this.alert('提示', '分配权限成功!');
								//this.getStore('RoleRightStore').reload();
								//this.lookupI("operatorForm").form.reset();																				
					},
					failure : function(form, action) {					
						this.alert('执行失败', '分配权限失败!');
						this.body.unmask();
	
					}
		});
		
	
		//system.look(this);
		//this.getHost().rSave.call(this);
	},
	//保存修改
	aModify:function(){	
		this.getHost().rModifySave.call(this);
	},
	aCloseWin:function(){
		this.close();
	},
	selectAll:function(){
		var store=this.getStore('RoleRightStore');
    		store.removeAll();
			var person=new Ext.data.Record({
	                	enterRight:"1",
	                	addRight:"1",
				        updateRight:"1",
				        selectRight:"1",
				        deleteRight:"1",
				        printRight:"1",
				        checkRight:"1",
				        clearRight:"1",
				        moneyRight:"1"
				        });
			store.insert(0,person);
	},
	disSelectAll:function(){
		var store=this.getStore('RoleRightStore');
    		store.removeAll();
			var person=new Ext.data.Record({
	                	enterRight:"0",
	                	addRight:"0",
				        updateRight:"0",
				        selectRight:"0",
				        deleteRight:"0",
				        printRight:"0",
				        checkRight:"0",
				        clearRight:"0",
				        moneyRight:"0"
				        });
			store.insert(0,person);
	},
	vPaymentModeFormat:function(key){
		switch(key)
	  	{
	  		case  '0':
	  		return "没有";
	  		break;
	  		case '1':
	  		return "有";
	  		break;
	  	}
	}
});