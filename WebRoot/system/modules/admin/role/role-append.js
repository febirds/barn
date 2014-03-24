Ext.override(MC.app.Role, {
	append : function(win) {		
		var addpanel = new Ext.form.FormPanel({
			layout : 'anchor',
			itemId:'roleForm',
			labelWidth : 60, 
			bodyStyle : 'padding:5px 5px 0',
		    layout : 'form',
			msgTarget : 'under',
			autoWidth : true,
			labelAlign : 'right',
			defaultType : 'textfield',
			frame:true,
			buttonAlign : 'center',			
			//reader : this.getStore('roles').reader,
			items : [{
						fieldLabel : '角色编号',	
						disabled:win.innerArgs?false:true,
						hidden:win.innerArgs?false:true,
						hideLabel:win.innerArgs?false:true,
						readOnly:true,
						cls:'x-item-disabled',	
						anchor:'98%',
						itemId:'roleId',
						name : 'roleId'
					},
					{
						fieldLabel : '角色名称',	
						itemId:'roleName',
						name : 'roleName',
						anchor:'98%',
						allowBlank : false,
						blankText:'角色名称不能为空'
					},{
						xtype:'datefield',
						fieldLabel : '创建日期',	
						itemId:'createTime',
						hideTrigger:true,//如果为true，将隐藏触发元素
						format:'Y-m-d',
						name : 'createTime',
						anchor:'98%',
						readOnly:true,
						value:new Date()
					}],
			buttons : [{
				//text : lang.users.ok,
				text:"保存",
				hidden:win.innerArgs?true:false,
				scope : win,
				handler : this.aForward
			},{
				//text : lang.users.ok,
				text:"修改",
				hidden:win.innerArgs&&win.winId=='modify'?false:true,
				scope : win,
				handler : this.aForward
			}, {
				//text : lang.users.reset,
				text:'关闭',
				scope:win,
				handler : function() {
					this.close();
				}
			}]
			});
		win.add(addpanel);	
		win.doLayout();		
		if(win.innerArgs)
		{			
			win.body.mask('loading');
			var url = 'adminTwo/role/role.do?method=queryRole';
		    var params={roleId:win.innerArgs};
		   // this.formLoad(url,params);		
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){
					//alert(response.responseText);
					var f = this.lookupI('roleForm');				
					var json = response.responseText;
					var resObj = Ext.decode(json);
					f.getForm().setValues(resObj.form);					
					this.body.unmask();
				},
				failure : function(){
					this.body.unmask();
					alert('error');
				}
			});
			
		}
		//win.buttons[0].setHandler(this.aForward,win);
		//win.buttons[1].setHandler(this.aCloseWin,win);
	},
	aForward:function(){
		if(this.innerArgs&&this.winId=="modify"){			
			this.getHost().aModify.call(this);//修改
		}
		else if(this.innerArgs&&winId=="lookDetails"){
			//this.getHost().aModify.call(this);//查看详细
		}
		else {	
			this.getHost().aSave.call(this);//新增
		}		
	},
	//保存修改后的询价单
	aSave:function(){
		//system.look(this);
		this.getHost().rSave.call(this);
	},
	//保存修改后的询价单
	aModify:function(){	
		this.getHost().rModifySave.call(this);
	},
	aCloseWin:function(){
		this.close();
	}
});