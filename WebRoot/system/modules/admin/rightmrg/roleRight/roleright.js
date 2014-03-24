Ext.ns('MC.app');
MC.app.Roleright = Ext.extend(MC.Window, {
	title : '角色权限分配',
	moduleId : 'roleright',
	clearer:['roles1'],//清空ID为roles的store
	hasStatusBar : true,
	initConfig : function(c) {
		// 生成工具条
		return {
			tbar : [
				{
				text : '查询角色',
				itemId:'qBtn',
				disabled : c.right.selectRight == 1 ? false : true,
		        scope:this,
				iconCls : 'query',
				handler : this.rQuery						
			} ,		
			{
				text : '查看详细',
				style : 'margin-right:5px;',
				scope : this,
				disabled : c.right.selectRight == 1 ? false : true,
				iconCls : 'query',
				scope : this,
				handler : this.popLookDetail
			},'-',{
				text : '角色权限分配',
				style : 'margin-left:5px;',
				scope : this,
				disabled : c.right.updateRight == 1 ? false : true,
				iconCls : 'add',
				scope : this,
				handler : this.rAddRoleRight
			} ]
		};
	},
	createStore : function(id) {
		// 角色Store
		if(id === 'roles1')
			{
				var rm = [];
				var tp = this.roles1;
				for (var i = 0, len = tp.length; i < len; i++) {
					rm.push({
						name : tp[i].dataIndex,
						type : tp[i].cmType ? tp[i].cmType : 'string'
					});
				}
				var roles1 = new Ext.data.Store({
					autoLoad : false,
					storeId : 'roles1',
					linkId :'base',//这里不写默认的就是'base'
					proxy : new Ext.data.HttpProxy({url : 'adminTwo/role/role.do?method=queryRoles'}),
					reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
					}, Ext.data.Record.create(rm))
				});
				roles1.registLinks([{
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
		else if (id === 'RoleRightStore') {
			var rm = [];
			var tp = this.RoleRightStore;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var rolesStore = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'RoleRightStore',
				proxy : new Ext.data.HttpProxy({url:'adminTwo/roleRight/roleRight.do?method=queryRoleRight'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
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
 			this.getStore('roles1').setLink('base');
 			this.getStore('roles1').load({
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
			height : 300,
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
			height : 300,
			winId:'modify',
			//title : lang.users.modifyUser,
			title:'修改',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:roleId
		}).show();
	},
/*	rDrop : function() {
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
	},*/
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
	rQueryRole : function() {
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请选择一行');
				return;
			}
		var record = this.lookupI('rolegrid').getSelectionModel().getSelected();// 得到当前选中的记录
		this.createWindow({
			width : 250,
			height : 220,
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
		var fs = this.lookupI('roleForm');
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
					this.getStore("roles1").reload();
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
	
	popLookDetail:function(){
		
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert("提示", "请选择一行！！！");
				return;
			}
		var record=this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected();
		this.createWindow({			
			title : '查看详细',
			buttonAlign : 'center',
			innerView : 'details',
			innerArgs : record.data.roleId,
			clearer:['RoleRightStore'],
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	
	//为角色添加操作员
	rAddRoleRight:function(){
		
		if (!this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().hasSelection()) {
				this.alert("提示", "请选择一行！！！");
				return;
			}
		var record=this.getComponent('ctnr').getComponent('rolegrid').getSelectionModel().getSelected();
		this.createWindow({			
			title : '为角色分配权限',
			buttonAlign : 'center',
			innerView : 'append',
			innerArgs : record.data.roleId,
			clearer:['RoleRightStore'],
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	}	
});
MC.app.Roleright.singleTon = true;
window.system.install('roleright', MC.app.Roleright);