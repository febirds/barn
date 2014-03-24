Ext.override(MC.app.Menu, {
		appendPanelSource : function(c){
		return new Ext.Panel({
			border : true,
			region:'center',
			buttonAlign:'center',			
			layout : 'anchor',
			items : [{
				anchor : '100%',
				layout : 'column',
				xtype : 'form',
				itemId:'menuForm1',
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
					columnWidth : 1,
					items : [
					{
						fieldLabel : '菜单编号',	
						//disabled:c.innerArgs?false:true,
						//hidden:c.innerArgs?false:true, 
						//hideLabel:c.innerArgs?false:true,
						//readOnly:true,
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
						//xtype : 'combo',
						fieldLabel : '父菜单编号',
						itemId:'menuParentId',
						name : 'menuParentId'
						/*store : this.getStore('menuParentIdStore'),
						displayField : "menuParentId",
						loadingText : "查询中...",
						triggerAction : 'all',
						hiddenName:'menuParentId',
						readOnly:true,
						triggerClass : 'x-form-search-trigger',
						hideTrigger : false,// 下拉按键显示/隐藏						
						queryParam : "menuParentId",
						onTriggerClick : this.aOpenMenuWin,
						minChars : 1*/
						
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
			}]
		});
	},
	browser: function(win) {
		// 树模块
	var treepanel = new Ext.tree.TreePanel({
		itemId:'treepanelId',
        onlyLeafCheckable:false, 
        bodyBorder:true,
        region: 'west',
        title: '系统菜单树',
        width: 200,
        split:true,  
        animate: false,  
        rootVisible: false,
        autoScroll:true,
        height:427,
        // 加载树节点JSON数据
        loader: new Ext.tree.TreeLoader({  
        	//dataUrl:'sysadmin/SysMenuMgrAction.do?act=getTree',  
        	dataUrl:'adminTwo/menu/menu.do?method=loadMenuTree',  
        	baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI }  
       }),                  
		root: new Ext.tree.AsyncTreeNode({  
      	  	id:'root',text:'根结点'  
        })  
    });
	// 树的单击事件
    treepanel.on('click', function(node){
    	//system.look(this.lookupI('menuForm'));
    	//system.look(node.text);
       // system.look(node.leaf);
    	Ext.Ajax.request({
    		url:'adminTwo/menu/menu.do?method=getMenu',
    		params:{menuId:node.id},
    		scope:this,
    		callback:function(o,f,r){
    			if(!f)
    			{
    				alert('error');
    				return;
    			}
    			var result = Ext.decode(r.responseText);
    			//system.look(result.form);
    			this.lookupI('menuForm1').getForm().setValues(result.form);
    		}
    	});
    	return;
    	   //system.look(node.id);
		 //document.getElementById("tableP").src = "sysadmin/SysMenuMgrAction.do?act=searchDote&nodeId="+node.id;   	
    },this);
	/*var tablepanel = new Ext.Panel({
		 region:'center',  
		 html:'<iframe frameborder="0" id="tableP" width=100% height=100% id="top" src="sysadmin/AddRootMenu.do"></iframe>'
	});*/
	var tablepanel = this.appendPanelSource(this);
    // 加载树布局的Panel
/*	var panel = new Ext.Panel({
		id:'parent',  
        region: 'west',
        title: '系统菜单树',
        width: 200,
		autoScroll: true,
        split: true,
        items:[treepanel]
    });*/
	
	// 页面框架
	var main = new Ext.Panel({
		layout:'border',  
		width:300,
		items:[tablepanel,treepanel]
	});
		win.add(main);
		win.doLayout();		
	},	
	// 菜单信息
	aOpenMenuWin : function() {	
		//system.look(this.ownerCt.ownerCt.ownerCt.ownerCt);
		this.ownerCt.ownerCt.ownerCt.ownerCt.createWindow({			
			title : '菜单信息',
			width:800,
			height:400,
			buttonAlign : 'center',
			innerView : 'query',
			clearer:['menuStore'],
			border : false,
			maximizable : true,
			layout : 'fit',
			buttons : [{
				text : '确定'				
			}, {
				text : '关闭'				
			}]

		}).show();
	}
	
});