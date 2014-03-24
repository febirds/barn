Ext.ns('MC.app');
MC.app.Menu = Ext.extend(MC.Window, {
	title : '菜单维护',
	width:'40%',
	moduleId : 'menu',
	hasStatusBar : true,
	initConfig : function(c) {
		// 生成工具条
		return {
			tbar : [{
				text : '新增菜单',
				scope : this,
				iconCls : 'add',
				disabled : c.right.addRight == 1 ? false : true,
				handler : this.rAppend
			}, '-', {
				text : '修改菜单',
				scope : this,
				disabled : c.right.updateRight == 1 ? false : true,
				iconCls : 'modify',
				handler : this.rModify
			}/*, '-', {
				text : '删除菜单',
				disabled : c.right.deleteRight == 1 ? false : true,
				scope : this,
				iconCls : 'delete',
				handler : this.rDrop
			}*/]
		};
	},
	createStore : function(id) {
		if (id === 'menuStore') { // 增加修改页面的store数据源 -----------Y
			var rm = []; // 定义一个数组，来装遍历的列类型 ------Y
			var tp = this.menuStore; // 从页面那边传过来的列数据源 ---------Y
			for (var i = 0, len = tp.length; i < len; i++) { // 遍历列数据源，把列对象赋给数组
				// ---Y
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			new Ext.data.Store({
				storeId : 'menuStore',
				proxy : new Ext.data.HttpProxy({url : 'adminTwo/menu/menu.do?method=queryMenu'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))
			});
		}
		
		// 父级角色Store
		else if (id === 'menuParentId') {
			new Ext.data.Store({
				storeId : 'menuParentId',
				proxy : null,
				reader : new Ext.data.JsonReader({
					root : 'records'
				}, Ext.data.Record.create([{
					name : 'menuParentIdStore',
					type : 'string'
				}]))
			});
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
			height : 200,
			title : '新增菜单',
			buttonAlign : 'center',
			innerView : 'append',
			border : true,
			frame:true,
			maximizable : true,
			layout : 'fit'
		}).show();
	},
	rModify : function() {
		
		//var treepanel = Ext.get('treepanelId');
		var treepanelM = this.lookupI('treepanelId');
		//system.look(treepanelM.getSelectionModel().getSelectedNode().id);
		var node = treepanelM.getSelectionModel().getSelectedNode();
		var nodeId = node.id;
		var nodePath = node.getPath();
		//alert(treepanelM.getSelectionModel().getSelectedNode().id);
		this.createWindow({
			width : 250,
			height : 220,
			//title : lang.users.modifyUser,
			title:'修改',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:nodeId,
			nodePath:nodePath
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
	// 保存
	rSave : function() {
		var fs = this.getComponent(0).getComponent(0);
		var url = "adminTwo/menu/menu.do?method=add";	
		//var url = "adminTwo/menu/menu.do?method=modify";	
		//var url = "adminTwo/menu/menu.do?method=loadMenuTree";
		//var url = "adminTwo/roleRight/roleRight.do?method=add";
		//var url = "adminTwo/roleRight/roleRight.do?method=queryRoleRight";
		//var url = "adminTwo/operatorRight/operatorRight.do?method=modify";
		// var url = "adminTwo/operatorRight/operatorRight.do?method=queryOperatorRight";
		if (fs.getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			fs.getForm().submit({
				url : url,				
				method : 'post',
				scope : this,
				success : function(result, request) {
					this.body.unmask();
					this.alert('提示', '操作成功!');
					fs.form.reset();					
				},
				failure : function(form, action) {
					this.body.unmask();
					this.alert('执行失败', '该菜单的Id已经被占用!');

				}
			});
		} else {

		}
	},
	// 修改
	rModifySave : function() {
		var fs = this.getComponent(0).getComponent(0);
		//system.look(fs);
		var url = "adminTwo/menu/menu.do?method=modify";		
		if (fs.getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			fs.getForm().submit({
				url : url,
				// params : params,
				method : 'post',
				scope : this,
				success : function(result, request) {
					this.body.unmask();
					var tp = this.getHost().lookupI('treepanelId');
					var rootnode = tp.getRootNode();
					//因为是异步加载的，所以需要传过来一个Path，然后一级一级的找子节点
					//system.look(this.nodePath);
					rootnode.nodePath = this.nodePath;
					var path = this.nodePath;
					window.tppp = tp;
					this.close();
					tp.getLoader().load(rootnode,function(tlr,rn){
						//window.ppppppp = tlr
						//window.nnnnnnnn = rn;
						var path = rn.nodePath;
						var dirs = path.split('/');
						var node = rn;
						for(var i=2;i<dirs.length;i++)
						{
							if(node)
							{
								node.expand();
							}
							node = node.findChild('id',dirs[i]);
							if(i==dirs.length-1)
							{
								node.select();
							}
						}
					});
					/*tp.getLoader().load(rootnode,function(){
						var laststr = path.substring(path.lastIndexOf('/'));
						laststr = laststr.substring(1);
						alert(laststr);
						window.tppp.expandPath(path);
						var lastNode = rootnode.findChild('id',laststr);
						lastNode.select();
					});*/
				},
				failure : function(form, action) {
					this.body.unmask();
					this.alert('执行失败', '某些记录已经存在!');

				}
			});

		} else {

		}
	}
});
MC.app.Menu.singleTon = true;
window.system.install('menu', MC.app.Menu);