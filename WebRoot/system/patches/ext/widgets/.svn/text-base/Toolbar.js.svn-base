/**
*补丁memory destroy()
*/
Ext.override(Ext.Toolbar,{
	initComponent : function(){
        Ext.Toolbar.superclass.initComponent.call(this);
        if(this.items){
            this.buttons = this.items;
        }
        this.items = new Ext.util.MixedCollection(false, function(o){
            return o.itemId || o.id || Ext.id();
        });
        this.components = new Ext.util.MixedCollection(false, function(o){
            return o.itemId || o.id || Ext.id();
        });
    },
    getComponent : function(comp){
        if(typeof comp == 'object'){
            return comp;
        }
        return this.components.get(comp);
    },
    onDestroy : function(){
        Ext.Toolbar.superclass.onDestroy.call(this);
        if(this.rendered){
        	if(this.components){
                this.components.clear();
            }
            if(this.items){
                Ext.destroy.apply(Ext, this.items.items);
            }
            Ext.Element.uncache(this.tr);
        }
    },
	addButton : function(config){
        if(Ext.isArray(config)){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!(config instanceof Ext.Toolbar.Button)){
            b = config.split ? 
                new Ext.Toolbar.SplitButton(config) :
                new Ext.Toolbar.Button(config);
        }
        var td = this.nextBlock();
        this.initMenuTracking(b);
        b.render(td);
        b.ownerCt = this;
        this.items.add(b);
        this.components.add(b);
        return b;
    },
    insertButton : function(index, item){
        if(Ext.isArray(item)){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
               buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof Ext.Toolbar.Button)){
           item = new Ext.Toolbar.Button(item);
        }
        var td = document.createElement("td");
        this.tr.insertBefore(td, this.tr.childNodes[index]);
        this.initMenuTracking(item);
        item.render(td);
        item.ownerCt = this;
        this.items.insert(index, item);
        this.components.insert(index, item);
        return item;
    },
    addField : function(field){
        var td = this.nextBlock();
        field.render(td);
        field.ownerCt = this;
        this.components.add(field);
        var ti = new Ext.Toolbar.Item(td.firstChild);
        ti.render(td);
        
        this.items.add(ti);
        return ti;
    },
	destroy : function(){
        if (this.el) {//remove el's AllListeners
            var el = Ext.get(this.el);
            Ext.destroy(el);
        }
			//in ie, the "parentNode.removeChild" make the "td" orphan, so use "Ext.removeNode" to remove it.
        if(this.td){
            Ext.removeNode(this.td);
        }
    }
});
Ext.Toolbar.prototype.getI = Ext.Toolbar.prototype.getComponent;