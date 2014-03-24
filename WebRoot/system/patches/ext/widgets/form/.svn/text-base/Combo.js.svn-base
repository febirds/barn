/**
*Ext.form.ComboBox补丁
*/
Ext.override(Ext.form.ComboBox,{
	dDataAhead : true,
	isDData:false,
	onLoad : function(){
        if(!this.hasFocus){
            return;
        }
        if(this.store.getCount() > 0){
        	if(!this.isDData && this.defaultData)
        	{
        		var r = this.store.reader.readRecords(this.defaultData).records;
        		if(this.dDataAhead)
        		{
        			this.store.insert(0,r);
        		}else{
        			this.store.add(r);
        		}
        		this.isDData=true;
        	}
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable){
                    this.el.dom.select();
                }
                if(!this.selectByValue(this.value, true)){
                    this.select(0, true);
                }
            }else{
                this.selectNext();
                if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
                    this.taTask.delay(this.typeAheadDelay);
                }
            }
        }else{
            this.onEmptyResults();
        }
    },
     onDestroy : function(){
				//unset listener
     	if(this.defaultData)
     	{
     		this.defaultData = null;
     		delete this.defaultData;
     	}
        Ext.getDoc().un('mousewheel', this.collapseIf, this);
        Ext.getDoc().un('mousedown', this.collapseIf, this);
        if(this.view){
            Ext.destroy(this.view);//"this.view" need run function "destroy" for destroy element.
        }
        if(this.list){
				// unset listeners
            if (this.innerList) {
                this.innerList.un('mouseover', this.onViewOver, this);
                this.innerList.un('mousemove', this.onViewMove, this);
            }
            this.list.destroy();
        }
        this.bindStore(null);
        Ext.form.ComboBox.superclass.onDestroy.call(this);
    }
});
