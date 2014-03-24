Ext.override(MC.app.Operators, {
 	append : function(win) {
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
						fieldLabel : '编号',
						name : 'operId',
						anchor : '80%',
						hideLabel:win.innerArgs?false:true,
						readOnly:true,
						cls:'x-item-disabled',
						disabled:win.innerArgs?false: true,
						hidden :win.innerArgs?false: true
					},
						
					{
		    							/*xtype:'trigger',
		    							fieldLabel :'配件名称',
		    							name : 'cinvName',
		    							itemId : 'cinvName',
		    							allowBlank:true,
		    							//readOnly : true,
										//blankText: '该字段不能为空',
										triggerClass:'x-form-search-trigger',
										//clickId : 'b',
										onTriggerClick:this.aOpenEmployeeWin4*/
		    							
						xtype : 'trigger',
						fieldLabel : '姓名',
						name : 'zhName',
						itemId:'zhName',
						anchor : '80%',
						//disabled:win.winId=="lookDetails"?true:false,
						//store : this.getStore('cpersonCodeStore'),
						//displayField : "zhName",
						//valueField : 'zhName',
						//fieldLabel : '姓名',
						//loadingText : "查询中...",
						triggerAction : 'all',
						//hideTrigger : false,// 下拉按键显示/隐藏，再这里是否隐藏放大镜
						triggerClass : 'x-form-search-trigger',//渲染成一个放大镜的样子
						//queryParam : "zhName",//查询的名称，因为它会通过在查询字符串
						minChars : 1,//在自动完成和typeahead起作用之前，用户必须键入的最少字符个数 
						onTriggerClick : this.aOpenEmployeeWin//触发的函数
					},
					/*{
						fieldLabel : '姓名',
						name : 'zhName',
						anchor : '100%',
						allowBlank : false,
						blankText : lang.users.zhName_empty
					},*/
					{
						fieldLabel : '登录名',
						name : 'operName',
						anchor : '80%',
						allowBlank : false,//如果为false，输入长度>0时才合法(默认值为 true) 
						tooltip : lang.users.logName_please,
						blankText : lang.users.logName_empty
					}, {
						fieldLabel : '密码',
						name : 'operPwd',
						itemId:'operPwd',
						anchor : '80%',
						inputType : 'password',//输入的类型是password类型
						//allowBlank : win.innerArgs?false:true,
						//hideLabel:win.innerArgs?true: false,
						//disabled:win.innerArgs?true: false,
						//hidden :win.innerArgs?true: false,
						blankText : lang.users.password_empty
					}, {
						fieldLabel : '重复密码',
						name : 'checkPwd',
						itemId:'checkPwd',
						anchor : '80%',
						//hideLabel:win.innerArgs?true: false,
						//disabled:win.innerArgs?true: false,
						//hidden :win.innerArgs?true: false,
						inputType : 'password',
						//allowBlank : false,
						blankText : lang.users.re_password_empty
					},{
						fieldLabel : lang.users.email,
						vtype : 'email',
						name : 'coMail',
						anchor : '80%',
						allowBlank : true,
						blankText : lang.users.email_empty
					},{
						//xtype : 'combo',
						//anchor : '80%',
						fieldLabel : '职员编号',
						anchor : '80%',
						name : 'empId',
						itemId:'empId',
						displayField : "empId",
						valueField : 'empId',
						disabled:win.winId=="lookDetails"?true:false,					
						hidden : true,	
						hideMode:'visibility',
						hideLabel:true
					}
					/*
					, new Ext.form.DateField({

								fieldLabel : lang.users.endTime,
								anchor : '100%',
								format : 'Y-m-d',
								allowBlank : false,
								layout : 'form',
								blankText : lang.users.endTime_empty,
								value : 2015-01-01,
								name : 'endTime',
								emptyText : lang.users.endTime_please,
								invalidText : lang.users.endTime_invalid
							})*/],
			buttons : [{
				//text : lang.users.ok,
				text:win.innerArgs?"修改":"保存",
				scope : win,
				handler : this.aForwardOperators
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

		if(win.innerArgs){
		/*
			addpanel.form.load({
				url : 'admin/users/users.do?method=loadUser',
				method : 'post',
				params:{operId:win.innerArgs},
				waitTitle : lang.users.wait,
				waitMsg : lang.users.popWait,
				success : this.mSuccess,
				failure : this.mFailure,
				scope:this
			});
			
			Ext.Ajax.request({
				url:'sysmgr/users/usersQuery.do?method=loadUser',
				params:{operId:win.innerArgs},
				scope:win,
				success : this.mSuccess,
				failure : this.mFailure
			});*/
			win.body.mask('loading');
			var url = 'adminTwo/operator/operator.do?method=queryOperator';
		    var params={operId:win.innerArgs};
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){					
					var f = this.lookupI('operatorForm');
					var json = response.responseText;
					var resObj = Ext.decode(json);
					this.lookupI('checkPwd').setValue(resObj.form.operPwd);
					f.getForm().setValues(resObj.form);					
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
			//this.body.unmask();
			//alert('error');
	},
	aForwardOperators:function(){
		if(this.innerArgs){			
			this.getHost().aModifyOperators.call(this);//修改
		}
		else if(this.innerArgs&&winId=="lookup"){
			//this.getHost().aModify.call(this);//查看详细
		}
		else {	
			this.getHost().aSaveOperators.call(this);//新增
		}		
	},
	aSaveOperators : function() {
		if (this.lookupI('operPwd').getValue() != this.lookupI('checkPwd').getValue()){
			this.alert("提示","两次输入的密码不一致");
			return;
		}
		var url = "adminTwo/operator/operator.do?method=add";		
		if (this.lookupI("operatorForm").getForm().isValid()) {
			this.body.mask('请稍候...', 'x-mask-loading');	
				this.lookupI("operatorForm").getForm().submit({
					url : url,
					//params : params,
					method : 'post',
					scope : this,
					success : function(result, request) {												
								this.body.unmask();
								this.alert('提示', '保存成功!');
								this.lookupI("operatorForm").form.reset();
								this.getStore("operators").reload();
								
					},
					failure : function(form, action) {					
						this.alert('执行失败', '保存失败!');
						this.body.unmask();
	
					}
			});
		} else {

		}
	},
	aModifyOperators:function(){
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
			title : '雇员信息',
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
 
