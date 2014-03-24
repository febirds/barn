Ext.override(MC.app.Resource, {
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
				frame : true,				
				defaults : {
					labelWidth : 55,
					labelPad : 5,
					labelAlign : 'right',					
					defaultType : 'textfield',
					layout : 'form',
					defaults : {
						anchor : '100%'
					}
				},
				items : [				  
					{
					columnWidth : 1,
					items : [
					{
						fieldLabel : '资源编号',	
						disabled:c.innerArgs?false:true,
						hidden:c.innerArgs?false:true, 
						hideLabel:c.innerArgs?false:true,
						readOnly:true,
						cls:'x-item-disabled',
						itemId:'rsId',
						name : 'rsId'
					},
					{
						fieldLabel : '资源名称',	
						itemId:'rsName',
						name : 'rsName',
						//allowBlank : false,
						blankText:'资源名称不能为空'
					},{
						xtype : 'combo',
						fieldLabel : '所属资源',
						itemId:'parentId',
						name : 'parentId',
						store : this.getStore('parentIdStore'),
						displayField : "parentId",
						loadingText : "查询中...",
						triggerAction : 'all',
						hiddenName:'parentId',
						readOnly:true,
						cls:'x-item-disabled',
						hideTrigger : false,// 下拉按键显示/隐藏						
						queryParam : "parentId",
						minChars : 1
						
					},{
						xtype : 'combo',
						fieldLabel : '资源类型',
						itemId:'rsType',
						name : 'rsType',
						store : this.getStore('rsTypeStore'),
						displayField : "rsType",
						loadingText : "查询中...",
						triggerAction : 'all',
						hiddenName:'rsType',
						readOnly:true,
						cls:'x-item-disabled',
						hideTrigger : false,// 下拉按键显示/隐藏						
						queryParam : "rsType",
						minChars : 1
						
					},  {
						xtype : 'combo',
						fieldLabel : '资源状态',
						itemId:'rsState',
						name : 'rsState',
						store : this.getStore('rsStateStore'),
						displayField : "rsState",
						loadingText : "查询中...",
						triggerAction : 'all',
						hiddenName:'rsState',
						readOnly:true,
						cls:'x-item-disabled',
						hideTrigger : false,// 下拉按键显示/隐藏						
						queryParam : "rsState",
						minChars : 1										
					},{
						xtype:'textarea',
						fieldLabel : '备注',						
						name : 'roleMemo'
					}]
				}
				]
			}]
		});
	},
	browser: function(win) {
		// 树模块
	var treepanel = new Ext.tree.TreePanel({
         onlyLeafCheckable:false, 
         bodyBorder:true,
        split:true,  
        animate: false,  
        rootVisible: false,
        autoScroll:true,
        height:427,
        // 加载树节点JSON数据
        loader: new Ext.tree.TreeLoader({  
        	dataUrl:'sysadmin/SysMenuMgrAction.do?act=getTree',  
        	baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI }  
       }),                  
		root: new Ext.tree.AsyncTreeNode({  
      	  	id:'root',text:'根结点'  
        })  
    });
	// 树的单击事件
    treepanel.on('click', function(node){
    	Ext.Ajax.request({
    		url:'sysadmin/SysMenuMgrAction.do?act=searchDote',
    		params:{nodeId:node.id},
    		callback:function(o,f,r){
    			if(!f)
    			{
    				alert('error');
    				return;
    			}
    			var result = Ext.decode(r.responseText);
    			a.setValues(result);
    		}
    	});
    	return;
    	   //system.look(node.id);
		 document.getElementById("tableP").src = "sysadmin/SysMenuMgrAction.do?act=searchDote&nodeId="+node.id;   	
    });
	/*var tablepanel = new Ext.Panel({
		 region:'center',  
		 html:'<iframe frameborder="0" id="tableP" width=100% height=100% id="top" src="sysadmin/AddRootMenu.do"></iframe>'
	});*/
	var tablepanel = this.appendPanelSource(this);
    // 加载树布局的Panel
	var panel = new Ext.Panel({
		id:'parent',  
        region: 'west',
        title: '系统资源树',
        width: 200,
		autoScroll: true,
        split: true,
        items:[treepanel]
    });
	
	// 页面框架
	var main = new Ext.Panel({
		layout:'border',  
		items:[tablepanel,panel]
	});
		win.add(main);
		win.doLayout();		
	},	
	// 查询按钮监听事件
	bQuery : function() {
		var toolbar = this.getComponent(0).getTopToolbar();
		var roleName = encodeURIComponent(toolbar.getComponent('roleName').getValue());		
		var param={roleName:roleName,start : 0,limit : 15};		
		this.getHost().getStore('roleStore').load({params:param});	
	}
	
});