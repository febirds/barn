Ext.override(MC.app.Personal, {
 	browser : function(win) {
		var addpanel = new Ext.form.FormPanel({
			layout : 'anchor',
			itemId:'operatorForm',
			labelWidth : 80, 
			bodyStyle : 'padding:5px 5px 0',//为body元素自定义的CSS样式格式为 Ext.Element.applyStyles
											//类指定的格式(默认值为 null)。 
			layout : 'form',
			msgTarget : 'under',
			autoWidth : true,
			labelAlign : 'right',
			frame:true,
			buttonAlign : 'center',
			defaultType : 'textfield',
			//reader : this.getStore('operators').reader,
			items : [
					{
						fieldLabel : '旧密码',
						name : 'oldOperPwd',
						itemId:'oldOperPwd',
						anchor : '95%',
						inputType : 'password',//输入的类型是password类型
						//allowBlank : win.innerArgs?false:true,
						//hideLabel:win.innerArgs?true: false,
						//disabled:win.innerArgs?true: false,
						//hidden :win.innerArgs?true: false,
						allowBlank:false,
						blankText :  '旧密码不能为空'
					},
					 {
						fieldLabel : '新密码',
						name : 'operPwd',
						itemId:'operPwd',
						anchor : '95%',
						inputType : 'password',//输入的类型是password类型
						minChars : 1,
						//allowBlank : win.innerArgs?false:true,
						//hideLabel:win.innerArgs?true: false,
						//disabled:win.innerArgs?true: false,
						//hidden :win.innerArgs?true: false,
						allowBlank:false,
						blankText :  '新密码不能为空'
					}, {
						fieldLabel : '重复密码',
						name : 'checkPwd',
						itemId:'checkPwd',
						anchor : '95%',
						minChars : 1,
						//hideLabel:win.innerArgs?true: false,
						//disabled:win.innerArgs?true: false,
						//hidden :win.innerArgs?true: false,
						inputType : 'password',
						allowBlank : false,
						blankText : '重复密码不能为空'
					}],
			buttons : [{
				//text : lang.users.ok,
				text:"保存",
				scope : win,
				handler : this.aSave
			}, {
				//text : lang.users.reset,
				text:'重置',
				scope:win,
				handler : this.aReset
			}]
			});
		win.add(addpanel);
		win.doLayout();
	},

	aSave : function() {
		if(this.lookupI('oldOperPwd').getValue()==null||this.lookupI('operPwd').getValue()==null
		||this.lookupI('oldOperPwd').getValue()==""||this.lookupI('operPwd').getValue()==""){
		this.alert("提示","输入的不能为空");
		return;
		}
		if (this.lookupI('operPwd').getValue() != this.lookupI('checkPwd').getValue()){
			this.alert("提示","两次密码输入的不一致");
			return;
		}
		var url = "adminTwo/personal/personal.do?method=modify";		
		if (this.lookupI("operatorForm").getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');	
				this.lookupI("operatorForm").getForm().submit({
					url : url,
					//params : params,
					method : 'post',
					scope : this,
					success : function(result, request) {												
								this.body.unmask();
								this.alert('提示', '修改成功!',function(){
									this.lookupI("operatorForm").form.reset();
									this.close();	
								},this);
								//this.getStore("operators").reload();
					},
					failure : function(form, action) {					
						this.alert('执行失败', '旧密码输入错误，请重新输入');
						this.body.unmask();
	
					}
			});
		} else {

		}
	},
	aReset:function(){
		this.lookupI("operatorForm").form.reset();
	},
	aModify:function(){
		if (this.lookupI('operPwd').getValue() != this.lookupI('checkPwd').getValue()){
			this.alert("提示","两次输入的密码不一致");
			return;
		}
		var url = "adminTwo/operator/operator.do?method=modify";	
		if (this.lookupI("operatorForm").form.isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');
			this.lookupI("operatorForm").form.submit({
				url : url,
				// params : params,
				method : 'post',
				scope : this,
				success : function(result, request) {				
							this.body.unmask();
							this.alert('提示', '修改成功!');																	
							this.lookupI("operatorForm").form.reset();	
							this.getStore("operators").reload();
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
			this.alert(lang.users.success,lang.users.remember_password );
			form.reset();
		}
		else {
				this.alert('提示', '保存失败!');
				this.body.unmask();
		}
		
	},
	aFailure : function(){
		this.alert(lang.users.faile, lang.users.retry_please);
	},
	aOpenEmployeeWin:function() {
		this.ownerCt.ownerCt.createWindow({			
			title : '职员信息',
			buttonAlign : 'center',
			innerView : 'queryEmployee',
			clearer:['queryEmployeeStore'],
			width:640,
			height:350,
			border : false,
			maximizable : true,
			layout : 'fit',
			buttons : [{
				text : '确定'				
			}, {
				text : '关闭'				
			}]

		}).show();
	},
	aComboCemployeeCode:function(_combo, record) {
		// this.getComponent(0).getComponent(0).getComponent(1).getComponent(1).setValue(record.data.cemployeeName);
		// this.getComponent(0).getComponent(0).getComponent(2).getComponent(1).setValue(record.data.cdepCode);
		// this.getComponent(0).getComponent(0).getComponent(3).getComponent(1).setValue(record.data.cdepName);
		this.getComponent(0).getComponent(0).getForm().loadRecord(record);
		_combo.collapse();
	}
 });
 
