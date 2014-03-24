Ext.override(MC.app.Role, {
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
	addUsers : function(win) {	
		var sm = new Ext.grid.CheckboxSelectionModel();
		var id=new Ext.grid.RowNumberer({header:'序号',width:40});	
		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
		    {xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{header : "操作员编号",dataIndex : "operId"},
			{header : "登陆名",dataIndex : "operName"},
			{header : "雇员编号",dataIndex : "cemployeeName"},
			//{header : "使用状态",dataIndex : "userState",renderer:this.getHost().uUserStateFormat},
			{header : "操作员姓名",dataIndex : "zhName"},
			{header : "管理邮箱",dataIndex : "coMail"}
		];
		this.roleAddUsers = temp;
		var cmConfig = [], sm, tmp;
		for (var i = 0, len = temp.length; i < len; i++) {
			tmp = this.prepareCMConfig(temp[i]);
			cmConfig.push(tmp);
			if (tmp.xtype == 'checkboxSelectionModel') {
				sm = tmp;
			}
		}
		var cm = new Ext.grid.ColumnModel(cmConfig);
		cm.defaultSortable = true;
		win.add({
			border : true,
			buttonAlign:'center',
			layout : 'anchor',
			items : [{
				anchor : '100%',
				layout : 'column',
				xtype : 'form',
				frame : true,
				itemId:'roleForm',
				defaults : {
					labelWidth : 60,
					//labelPad : 5,
					labelAlign : 'right',					
					defaultType : 'textfield',
					width:100,
					layout : 'form',
					defaults : {
						anchor : '100%'
					}
				},
				items : [{
					columnWidth : .33,
					items : [{
						fieldLabel : '角色编号',
						readOnly :true,
						itemId:'roleId',
						name : 'roleId'
					}]
				},{
					columnWidth : .33,
					items : [{
						fieldLabel : '角色名称',
						readOnly :true,
						itemId:'roleName',
						name : 'roleName'
					}]
				},{
					columnWidth : .33,
					items : [{
						xtype:'datefield',
						fieldLabel : '创建日期',	
						itemId:'createTime',
						hideTrigger:true,//如果为true，将隐藏触发元素
						format:'Y-m-d',
						name : 'createTime',
						anchor:'98%',
						readOnly:true
					}]
				}]
			}, {
				title : '操作员基本信息',
				xtype : 'editorgrid',
				itemId:'usersgrid',
				clicksToEdit : 1,// 设置点击几次才可编辑
				anchor : '100% 0',			
				autoScroll : true,
				border : true,
				store : this.getStore('userStore'),
				cm : cm,
				sm : sm,
				tbar : [{
					text : '添加',
					iconCls : 'table_add',
					scope : win,
					handler : this.aOpenAddUsersWin
				}, '-', {
					text : '删除',
					iconCls : 'delete',
					scope : win,
					handler : this.aDelUsers
				}]				
			}],buttons : [{
				text : '保存',
				scope : win,
				handler : this.aSave
			},
			{
				text : '关闭',
				scope : win,
				handler : this.aCloseWin
			}]
			
		});
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
					//alert(response.responseText);
					var f = this.getComponent(0).getComponent(0);	
					var g=this.getComponent(0).getComponent(1);	
					var json = response.responseText;
					var resObj = Ext.decode(json);
					 f.getForm().setValues(resObj.form);	
					 g.getStore().loadData(resObj.grid);// 加载grid即this.getStore('userStore'),也有了相同的Store
					this.body.unmask();
				},
				failure : function(){
					this.body.unmask();
					alert('error');
				}
			});
			
		}	
	},	
	//保存修改后的询价单
	aSave:function(){
		var roleId=this.lookupI('roleId').getValue();
		//var records=this.lookupI('usersgrid').getSelectionModel().getSelections();
		var records=this.getStore('userStore').getRange(0,this.getStore('userStore').getCount());
		/*if(records.length==0){
			this.alert('提示','保存的内容不能为空');
			return;
		}*/
		var operIds=this.getHost().operIds(records);
		//system.look(gridJson);
		var params={roleId:roleId,operIds:operIds};
		var url="adminTwo/role/role.do?method=addOperatorsToRole";
		this.body.mask('请稍候...', 'x-mask-loading');
		Ext.Ajax.request({
			url:url,
			params:params,
			method:'POST',
			scope:this,
			success:function(form,action){
				var obj = Ext.util.JSON.decode(form.responseText);    
		        if(obj.success==true)    
		         {    
		         	this.body.unmask();
		            this.alert('提示',"保存成功!!!"); 
		            //this.getStore().reload();
		            //this.getStore('userStore').reload();
		            //this.lookupI('roleForm').getForm().reset();
		            //this.getStore('userStore').removeAll();
		         }    
		        else   
		         {    	
		         	this.body.unmask();
		            this.alert('提示',"保存失败!!!");    
		         }      
			},
			failure:function(form,action){
				this.body.unmask();
				this.alert('警告',"系统错误");    
			}
		});
		
	},
	//添加用户
	aOpenAddUsersWin:function(){	
		this.createWindow({			
			title : '操作员信息',
			width:800,
			height : 400,
			buttonAlign : 'center',
			innerView : 'queryUsers',			
			border : false,
			clearer:['queryUsersStore'],
			maximizable : true,
			layout : 'fit'		
		}).show();
	},	
	//删除用户
	aDelUsers:function(){	
		var roleId = this.lookupI('roleId').getValue();
		var grid = this.getComponent(0).getComponent(1);// 获得grid
		var records = grid.getSelectionModel().getSelections();// 要删除的记录
		var delLength = records.length;// 要删除的条数			
		if(records.length!=0)
		{
			this.confirm('提示框', '您确定要进行该操作？', function(btn) {
			if (btn == 'yes') {														
				for (var i = 0; i < delLength; i++) {										
						grid.getStore().remove(records[i]);					
				}					
			}
		});
		}
		else {
			this.alert('提示','请选择要删除的行!!!');
		}
	},
	aCloseWin:function(){
		this.close();
	},
	// 将Grid中的数据组装为json数据用来 保存
	operIds : function(records) {
		var datas = new Array();
		for(var i=0;i<records.length;i++)
		{	
			datas.push(records[i].get("operId"));
		}
		return datas;
	}
});