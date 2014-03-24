Ext.ns('MC.app');
MC.app.Role = Ext.extend(MC.Window, {
	title : '角色维护',
	moduleId : 'role',
	clearer:['roles'],
	hasStatusBar : true,
	initConfig : function(c) {
		// 生成工具条
		return {
			tbar : [				
			{
				text : '新增角色',
				scope : this,
				disabled : c.right.addRight == 1 ? false : true,
				iconCls : 'add',
				handler : this.rAppend
			},{
				text : '修改角色',
				scope : this,
				style : 'margin-right:5px;',
				disabled : c.right.updateRight == 1 ? false : true,
				iconCls : 'modify',
				handler : this.rModify
			},'-',{
				text : '查询角色',
				style : 'margin-left:5px;margin-right:5px;',
				itemId:'qBtn',
		        scope:this,
		        disabled : c.right.selectRight == 1 ? false : true,
				iconCls : 'query',
				handler : this.rQuery						
			},'-',{
				text : '为角色添加操作员',
				style : 'margin-left:5px;',
				scope : this,
				disabled : c.right.updateRight == 1 ? false : true,
				iconCls : 'add',
				scope : this,
				handler : this.rAddUsers
			}]
		};
	},
	createStore : function(id) {
		// 角色Store
		if(id === 'roles')
			{
				var rm = [];
				var tp = this.roles;
				for (var i = 0, len = tp.length; i < len; i++) {
					rm.push({
						name : tp[i].dataIndex,
						type : tp[i].cmType ? tp[i].cmType : 'string'
					});
				}
				var roles = new Ext.data.Store({
					autoLoad : false,
					storeId : 'roles',
					linkId :'base',//这里不写默认的就是'base'
					proxy : new Ext.data.HttpProxy({url : 'adminTwo/role/role.do?method=queryRoles'}),
					reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
					}, Ext.data.Record.create(rm))
				});
				roles.registLinks([{
					linkId : 'temp',
					baseParams : {},
					proxy : new Ext.data.HttpProxy({url : 'adminTwo/role/role.do?method=queryRoles'}),
					reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
					}, Ext.data.Record.create(rm))

				}]);
			}
		//用户store
		else if (id === 'userStore') {
			var rm = [];
			var tp = this.roleAddUsers;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var userStore = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'userStore',
				proxy : new Ext.data.HttpProxy({url:'adminTwo/role/role.do?method=queryRoles'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		
		else if (id === 'queryUsersStore') {
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
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'queryUsersStore',
				//proxy : new Ext.data.HttpProxy({url:'admin/users/users.do?method=loadAllUser'}),
				proxy : new Ext.data.HttpProxy({url : 'adminTwo/operator/operator.do?method=queryOperators'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}
		// 父级角色Store
		else if (id === 'parentRoleStore') {
			new Ext.data.Store({
				storeId : 'parentRoleStore',
				proxy : null,
				reader : new Ext.data.JsonReader({
					root : 'records'
				}, Ext.data.Record.create([{
					name : 'parentRole',
					type : 'string'
				}]))
			});
		}
		// 角色状态数据源
		else if (id === 'roleStateStore') {
			new Ext.data.SimpleStore({
				storeId : 'roleStateStore',
				fields : ['key', 'value'],
				data : [['0', '停用'], ['1', '启用']]
			})
		}
	},
	welcome : function(win) {
		win.add({
			html : 'xxxfdfdfdfdf'
		});
		win.doLayout();
	},
	// 新增视图
	// ------工具栏函数功能实现-----------//
	rbrowser : function(btn) {
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
 					this.setHeight(this.getSize().height-1);
 				}
 			}else{
 				cp.setVisible(true);
 				this.setHeight(this.getSize().height+1);
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
 			this.getStore('roles').setLink('base');
 			this.getStore('roles').load({
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
	rAppend : function() {
		this.createWindow({
			width : 250,
			height : 150,
			title : '新增角色',
			buttonAlign : 'center',
			winId:'add',
			innerView : 'append',
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	rModify : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_modify);
				return;
			}
		var roleId = this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected().get('roleId');
		this.createWindow({
			width : 250,
			height :180,
			winId:'modify',
			//title : lang.users.modifyUser,
			title:'修改',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:roleId
		}).show();
	},
	rDrop : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm(lang.users.notice_orDel,lang.users.or_del,
				function(btn){
					if (btn == 'yes') {
							var record = this.lookupI('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
							var params = {roleId : record.data.roleId};
							var url = 'admin/role/role.do?method=remove';
							Ext.Ajax.request({
								url : url,
								params : params,
								method : 'POST',
								scope : this,
								success : function(response, option) {						
									if(response.responseText=="{success:true}")
									{
										this.alert("提示","删除成功!!!");
										this.getStore("queryRolesStore").reload();
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
	rQuery : function(btn) {
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
				title : lang.users.queryUser,
				border:false,
				maximizable : true,
				maskParent:false,
				innerView:'browser'
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
	rStart : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm("提示", "确实要启用该用户吗？", function(btn) {
			if (btn == 'yes') {				
				var record = this.lookupI('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {roleId : record.data.roleId,roleState : record.data.roleState};
				var url = 'admin/role/role.do?method=activate';
				Ext.Ajax.request({
					url : url,
					params : params,
					method : 'POST',
					scope : this,
					success : function(response, option) {						
						if(response.responseText=="{success:true}")
						{
							this.alert("提示","启用成功!!!");
							this.getStore("roles").reload();
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
	rStop : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		
		this.confirm("提示", "确实要停用该角色吗？", function(btn) {
			if (btn == 'yes') {
				var record = this.lookupI('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
				var params = {
					roleId : record.data.roleId,
					roleState : record.data.roleState
				};
				var url = 'admin/role/role.do?method=cancel';
				Ext.Ajax.request({
					url : url,
					params : params,
					method : 'POST',
					scope : this,
					success : function(response, option) {
						if(response.responseText=="{success:true}")
						{
							this.alert("提示","停用成功!!!");
							this.getStore("roles").reload();
							this.body.unmask();
						}
						else {
							this.alert("提示","停用失败!!!");
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
	rQueryRole : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		var record = this.lookupI('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
		this.createWindow({
			width : 250,
			height : 150,
			title : '查看详细',
			buttonAlign : 'center',
			innerView : 'append',
			innerArgs : record.data.roleId,
			winId : 'lookDetails',
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	// 保存
	rSave : function() {
		var fs = this.lookupI('roleForm');
		var url = "adminTwo/role/role.do?method=add";
		//var params = {createUser:'1'};
		if (fs.getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			fs.getForm().submit({
				url : url,
				//params : params,
				method : 'post',
				scope : this,
				success : function(result, request) {
					this.body.unmask();
					this.alert('提示', '操作成功!');
					fs.form.reset();					
				},
				failure : function(form, action) {
					this.body.unmask();
					this.alert('执行失败', '某些记录已经存在!');

				}
			});
		} else {

		}
	},
	// 修改
	rModifySave : function() {
		var fs = this.lookupI('roleForm');
		var url = "adminTwo/role/role.do?method=modify";
		// var params={createUser:'1'};
		if (fs.getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			fs.getForm().submit({
				url : url,
				// params : params,
				method : 'post',
				scope : this,
				success : function(result, request) {
					this.body.unmask();
					this.alert('提示', '操作成功!');
					fs.form.reset();				
					this.getStore("roles").reload();
					this.close();
				},
				failure : function(form, action) {
					this.body.unmask();
					this.alert('执行失败', '某些记录已经存在!');
					this.close();
				}
			});

		} else {

		}
	},
	//为角色添加操作员
	rAddUsers:function(){
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, "请选择一行！！！");
				return;
			}
		var record=this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected();
		this.createWindow({
			width : 600,
			height : 500,
			title : '为角色添加操作员',
			buttonAlign : 'center',
			innerView : 'addUsers',
			innerArgs : record.data.roleId,
			clearer:['userStore'],
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	// 格式化启用状态
	rRoleStateFormat : function(value) {
		switch (value) {
			case '0' :
				return "停用";
				break;
			case '1' :
				return "启用";
				break;

		}
	}
});
MC.app.Role.singleTon = true;
window.system.install('role', MC.app.Role);