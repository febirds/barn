Ext.override(MC.app.Operatorright, {
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
			header : "结清",
			dataIndex : "clearRight",
			renderer:this.vPaymentModeFormat},
			{id:'moneyRight',
			header : "金额",
			dataIndex : "moneyRight",
			renderer:this.vPaymentModeFormat}
		];
		this.OperatorRightStore= temp;
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
			ds : this.getStore('OperatorRightStore'),
			cm : cm,
			//sm : sm,
			border:false,
			height:600,
			loadMask :{msg:'正在加载操作员列表'},
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
	var treepanelForOperators = new Ext.tree.TreePanel({
		region: 'west',
		width:200,
        title: '系统菜单树',
        onlyLeafCheckable:false, 
        bodyBorder:true,
        split:true,   
        animate: false,  
        rootVisible: false,
        autoScroll:true,
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
    treepanelForOperators.on('click', function(menu){
    	var menuId = menu.id;
		var operId = this.getComponent(0).getTopToolbar().getComponent(1).getValue();
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
			//disabled:this.getComponent(0).getComponent(0).getComponent(0).getValue()=="1"?true:false,
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
		this.OperatorRightStore= temp2;
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
		var params = {operId:operId,menuId:menuId};
		var url = "adminTwo/operatorRight/operatorRight.do?method=queryOperatorRights";
		this.body.mask('请稍候...', 'x-mask-loading');
		Ext.Ajax.request({
			url:url,
			params:params,
			method:'POST',
			scope:this,
			success : function(response,option) {
				var json = response.responseText;
				//system.look(json);
				var resObj = Ext.decode(json);	
				//system.look(resObj);
				
				var record = resObj.records;
				//system.look(record);
				var strArray = ["enterRight","addRight","updateRight","selectRight","deleteRight","printRight","checkRight","clearRight","moneyRight"];
				//alert(strArray.length);
				//this.checkNull(strArray,resObj.records );
				//
				if(record.length>0)
				{
					//alert(record.length);
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
					this.getStore('OperatorRightStore').loadData(resObj);// 加载grid
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
    // 加载树布局的Panel
	/*var panel = new Ext.Panel({
		id:'parent',  
        region: 'west',
        title: '系统菜单树',
        width: 200,
		autoScroll: true,
        split: true,
        items:[treepanelForOperators]
    });*/
	
	// 页面框架

	var main = new Ext.Panel({
		layout:'border',  
		width:300,
		tbar:[
				
				{xtype:'label',text: '操作员编号:',width:60},
	            {xtype:'textfield',itemId:'operId',name: 'operId',width:80},
	            {xtype:'label',text: '操作员名称:',width:60},
	            {xtype:'textfield',itemId:'zhName',name: 'zhName',width:80}
	            ,'-', {
						text : '全选',
						iconCls : 'start',
						scope:win,
						handler : this.selectAll
					}, '-', {
						text : '反选',
						iconCls : 'stop',
						scope:win,
						handler : this.disSelectAll
					}, '-',{
						text : '保存',
						iconCls : 'save',
						scope : win,
						handler : this.raSave
					}, '-'
			
		],
		items:[rightGrid,treepanelForOperators]
	});
		win.add(main);
		win.doLayout();	
		if(win.innerArgs)
		{			
			win.body.mask('loading');
			var url = 'adminTwo/operator/operator.do?method=queryOperator';
		    var params={operId:win.innerArgs};
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){
					var f1 = this.getComponent(0).getTopToolbar().getComponent(1);
					var f2 = this.getComponent(0).getTopToolbar().getComponent(3);
					var json = response.responseText;
					var resObj = Ext.decode(json);
					f1.setValue(resObj.form.operId);
					f2.setValue(resObj.form.zhName);						
					this.body.unmask();
				},
				failure : function(){
					this.body.unmask();
					alert('error');
				}
			});
			
		}
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
	
	aModify:function(){	
		this.getHost().rModifySave.call(this);
	},
	aCloseWin:function(){
		this.close();
	},
	selectAll:function(){
		var store=this.getStore('OperatorRightStore');
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
		var store=this.getStore('OperatorRightStore');
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
	getRolesIds : function(records) {
		var datas = new Array();
		for (var i = 0; i < records.length; i++) {
			datas[i] = records[i].data;
		}
		var json = Ext.util.JSON.encode(datas);
		return json;
	},
	raSave:function(){
		//alert('raSave');
		
		var operatorId = this.getComponent(0).getTopToolbar().getComponent(1).getValue();
		//alert(operatorId);
		//system.look(this.getComponent(0).getComponent(1));
		///alert('xxx');
		if(this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode()==null||this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode()==""){
		this.alert("提示","请选择相应的菜单树");
		return;
			
		}
		var menuId = this.getComponent(0).getComponent(1).getSelectionModel().getSelectedNode().id;
		//system.look(menuId);
		var records = this.getStore('OperatorRightStore').getRange(0,this.getStore('OperatorRightStore').getCount());
		var gridJson = this.getHost().getRolesIds(records);
		//system.look(gridJson);
		var params = {operatorId:operatorId,menuId:menuId,gridJson:gridJson}
		var url = "adminTwo/operatorRight/operatorRight.do?method=add";
		this.body.mask('请稍候...', 'x-mask-loading');
		Ext.Ajax.request({
			url:url,
			params:params,
			method:'POST',
			scope:this,
			success : function(result, request) {												
				this.body.unmask();
				this.alert('提示', '分配权限成功!');
				//this.getStore('OperatorRightStore').reload();
				//this.lookupI("operatorForm").form.reset();																				
			},
			failure : function(form, action) {					
				this.alert('执行失败', '分配权限失败!');
				this.body.unmask();
			}
		});
		
	},
	checkNull : function(strArray,records){
		alert("ok");
		for(var i=0;i<strArray.length;i++){
			
			if(records.get(strArray[i])==null||""==records.get(strArray[i])){
			
				records.set(strArray[i],"0");
			}
		}
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