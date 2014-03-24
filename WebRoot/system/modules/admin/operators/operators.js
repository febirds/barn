Ext.ns('MC.app');
MC.app.Operators = Ext.extend(MC.Window, {
 	title:'操作员管理',
 	moduleId:'operators',
 	clearer:['operators'],//再加载前可以清空数据
 	hasStatusBar : true,
 	welcome : function(win){
 		win.add({
 			html:lang.users.welcome_msg
 		});
 		win.doLayout();
 	},
 	initConfig : function(c){
 		return {
 			tbar : [{
						text : '新增',
						iconCls : 'add',
						disabled : c.right.addRight == 1 ? false : true,
						scope:this,
						handler : this.popAppendOperators
					},{
						text : '修改操作员',
						iconCls : 'modify',
						style : 'margin-right:5px;',
						disabled : c.right.updateRight == 1 ? false : true,
						scope:this,
						handler : this.popModifyOperators
					},'-',{
						text : '查询',
						style : 'margin-left:5px;margin-right:5px;',
						itemId:'qBtn',
						disabled : c.right.selectRight == 1 ? false : true,
						//xtype:'tbsplit',
				        scope:this,
						iconCls : 'query',
						handler : this.popQueryOperators
					},'-',
					{
						text : '为操作员添加角色',
						style : 'margin-left:5px;',
						scope : this,
						disabled : c.right.updateRight == 1 ? false : true,
						iconCls : 'add',
						handler : this.uAddRoles
					}
					]
 		};
 	},
 	createStore : function(id){
 		if(id === 'operators')
			{
				var rm = [];
				var tp = this.queryOperatorsStore1;//此queryOperatorsStore1是在operators-browser中this.queryOperatorsStore1= temp;声明的
				for (var i = 0, len = tp.length; i < len; i++) {
					rm.push({
						name : tp[i].dataIndex,
						type : tp[i].cmType ? tp[i].cmType : 'string'
					});
				}
				var queryOperatorsStore = new Ext.data.Store({
					autoLoad : false,
					storeId : 'operators',
					linkId :'base',//这里不写默认的就是'base'
					proxy : new Ext.data.HttpProxy({url : 'adminTwo/operator/operator.do?method=queryOperators'}),
					reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
					}, Ext.data.Record.create(rm))
				});
				queryOperatorsStore.registLinks([{
					linkId : 'temp',
					baseParams : {},
					proxy : new Ext.data.HttpProxy({url : 'adminTwo/operator/operator.do?method=queryOperators'}),
					reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
					}, Ext.data.Record.create(rm))

				}]);
			}
			
			/*else if(id === 'userState'){
				new Ext.data.SimpleStore({
									storeId : 'userState',
									fields : ["displayText", "retrunValue"],
									//data : [[1, '正常'], [2, '待审'], [0, '停用']]
									data : [['启用',1], [ '正在使用',2], ['停用',0]]
								});
			}*/
			//用户store
		else if (id === 'rolesStore') {
			var rm = [];
			var tp = this.rstore;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var rolesStore = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'rolesStore',
				proxy : new Ext.data.HttpProxy({url:'admin/role/role.do?method=getRoles'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		else if (id === 'addRolesStore') {
			var rm = [];
			var tp = this.addRolesStore1;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var addRolesStore = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'addRolesStore',
				proxy : new Ext.data.HttpProxy({url:'adminTwo/role/role.do?method=queryRoles'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		else if (id === 'queryEmployeeStoreOperators') {
			var rm = [];
			var tp = this.queryEmployeeStore1;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			//雇员store
			var queryEmployeeStoreOperators = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'queryEmployeeStoreOperators',
				proxy : new Ext.data.HttpProxy({url:'buy/ip/inquirePrice.do?method=queryEmployee'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		else if (id === 'cpersonCodeStoreOperators') {
			new Ext.data.Store({
				storeId : 'cpersonCodeStoreOperators',
				proxy : new Ext.data.HttpProxy({//queryDepartment
					url : 'adminTwo/operator/operator.do?method=queryDepartment'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, 
				Ext.data.Record.create([{
					name : 'valueField',
					mapping : 'cdepCode'
				},{
					name : 'displayField',
					mapping : 'cdepName'
				}]))

			})
		} 
		
 	},
 	popAppendOperators : function(){
 		this.createWindow({
			width : 398,
			height : 290,
			title : '新增操作员',
			border:false,
			maximizable : true,
			innerView:'append'
		}).show();
 	},
 	popBrowser : function(btn){
 		if(btn.itemId =='bConditionBtn')
 		{
 			var cp = this.getComponent('ctnr').getComponent('condition');
 			if(cp.isVisible())
 			{
 				if(cp.getLayout().activeItem.itemId!='bTbar')
 				{
 					cp.getLayout().setActiveItem('bTbar');
 				}else{
 					cp.setVisible(false);
 					this.doLayout();
 					//system.look(this.layout);
 					//this.getI('ctnr').doLayout(true);
 					//this.setHeight(this.getSize().height-1);
 					//this.updateBox(this.getSize());
 					//var box = this.getSize();
 					//this.fireEvent("resize", this, box.width, box.height-1);
 				}
 			}else{
 				cp.setVisible(true);
 				//this.getI('ctnr').doLayout(true);
 				this.doLayout();
 				//var box = this.getSize();
 				//this.fireEvent("resize", this, box.width, box.height+1);
 				//this.updateBox(this.getSize());
 				//this.setHeight(this.getSize().height+1);
 				if(cp.getLayout().activeItem.itemId!='bTbar')
 				{
 					cp.getLayout().setActiveItem('bTbar');
 				}
 			}
 		}else if(btn.itemId =='bBtn')
 		{
 			if(this.getHost().visibleCondition.call(this,false))
 			{
 				this.setHeight(this.getSize().height-1);
 			}
 			this.getStore('operators').setLink('base');
 			this.getStore('operators').load({
 				params:{
 					start:0,
	 				limit:15
	 				//,sort:'',
	 				//dir :''
 				}
 			});
 		}
 	},
 	visibleCondition : function(flag){
 		
 		var cdtion = this.getComponent('ctnr').getComponent('condition');
 		if(Ext.type(flag)=='boolean')
 		{
 			var old = cdtion.isVisible();
 			cdtion.setVisible(flag);
 			return (old!=flag);
 		}
 		cdtion.setVisible(!cdtion.isVisible());
 		return cdtion.isVisible();
 	},
 	popQueryOperators : function(btn){
 		if(btn.itemId =='qBtn')
 		{
 			var cp = this.getComponent('ctnr').getComponent('condition');
 			if(cp.isVisible())
 			{
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					//cp.getLayout().setActiveItem('qTbar');
 				}else{
 					cp.setVisible(false);
 					this.updateBox(this.getSize());
 					this.setHeight(this.getSize().height-1);//由于ext内部的bug，必须-1；
 				}
 			}else{
 				cp.setVisible(true);
 				this.updateBox(this.getSize());
 				this.setHeight(this.getSize().height+1);//由于ext内部的bug,必须+1；
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					cp.getLayout().setActiveItem('qTbar');
 				}
 			}
 		}else if(btn.itemId =='qPopBtn')
 		{
 			this.createWindow({
				title : '查询',
				border:false,
				maximizable : true,
				maskParent:false,
				innerView:'query'
			}).show();
 			/*if(this.getHost().visibleCondition.call(this,false))
 			{
 				this.setHeight(this.getSize().height-1);
 			}
 			this.getStore('users').setLink('base');
 			this.getStore('users').load({
 				params:{
 					start:0,
	 				limit:10
	 				//,sort:'',
	 				//dir :''
 				}
 			});*/
 		}
	},
	popModifyOperators : function(){
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_modify);
				return;
			}
		var operId = this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().getSelected().get('operId');
		this.createWindow({
			width : 398,
			height : 270,
			title : '修改操作员',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:operId
		}).show();
	},
 	popDrop : function() {
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm(lang.users.notice_orDel,lang.users.or_del,
				function(btn){
					if (btn == 'yes') {
							var record = this.lookupI('operatorsgrid').getSelectionModel().getSelected();// 得到当前选中的记录
							var params = {operId : record.data.operId};
							var url = 'admin/users/users.do?method=remove';
							Ext.Ajax.request({
								url : url,
								params : params,
								method : 'POST',
								scope : this,
								success : function(response, option) {						
									if(response.responseText=="{success:true}")
									{
										this.alert("提示","删除成功!!!");
										this.getStore("operators").reload();
										this.body.unmask();
									}
									else {
										this.alert("提示","删除失败!!!");
										this.body.unmask();
									}
			
								},
								failure : function() {
									this.body.unmask();
									alert('error');
								}
							});
						}
					},this);
	},
	/*popStart : function() {
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm("提示", "确实要启用该用户吗？", function(btn) {
			if (btn == 'yes') {				
				var record = this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {operId : record.data.operId,
					userState : record.data.userState
				};
				var url = 'admin/users/users.do?method=activate';
				Ext.Ajax.request({
					url : url,
					params : params,
					method : 'POST',
					scope : this,
					success : function(response, option) {						
						if(response.responseText=="{success:true}")
						{
							this.alert("提示","启用成功!!!");
							this.getStore("users").reload();
							this.body.unmask();
						}
						else {
								this.alert("提示","启用失败!!!");
								this.body.unmask();
						}
					},
					failure : function() {
						this.body.unmask();
						alert('error');
					}
				});
			}
		}, this);
	},*/
	/*
	popStop : function() {
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm("提示", "确实要停用该用户吗？", function(btn) {
			if (btn == 'yes') {
				//system.look(this);
				var record = this.lookupI("usersgrid").getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {operId : record.data.operId,
					userState : record.data.userState
				};
				var url = 'admin/users/users.do?method=cancel';
				Ext.Ajax.request({
					url : url,
					params : params,
					method : 'POST',
					scope : this,
					success : function(response, option) {
						if(response.responseText=="{success:true}")
						{
							this.alert("提示","停用成功!!!");
							this.getStore("operators").reload();
							this.body.unmask();
						}
						else {
								this.alert("提示","停用失败!!!");
								this.body.unmask();
						}
						
					},
					failure : function() {
						this.body.unmask();
						alert('error');
					}
				});
			}
		}, this);
	},*/
	
	popLookDetail : function() {
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请选择要修改的行');
				return;
			}
		var record = this.lookupI("operatorsgrid").getSelectionModel().getSelected();// 得到当前选中的记录
		this.createWindow({
			width : 800,
			height : 350,
			title : '查看详细',
			buttonAlign : 'center',
			innerView : 'details',
			innerArgs : record.data.operId,
			winId : 'lookup',
			border : false,
			maximizable : true,
			layout : 'fit'
		}).show();
	},
	//为操作员添加角色
	uAddRoles:function(){
		var record=this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().getSelected();
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请选择一行');
				return;
			}
		this.createWindow({
			width : 600,
			height : 400,
			title : '操作员添加角色',
			buttonAlign : 'center',
			innerView : 'addRoles',
			innerArgs : record.data.operId,
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	}
	//格式化用户状态
	/*
	uUserStateFormat : function(value) {
		switch (value) {
			case '0' :
				return "停用";
				break;
			case '1' :
				return "启用";
				break;
			case '2' :
				return "正在使用";
				break;

		}
	}
	*/
 });
 MC.app.Operators.singleTon = true;
 Ext.onReady(function(){
  window.system.install('operators',MC.app.Operators);
 });
