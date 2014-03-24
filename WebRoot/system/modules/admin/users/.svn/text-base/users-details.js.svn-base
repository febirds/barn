 Ext.override(MC.app.Users, {
 	details : function(win) {
		var addpanel = new Ext.form.FormPanel({
			layout : 'anchor',
			itemId:'userForm',				
			layout : 'column',			
			autoWidth : true,			
			frame:true,
			buttonAlign : 'center',
			defaults:{defaultType:'textfield',bodyStyle:'padding:5px 5px 0',labelWidth:80},		
			items : [
				{
					xtype:'fieldset',
					title:'用户状态信息',
					layout:'form',
					labelAlign : 'right',
					width:400,
					height:250,
					items:[
					{
						fieldLabel : lang.users.userId,
						name : 'userId',
						anchor : '90%',											
						disabled:true						
					},{
						fieldLabel : lang.users.logName,
						name : 'logName',
						anchor : '90%',				
						disabled:true
						
					}, {
						fieldLabel : '登陆名称',
						name : 'zhName',
						disabled:true,
						anchor : '90%'
					
					}, {
						fieldLabel : lang.users.userState,
						name : 'userState',
						hiddenName : 'userState',					
						xtype : 'combo',
						store : this.getStore('userState'),
						valueField : "retrunValue",
						displayField : "displayText",
						mode : 'local',
						forceSelection : false,					 
						disabled:true,	
						value : 1,
						triggerAction : 'all',
						anchor : '90%'
					}, {
						fieldLabel : lang.users.email,
						vtype : 'email',
						name : 'email',
						disabled:true,	
						anchor : '90%'				
					},{	
						xtype:'datefield',
						fieldLabel : '创建日期',							
						format : 'Y-m-d',						
						itemId:'createTime',
						name : 'createTime',										
						disabled: true,					
						anchor : '90%'
					},{	
						xtype:'datefield',
						fieldLabel : '失效时期',							
						format : 'Y-m-d',					
						value : '2015-01-01',
						itemId:'endTime',
						name : 'endTime',
						disabled: true,	
						anchor : '90%'
					}
					]
			},{
					xtype:'fieldset',
					title:'用户状态信息',
					layout:'form',
					labelAlign : 'right',
					width:400,
					height:250,
					items:[
					{	
						xtype:'datefield',
						fieldLabel : '登陆时间',							
						format : 'Y-m-d',						
						itemId:'logTime',
						name : 'logTime',				
						disabled:true,					
						anchor : '90%'
					},{	
						xtype:'datefield',
						fieldLabel : '登陆IP',							
						format : 'Y-m-d',	
						disabled:true,		
						itemId:'logIp',
						name : 'logIp',
						anchor : '90%'
					},
					{
						fieldLabel : '登录标识',
						name : 'logId',
						itemId:'logId',
						anchor : '90%',											
						disabled: true					
					}
					]
			}
					],
			buttons : [{
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
			win.body.mask('loading');
			var url = 'admin/users/users.do?method=loadUser';
		    var params={userId:win.innerArgs};	
		    //system.look(win.innerArgs);
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
	}
 });