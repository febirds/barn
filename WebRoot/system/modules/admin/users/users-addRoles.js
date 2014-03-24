Ext.override(MC.app.Users, {
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
	addRoles : function(win) {	
		var sm = new Ext.grid.CheckboxSelectionModel();
		var id=new Ext.grid.RowNumberer({header:'序号',width:40});	
		// 字段列配置	
		var temp=[
			{xtype : 'rowNumberer',header : '序号',sortable : false,width : 30}, 
			//{xtype : 'checkboxSelectionModel',singleSelect : false,sortable : false,width : 20},
			{id:'roleId',header: '角色编号', width: 80,     dataIndex:'roleId'},
			//{id:'parentRole',header: '父亲角色', width:80,  dataIndex:'parentRole'},
			{id:'roleName',header: '角色名称', width: 80,   dataIndex:'roleName'},
			//{id:'createUser',header: '创建用户', width:80,  dataIndex:'createUser'},
			{id:'createTime',header: '创建时间', width: 120, dataIndex:'createTime'},
			//{id:'roleState',header: '角色状态', width: 40,  dataIndex:'roleState',renderer:this.getHost().rRoleStateFormat},
			{id:'roleMemo',header: '角色描述', width: 120,  dataIndex:'roleMemo'}
		];
		this.rolesStore = temp;
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
					columnWidth : .25,
					items : [{
						fieldLabel : '用户编号',
						readOnly :true,
						itemId:'userId',
						name : 'userId'
					}]
				},{
					columnWidth : .25,
					items : [{
						fieldLabel : '登陆名称',
						readOnly :true,
						itemId:'logName',
						name : 'logName'
					}]
				},{
					columnWidth : .25,
					items : [{
						fieldLabel : '用户名称',
						readOnly :true,
						itemId:'zhName',
						name : 'zhName'
					}]
				},{
					columnWidth : .25,
					items : [{
						xtype : 'combo',
						fieldLabel : '用户状态',
						name : 'userState',
						store : this.getStore('userState'),
						displayField : 'value',
						valueField : 'key',	
						hiddenName:'userState',
						mode:'local',
						value:'0',
						readOnly :true,
						allowBlank : false,
						blankText:'用户状态不能为空',
						triggerAction : 'all',
						hideTrigger : true,// 下拉按键显示/隐藏								
						minChars : 1											
					}]
				},{
					columnWidth : 1,
					items : [{
						xtype : 'textarea',
						fieldLabel : '备注',	
						readOnly :true,
						anchor : '99.8%',
						name : 'cmemo'
					}]
				} ]
			}, {
				title : '角色基本信息',
				xtype : 'editorgrid',
				itemId:'rolesgrid',
				clicksToEdit : 1,// 设置点击几次才可编辑
				anchor : '100% 0',			
				autoScroll : true,
				border : true,
				store : this.getStore('rolesStore'),
				cm : cm,
				sm : sm,
				tbar : [{
					text : '添加',
					iconCls : 'table_add',
					scope : win,
					handler : this.aOpenAddRolesWin
				}, '-', {
					text : '删除',
					iconCls : 'delete',
					scope : win,
					handler : this.aDelRoles
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
			var url = 'admin/users/users.do?method=getPageByUserId';
		    var params={userId:win.innerArgs};		  		
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){					
					var f = this.getComponent(0).getComponent(0);				
					var json = response.responseText;
					var resObj = Ext.decode(json);
					f.getForm().setValues(resObj.data);	
					if(resObj.grid!=null)
					{
						this.getStore('rolesStore').loadData(resObj.grid);// 加载grid
					}					
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
		var userId=this.lookupI('userId').getValue();
		//var records=this.lookupI('rolesgrid').getSelectionModel().getSelections();
		var records=this.getStore('rolesStore').getRange(0,this.getStore('rolesStore').getCount());
		var rolesIds=this.getHost().getRolesIds(records);
		//system.look(gridJson);
		var params={userId:userId,rolesIds:rolesIds};
		var url="admin/users/users.do?method=addRolesToUser";
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
		         	
		            this.alert('提示',"添加成功!!!");  
		            this.body.unmask();
		            //this.getStore('rolesStore').reload();  
		         }    
		        else   
		         {    	
		         	this.body.unmask();
		             Ext.Msg.alert('提示',"添加失败!!!");    
		         }      

			},
			failure:function(form,action){
				this.body.unmask();
				this.alert('警告',"系统错误");    
			}
		});
		
	},
	//添加用户
	aOpenAddRolesWin:function(){	
		this.createWindow({
			width : 600,
			height : 400,
			title : '用户信息',
			buttonAlign : 'center',
			innerView : 'queryRoles',	
			clearer:['addRolesStore'],
			border : false,
			maximizable : false,
			layout : 'fit'		
		}).show();
	},	
	//删除用户
	aDelRoles:function(){	
		var grid = this.getComponent(0).getComponent(1);// 获得grid
		var delRecords = grid.getSelectionModel().getSelections();// 要删除的记录
		var delLength = delRecords.length;// 要删除的条数			
		if(delRecords.length!=0)
		{
			this.confirm('提示框', '您确定要进行该操作？', function(btn) {
			if (btn == 'yes') {														
				for (var i = 0; i < delLength; i++) {										
						grid.getStore().remove(delRecords[i]);					
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
	getRolesIds : function(records) {
		var datas = new Array();
		if(records.length!=0)
		{		
		for(var i=0;i<records.length;i++)
		{						
			datas.push(records[i].get("roleId"));
		}							
		return datas;
		}
		else {
			
		}
	}
});