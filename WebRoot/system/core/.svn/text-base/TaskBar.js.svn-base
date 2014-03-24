/*
 * 任务栏 类
 */
MC.TaskBar = function(sys){
    this.system = sys;
    this.init();
};

Ext.extend(MC.TaskBar, Ext.util.Observable, {
    init : function(){
		this.quickStartPanel = new MC.QuickStartPanel({
	        id: 'ux-quickstart-panel',
	        minWidth: 50,
	        width:100,
			region:'west',
			split: true
		});

		this.taskButtonPanel = new MC.TaskButtonsPanel({
			id: 'ux-taskbuttons-panel',
			region:'center',
			split: true
		});

		var panelWrap = new Ext.Panel({
			id: 'ux-taskbar-panel-wrap',
			items: [this.quickStartPanel,this.taskButtonPanel],
			layout: 'border',
			region: 'center'
		});
				
        var container = new MC.TaskBarContainer({
			el: 'ux-taskbar',
			cls:'xx-taskbar',
			layout: 'border',
			items: [panelWrap]
		});
		this.el = container.el;
		
		return this;
    },
    
	setActiveButton : function(btn){
		this.taskButtonPanel.setActiveButton(btn);
	}
});

MC.TaskBarContainer = Ext.extend(Ext.Container, {
    initComponent : function() {
        MC.TaskBarContainer.superclass.initComponent.call(this);
        
        this.el = Ext.get(this.el) || Ext.getBody().createChild({tag:'div',id:this.id});
        this.el.createChild({tag:'div',cls:'x-clear'});
        this.el.setHeight = Ext.emptyFn;
        this.el.setWidth = Ext.emptyFn;
        this.el.setSize = Ext.emptyFn;
        this.el.setStyle({
            overflow:'hidden',
            margin:'0',
            border:'0 none'
        });
        this.el.dom.scroll = 'no';
        this.allowDomMove = false;
        this.autoWidth = true;
        this.autoHeight = true;
        Ext.EventManager.onWindowResize(this.fireResize, this);
        this.renderTo = this.el;
    },

    fireResize : function(w, h){
        this.fireEvent('resize', this, w, h, w, h);
    }
});

