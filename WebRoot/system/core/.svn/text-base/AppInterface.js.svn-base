
MC.AppInterface = function(config){
    Ext.apply(this, config);
    this.dataSource = Ext.apply(new Ext.util.MixedCollection(), {
    	getKey : function(o){
         return o.storeId || o.id;
    }
    });
    MC.AppInterface.superclass.constructor.call(this);
    //this.init();
}

Ext.extend(MC.AppInterface, Ext.util.Observable, {
	
	launcher : null,
	
	loaded : false,
	
	menuPath : 'StartMenu',
	
	moduleType : null,
	
	moduleId : null,
   
    init : Ext.emptyFn,
   
    createWindow : function(config){
    	return this.system.desktop.createWindow(config);
    },
    
    popWindow : function(config,host){
		Ext.apply(config,{
			wType:'pop',
			hmenu:false,
			minimizable: false,
			listeners:{
				'render': function(p){
					this.body.mask();
					this.child = p;
					p.host = this;
					//this.header.mask();
					/*
	        		tool = this.tools;
	        		for(o in tool){
	        			//alert(Ext.encode(tool[o]));
	        			//tool[o].setVisibilityMode(Element.VISIBILITY);
				        //tool[o].setVisible(false,false);
				         tool[o].mask();
				    }*/
				},
				'close': function(p){
					this.body.unmask();
					this.child = false;
					this.show();
					/*
	        		tool = this.tools;
	        		for(var i = 0, len = tool.length; i < len; i++){
	        			//tool[i].setVisibilityMode(Element.DISPLAY);
				        //tool[i].setVisible(false,true);
				        //tool[i].mask();
				    }*/
				},
				'destroy':function(p){
					p.host = null;
				},
				scope:host
			}
		});
		return this.system.desktop.createWindow(config);

	},

	handleRequest : Ext.emptyFn
});