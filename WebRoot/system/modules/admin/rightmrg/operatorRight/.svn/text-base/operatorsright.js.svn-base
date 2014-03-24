Ext.ns('MC.app');
MC.app.Operatorright = Ext.extend(MC.Window, {
 	title:'操作员权限管理',
 	moduleId:'operatorsright',
 	clearer:['operators1'],
 	hasStatusBar : true,
 	welcome : function(win){
 		win.add({
 			html:lang.users.welcome_msg
 		});
 		win.doLayout();
 	},
 	initConfig : function(c){
 		return {
 			tbar : [
 			{
				text : '查询',
				itemId:'qBtn',
				disabled : c.right.selectRight == 1 ? false : true,
		        scope:this,
				iconCls : 'query',
				handler : this.rQuery	
			} ,{
				text : '查看详细',
				scope : this,
				style : 'margin-right:5px;',
				disabled : c.right.selectRight == 1 ? false : true,
				iconCls : 'add',
				scope : this,
				handler : this.popLookDetail
			},'-',{
				text : '为操作员分配权限',
				style : 'margin-left:5px;',
				scope : this,
				disabled : c.right.updateRight == 1 ? false : true,
				iconCls : 'add',
				scope : this,
				handler : this.oAddOperatorRight28
			}]
 		};
 	},
 	createStore : function(id){
 		if(id === 'operators1')
			{
				var rm = [];
				var tp = this.queryOperatorsStore1;
				for (var i = 0, len = tp.length; i < len; i++) {
					rm.push({
						name : tp[i].dataIndex,
						type : tp[i].cmType ? tp[i].cmType : 'string'
					});
				}
				var queryOperatorsStore = new Ext.data.Store({
					autoLoad : false,
					storeId : 'operators1',
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
			//用户store
		else if (id === 'OperatorRightStore') {
			var rm = [];
			var tp = this.OperatorRightStore;
			for (var i = 0, len = tp.length; i < len; i++) {
				rm.push({
					name : tp[i].dataIndex,
					type : tp[i].cmType ? tp[i].cmType : 'string'
				});
			}
			var OperatorRightStore = new Ext.data.Store({
				autoLoad : false,
				linkId : 'base',// 这里不写默认的就是'base'
				storeId : 'OperatorRightStore',
				proxy : new Ext.data.HttpProxy({url:'adminTwo/operatorRight/operatorRight.do?method=queryOperatorRight'}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'records'
				}, Ext.data.Record.create(rm))

			});			
		}		
 	},
 	popAppend : function(){
 		this.createWindow({
			width : 400,
			height : 310,
			title : '操作员权限管理',
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
 	rQuery : function(btn){
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
				title : '权限管理',
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
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_modify);
				return;
			}
		var operId = this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().getSelected().get('operId');
		this.createWindow({
			width : 400,
			height : 310,
			title : '权限修改',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:operId
		}).show();
	},
 	/*popDrop : function() {
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert(lang.users.notice, lang.users.msg_delete);
				return;
			}
		this.confirm(lang.users.notice_orDel,lang.users.or_del,
				function(btn){
					if (btn == 'yes') {
							var record = this.lookupI('usersgrid').getSelectionModel().getSelected();// 得到当前选中的记录
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
	},*/
	popLookDetail : function() {
		if (!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()) {
				this.alert('提示', '请先查询再选择一行');
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
			clearer:['OperatorRightStore'],
			winId : 'lookup',
			border : false,
			maximizable : true,
			layout : 'fit'
		}).show();
	},
	//给操作员分配权限
	oAddOperatorRight28:function(){
		var record=this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().getSelected();
		if(!this.getComponent('ctnr').getComponent('operatorsgrid').getSelectionModel().hasSelection()){
			this.alert('提示', '请先查询再选择一行');
			return;
		}
		this.createWindow({			
			title : '操作员分配权限',
			buttonAlign : 'center',
			innerView : 'append',
			clearer:['OperatorRightStore'],
			innerArgs : record.data.operId,
			border : false,
			maximizable : true,
			layout : 'fit'			
		}).show();
	},
	//格式化用户状态
	uOperatorStateFormat : function(value) {
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
 MC.app.Operatorright.singleTon = true;
 Ext.onReady(function(){
  window.system.install('operatorsright',MC.app.Operatorright);
 });
