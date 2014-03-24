Ext.ns('MC.app');
MC.app.Users = Ext.extend(MC.Window, {
 	title:'用户管理',
 	moduleId:'users',
 	clearer:['users'],
 	hasStatusBar : true,
 	welcome : function(win){
 		win.add({
 			html:'欢迎使用用户管理'
 		});
 		win.doLayout();
 	},
 	initConfig : function(){
 		return {
 			tbar : [{
						text : '新增',
						iconCls : 'add',
						scope:this,
						handler : this.popAppend
					}, {
						text : '修改',
						iconCls : 'modify',
						scope:this,
						handler : this.popModify
					}, {
						text : '删除',
						iconCls : 'delete',
						scope:this,
						handler : this.popDrop
					}, '-', {
						text : '浏览',
						iconCls : 'browser',
						scope:this,
						handler : this.popLookDetail
					}, {
						text : '查询',
						itemId:'qBtn',
						xtype:'tbsplit',
				        scope:this,
						iconCls : 'query',
						handler : this.popQuery,
						menu:{items:[
                        	{
                        		text: '查询...',
                        		iconCls : 'query',
                        		itemId:'qPopBtn',
                        		scope:this,
                        		handler: this.popQuery
                        	}
                        ]}
					}, '-', {
						text : '启用',
						iconCls : 'enable',
						scope:this,
						handler : this.popStart
					}, {
						text : '停用',
						iconCls : 'disable',
						scope:this,
						handler : this.popStop
					}, '-', {
				text : '为用户添加角色',
				scope : this,
				iconCls : 'add',
				scope : this,
				handler : this.uAddRoles
			}]
 		};
 	},
 	createStore : function(id) {
 		if(id === 'users') {
			var rm = [];
			var tp = this.queryUsersStore;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var queryUsersStore = new Ext.data.Store({
				autoLoad : false,
				storeId : 'users',
				linkId :'base',//这里不写默认的就是'base'
				proxy : new Ext.data.HttpProxy({url : 'admin/users/users.do?method=loadAllUser'}),
				reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'records'
				}, Ext.data.Record.create(rm))
			});
			queryUsersStore.registLinks([{
				linkId : 'temp',
				baseParams : {},
				proxy : new Ext.data.HttpProxy({url : 'admin/users/users.do?method=loadAllUser'}),
				reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'records'
				}, Ext.data.Record.create(rm))

			}]);
		} else if(id === 'userState') {
			new Ext.data.SimpleStore({
				storeId : 'userState',
				fields : ["text", "value"],
				data : [['启用',1], [ '正在使用',2], ['停用',0]]
			});
		}
		//用户store
		else if (id === 'rolesStore') {
			var rm = [];
			var tp = this.rolesStore;
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
			var tp = this.addRolesStore;
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
				proxy : new Ext.data.HttpProxy({url:'admin/role/role.do?method=getRoles'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		// 管理员状态
		else if(id === 'isAdmins') {
			new Ext.data.SimpleStore({
				storeId : 'isAdmins',
				fields : ["text", "value"],
				data : [['是',1], ['否',0]]
			});
		}
 	},
 	popAppend : function(){
 		this.createWindow({
			width : 400,
			height : 290,
			title : '新增用户',
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
 				}
 			}else{
 				cp.setVisible(true);
 				this.doLayout();
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
 			this.getStore('users').setLink('base');
 			this.getStore('users').load({
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
 	popQuery : function(btn){
 		if(btn.itemId =='qBtn')
 		{
 			var cp = this.getComponent('ctnr').getComponent('condition');
 			if(cp.isVisible())
 			{
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					cp.getLayout().setActiveItem('qTbar');
 				}else{
 					cp.setVisible(false);
 					this.updateBox(this.getSize());
 					this.setHeight(this.getSize().height-1);
 				}
 			}else{
 				cp.setVisible(true);
 				this.updateBox(this.getSize());
 				this.setHeight(this.getSize().height+1);
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					cp.getLayout().setActiveItem('qTbar');
 				}
 			}
 		}else if(btn.itemId =='qPopBtn')
 		{
 			this.createWindow({
				title : '查询用户',
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
	popModify : function(){
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先选择要修改的行!');
				return;
			}
		var userId = this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().getSelected().get('userId');
		this.createWindow({
			width : 400,
			height : 310,
			title : '修改用户',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:userId
		}).show();
	},
 	popDrop : function() {
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先选择要删除的行!');
				return;
			}
		this.confirm('确认删除','您真的要删除所选用户吗?',
				function(btn){
					if (btn == 'yes') {
							var record = this.lookupI('usersgrid').getSelectionModel().getSelected();// 得到当前选中的记录
							var params = {userId : record.data.userId};
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
										this.getStore("users").reload();
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
	popStart : function() {
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先选择要删除的行!');
				return;
			}
		this.confirm("提示", "确实要启用该用户吗？", function(btn) {
			if (btn == 'yes') {				
				var record = this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {userId : record.data.userId,
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
	},
	popStop : function() {
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先选择要删除的行!');
				return;
			}
		this.confirm("提示", "确实要停用该用户吗？", function(btn) {
			if (btn == 'yes') {
				//system.look(this);
				var record = this.lookupI("usersgrid").getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {userId : record.data.userId,
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
							this.getStore("users").reload();
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
	},
	popLookDetail : function() {
		if (!this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先选择要浏览信息的行!');
				return;
			}
		var record = this.lookupI("usersgrid").getSelectionModel().getSelected();// 得到当前选中的记录
		this.createWindow({
			width : 800,
			height : 350,
			title : '查看详细',
			buttonAlign : 'center',
			innerView : 'details',
			innerArgs : record.data.userId,
			winId : 'lookup',
			border : false,
			maximizable : true,
			layout : 'fit'
		}).show();
	},
	//为用户添加角色
	uAddRoles:function(){
		var record=this.getComponent('ctnr').getComponent('usersgrid').getSelectionModel().getSelected();
		this.createWindow({
			width : 600,
			height : 600,
			title : '用户添加角色',
			buttonAlign : 'center',
			innerView : 'addRoles',
			clearer:['queryRolesStore'],
			innerArgs : record.data.userId,
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	//格式化用户状态
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
 });
 MC.app.Users.singleTon = true;
 Ext.onReady(function(){
  window.system.install('users',MC.app.Users);
 });
