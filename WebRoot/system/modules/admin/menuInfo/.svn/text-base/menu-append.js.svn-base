Ext.override(MC.app.Menu, {
	append : function(win) {
		//var p = this.appendPanelSource(win);
		var p = new Ext.Panel({
			border : true,
			region:'center',
			buttonAlign:'center',			
			layout : 'anchor',
			items : [{
				anchor : '100%',
				layout : 'column',
				xtype : 'form',
				itemId:'menuForm2',
				width:200,
				frame : true,				
				defaults : {
					labelWidth : 70,
					labelPad : 5,
					labelAlign : 'right',					
					defaultType : 'textfield',
					layout : 'form',
					defaults : {
						anchor : '95%'
					}
				},
				items : [				  
					{
					items : [
					{
						fieldLabel : '菜单编号',	
						//disabled:c.innerArgs?false:true,
						//hidden:c.innerArgs?false:true, 
						//hideLabel:c.innerArgs?false:true,
						readOnly:win.innerArgs?true:false,
						//cls:'x-item-disabled',
						itemId:'menuId',
						name : 'menuId'
					},
					{
						fieldLabel : '菜单名称',	
						itemId:'menuName',
						name : 'menuName',
						//allowBlank : false,
						blankText:'菜单名称不能为空'
					},{
						fieldLabel : '菜单序号',	
						itemId:'menuOrderBy',
						name : 'menuOrderBy',
						//allowBlank : false,
						blankText:'菜单名称不能为空'
					},{
						xtype : 'combo',
						fieldLabel : '父菜单编号',
						itemId:'menuParentId',
						name : 'menuParentId',
						store : this.getStore('menuParentIdStore'),
						displayField : "menuParentId",
						loadingText : "查询中...",
						triggerAction : 'all',
						hiddenName:'menuParentId',
						readOnly:win.innerArgs?true:false,
						triggerClass : 'x-form-search-trigger',
						//hideTrigger : win.innerArgs?true:false,// 下拉按键显示/隐藏						
						queryParam : "menuParentId",
						onTriggerClick : this.aOpenMenuWin,
						minChars : 1
						
					},
					{
						fieldLabel : '父菜单名称',	
						itemId:'menuParentName',
						name : 'menuParentName'
						//allowBlank : false,
						//blankText:'菜单名称不能为空'
					}]
				}
				]
			}],
			buttons : [{
				//text : lang.users.ok,
				text:win.innerArgs?"修改":"保存",
				scope : win,
				handler : this.aForwardMenu
			}, {
				//text : lang.users.reset,
				text:'关闭',
				scope:win,
				handler : function() {
					this.close();
				}
			}]
		});
		win.add(p);
		
		win.doLayout();		
		if(win.innerArgs)
		{			
			//win.body.mask('loading');
			Ext.Ajax.request({
    		url:'adminTwo/menu/menu.do?method=getMenu',
    		params:{menuId:win.innerArgs},
    		scope:win,
    		callback:function(o,f,r){
    			if(!f)
    			{
    				alert('error');
    				return;
    			}
    			var result = Ext.decode(r.responseText);
    			//system.look(result.form);
    			this.lookupI('menuForm2').getForm().setValues(result.form);
    		}
    	});
			
		}
		/*win.buttons[0].setHandler(this.aForward,win);
		win.buttons[1].setHandler(this.aCloseWin,win);*/
	},
	aForwardMenu:function(){
		if(this.innerArgs){			
			this.getHost().aModify.call(this);//修改
		}
		else if(this.innerArgs&&winId=="lookup"){
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