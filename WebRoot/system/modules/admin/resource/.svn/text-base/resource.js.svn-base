Ext.ns('MC.app');
MC.app.Resource = Ext.extend(MC.Window, {
	title : '资源维护',
	moduleId : 'resource',
	hasStatusBar : true,
	initConfig : function() {
		// 生成工具条
		return {
			tbar : [{
				text : '新增资源',
				scope : this,
				iconCls : 'add',
				handler : this.rAppend
			}, '-', {
				text : '修改资源',
				scope : this,
				iconCls : 'modify',
				handler : this.rModify
			}, '-', {
				text : '删除资源',
				scope : this,
				iconCls : 'delete',
				handler : this.rDrop
			}, '-', {
				text : '启用',
				scope : this,
				iconCls : 'start',
				handler : this.rStart
			},'-', {
				text : '停用',
				scope : this,
				iconCls : 'stop',
				handler : this.rStop
			}]
		};
	},
	createStore : function(id) {
		// 角色Store
		if (id === 'roleStore') {
			var roleStore = new Ext.data.Store({
				storeId : 'roleStore',
				linkId : 'base',// 这里不写默认的就是'base'
				proxy : new Ext.data.HttpProxy({
					url : 'admin/role/role.do?method=getRoles'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create([{
					name : 'roleId',
					type : 'int'
				}, {
					name : 'parentRole',
					type : 'string'
				}, {
					name : 'roleName',
					type : 'string'
				}, {
					name : 'createUser',
					type : 'string'
				}, {
					name : 'createTime',
					type : 'string'
				}, {
					name : 'roleState',
					type : 'string'
				}, {
					name : 'roleMemo',
					type : 'string'
				}]))
			});
			roleStore.registLinks([{
				linkId : 'temp',
				baseParams : {},
				proxy : new Ext.data.HttpProxy({
					url : 'admin/role/role.do?method=getRoles'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create([{
					name : 'roleId',
					type : 'int'
				}, {
					name : 'parentRole',
					type : 'string'
				}, {
					name : 'roleName',
					type : 'string'
				}, {
					name : 'createUser',
					type : 'string'
				}, {
					name : 'createTime',
					type : 'string'
				}, {
					name : 'roleState',
					type : 'string'
				}, {
					name : 'roleMemo',
					type : 'string'
				}]))
			}]);
		}
		
		// 父级角色Store
		else if (id === 'parentIdStore') {
			new Ext.data.Store({
				storeId : 'parentIdStore',
				proxy : null,
				reader : new Ext.data.JsonReader({
					root : 'records'
				}, Ext.data.Record.create([{
					name : 'parentIdStore',
					type : 'string'
				}]))
			});
		}
		// 资源类型数据源
		else if (id === 'rsTypeStore') {
			new Ext.data.SimpleStore({
				storeId : 'rsTypeStore',
				fields : ['key', 'value'],
				data : [['0', '停用'], ['1', '启用']]
			})
		}
		// 资源状态数据源
		else if (id === 'rsStateStore') {
			new Ext.data.SimpleStore({
				storeId : 'rsStateStore',
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
	rAppend : function() {
		this.createWindow({
			width : 300,
			height : 270,
			title : '新增资源',
			buttonAlign : 'center',
			innerView : 'append',
			border : false,
			frame:true,
			maximizable : true,
			layout : 'fit',
			buttons : [{
				text:"保存",
				handler : function() {
					this.close();
				}
			}, {
				text:'关闭',
				handler : function() {
					this.close();
				}
			}]
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
			height : 220,
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
										this.getStore("roleStore").reload();
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
	rStart : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm("提示", "确实要启用该用户吗？", function(btn) {
			if (btn == 'yes') {				
				var record = this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
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
							this.getStore("roleStore").reload();
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
				var record = this.getComponent(0).getSelectionModel().getSelected();// 得到当前选中的记录
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
							this.getComponent(0).getStore().reload();
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
		var record = this.getComponent(0).getSelectionModel().getSelected();// 得到当前选中的记录
		this.createWindow({
			width : 250,
			height : 220,
			title : '查看详细',
			buttonAlign : 'center',
			innerView : 'append',
			innerArgs : record.data.roleId,
			winId : 'lookup',
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	// 保存
	rSave : function() {
		var fs = this.getComponent(0).getComponent(0);
		var url = "admin/role/role.do?method=add";
		var params = {createUser:'1'};
		if (fs.getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			fs.getForm().submit({
				url : url,
				params : params,
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
		var fs = this.getComponent(0).getComponent(0);
		var url = "admin/role/role.do?method=update";
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
					this.getStore("roleStore").reload();
					this.close();
				},
				failure : function(form, action) {
					this.body.unmask();
					this.alert('执行失败', '某些记录已经存在!');

				}
			});

		} else {

		}
	},
	//为角色添加用户
	rAddUsers:function(){
		var record=this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected();
		this.createWindow({
			width : 600,
			height : 600,
			title : '为角色添加用户',
			buttonAlign : 'center',
			innerView : 'addUsers',
			innerArgs : record.data.roleId,
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
MC.app.Resource.singleTon = true;
window.system.install('resource', MC.app.Resource);