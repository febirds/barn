Ext.ns('MC.app');
MC.app.Personal = Ext.extend(MC.Window, {
 	title:'个人密码管理',
 	iconCls : 'stop',
 	moduleId:'personal',
 	relativeSize : '1% 1%',//子窗体与相对窗体的相对量
 	minHeight : 200,
	minWidth : 300,
 	//width:100,
 	//height:100,
 	clearer:['personal'],//再加载前可以清空数据
 	//hasStatusBar : true,
 	welcome : function(win){
 		win.add({
 			html:lang.users.welcome_msg
 		});
 		win.doLayout();
 	},
 	initConfig : function(){
 	
 	}
 	/*visibleCondition : function(flag){
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
 	popQuery : function(btn){
 		if(btn.itemId =='qBtn')
 		{
 			var cp = this.getComponent('ctnr').getComponent('condition');
 			if(cp.isVisible())
 			{
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					//cp.getLayout().setActiveItem('qTbar');
 				}else{
 					cp.setVisible(false);
 					this.updateBox(this.getSize());
 					this.setHeight(this.getSize().height-1);//由于ext内部的bug，必须-1；
 				}
 			}else{
 				cp.setVisible(true);
 				this.updateBox(this.getSize());
 				this.setHeight(this.getSize().height+1);//由于ext内部的bug,必须+1；
 				if(cp.getLayout().activeItem.itemId!='qTbar')
 				{
 					cp.getLayout().setActiveItem('qTbar');
 				}
 			}
 		}else if(btn.itemId =='qPopBtn')
 		{
 			this.createWindow({
				title : '查询',
				border:false,
				maximizable : true,
				maskParent:false,
				innerView:'query'
			}).show();
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
			title : '修改密码',
			border:false,
			maximizable : true,
			innerView:'append',
			innerArgs:operId
		}).show();
	}*/
 });
 MC.app.Personal.singleTon = true;
 Ext.onReady(function(){
  window.system.install('personal',MC.app.Personal);
 });
