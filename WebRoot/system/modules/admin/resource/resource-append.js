Ext.override(MC.app.Resource, {
	append : function(win) {
		var p = this.appendPanelSource(win);
		win.add(p);
		win.doLayout();		
		if(win.innerArgs)
		{			
			win.body.mask('loading');
			var url = 'admin/role/role.do?method=getDetails';
		    var params={roleId:win.innerArgs};
		   // this.formLoad(url,params);		
			Ext.Ajax.request({
				url:url,
				params:params,
				scope:win,
				success : function(response,option){
					//alert(response.responseText);
					var f = this.getComponent(0).getComponent(0);				
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
		win.buttons[0].setHandler(this.aForward,win);
		win.buttons[1].setHandler(this.aCloseWin,win);
	},
	aForward:function(){
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