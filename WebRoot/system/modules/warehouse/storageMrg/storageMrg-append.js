Ext.override(MC.app.StorageMrg, {
 	append : function(win) {
		var addpanel = new Ext.form.FormPanel({
			layout : 'anchor',
			itemId:'userForm',
			labelWidth : 60, 
			bodyStyle : 'padding:5px 50px 0',
			layout : 'form',
			msgTarget : 'under',
			autoWidth : true,
			labelAlign : 'right',
			frame:true,
			buttonAlign : 'center',
			defaultType : 'textfield',
			reader : this.getStore('storageMrg').reader,
			items : [{
						fieldLabel : '用户编号',
						name : 'bean.id',
						anchor : '100%',
						readOnly:true,
						cls:'x-item-disabled'
					},{
						fieldLabel : '用户帐号',
						name : 'bean.logName',
						anchor : '100%',
						allowBlank : false,
						tooltip : '请输入用来登录的帐号！',
						blankText : '用户帐号不能为空！'
					}, {
						fieldLabel : '用户密码',
						name : 'bean.password',
						itemId:'bean.password',
						anchor : '100%',
						inputType : 'password',
						hideLabel:win.innerArgs?true: false,
						disabled:win.innerArgs?true: false,
						hidden :win.innerArgs?true: false,
						allowBlank : false,
						blankText : '密码不能为空！'
					}, {
						fieldLabel : '确认密码',
						name : 'checkPwd',
						itemId:'checkPwd',
						anchor : '100%',
						hideLabel:win.innerArgs?true: false,
						disabled:win.innerArgs?true: false,
						hidden :win.innerArgs?true: false,
						inputType : 'password',
						allowBlank : false,
						blankText : '密码确认不能为空！'
					}, {
						fieldLabel : '真是姓名',
						name : 'bean.zhName',
						anchor : '100%',
						allowBlank : false,
						blankText : '不能为空！'
					}, {
						fieldLabel : '管理用户',
						name : 'bean.isAdmin',
						hiddenName : 'isAdmin',
						allowBlank : false,
						blankText : '不能为空！',
						xtype : 'combo',
						store : this.getStore('isAdmins'),
						valueField : "value",
						displayField : "text",
						mode : 'local',
						forceSelection : false,
						editable : false,
						value : 0,
						triggerAction : 'all',
						anchor : '100%'
					}, {
						fieldLabel : '用户状态',
						name : 'bean.enable',
						hiddenName : 'enable',
						allowBlank : false,
						blankText : '不能为空！',
						xtype : 'combo',
						store : this.getStore('storageMrgState'),
						valueField : "value",
						displayField : "text",
						mode : 'local',
						forceSelection : false,
						emptyText : '设置用户状态',
						editable : false,
						value : 1,
						triggerAction : 'all',
						anchor : '100%'
					}, {
						fieldLabel : '电子邮件',
						vtype : 'email',
						name : 'bean.email',
						anchor : '100%',
						allowBlank : false,
						blankText : 'email不能为空！'
					}],
			buttons : [{
				text:win.innerArgs?"修改":"保存",
				scope : win,
				handler : this.aForward
			}, {
				text:'关闭',
				scope:win,
				handler : function() {
					this.close();
				}
			}]
			});
		win.add(addpanel);
		win.doLayout();
		if(win.innerArgs){
			win.body.mask('loading');
			var url = 'admin/user_load.action';
		    var params={userId:win.innerArgs};		  	
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){					
					var f = this.lookupI('userForm');				
					var json = response.responseText;
					var resObj = Ext.decode(json);
					f.getForm().setValues(resObj.data);					
					this.body.unmask();
				},
				failure : function(){
					this.body.unmask();
					alert('error');
				}
			});
		}
	},
	mSuccess : function(form,action){
		
	},
	mFailure : function(response,option){
		
	},
	aForward:function(){
		if(this.innerArgs){			
			this.getHost().aModify.call(this);//修改
		}
		else if(this.innerArgs&&winId=="lookup"){
		
		} else {	
			this.getHost().aSave.call(this);//新增
		}		
	},
	aSave : function() {
		var url = "admin/user_save.action";		
		if (this.lookupI("userForm").getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');			
			if (this.lookupI('bean.password').getValue() == this.lookupI('checkPwd').getValue())
			{
				this.lookupI("userForm").getForm().submit({
					url : url,
					method : 'post',
					scope : this,
					success : function(result, request) {												
								this.body.unmask();
								this.alert('提示', '保存成功!');
								this.lookupI("userForm").form.reset();																				
					},
					failure : function(form, action) {					
						this.alert('执行失败', '保存失败!');
						this.body.unmask();
	
					}
			});
			}
			else {
				this.alert("提示","两次输入的密码不一致");
			}
		} else {

		}
	},
	aModify:function(){
		var url = "admin/user_update.action";	
		if (this.lookupI("userForm").form.isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			this.lookupI("userForm").form.submit({
				url : url,
				method : 'post',
				scope : this,
				success : function(result, request) {				
							this.body.unmask();
							this.alert('提示', '修改成功!');																	
							this.lookupI("userForm").form.reset();	
							this.getStore("storageMrg").reload();
							this.close();														
				},
				failure : function(form, action) {
						this.body.unmask();
						this.alert('提示', '修改失败!');

				}
			});

		} else {

		}
	},
	aSuccess : function(form, action){
		if(form.responseText=="{success:true}")
		{
			this.alert('提示','保存成功!');
			form.reset();
		}
		else {
				this.alert('提示', '保存失败!');
				this.body.unmask();
		}
		
	},
	aFailure : function(){
		this.alert('错误', '保存失败！请重试！');
	}
 });
 
