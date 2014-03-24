/**
 * 扩展容器的功能，使之有遍历其容器内部组件的能力
 */
Ext.override(Ext.Container,{
	/**
	 * 根据itemId或id查找此容器下面的组件
	 */
	lookupI:function(comp){
		var itm = this.getI(comp),xtype;
		if(itm)
		{
			return itm;
		}
		if(this.items && this.items.get)
		{
			for(var i = 0, len = this.items.length; i < len; i++){
	        	if(this.getI(i).getXTypes &&(xtype = this.getI(i).getXTypes()).indexOf('container')!=-1&&xtype.indexOf('editorgrid')==-1&&xtype.indexOf('grid')==-1)
	        	{
	        		var back =  this.getI(i).lookupI(comp);
	        		if(back!=null&&back!='undefined'){
	        			return back;
	        		}
	        	}
			}
		}
		return null;
	},
	//private
	getI : function(comp){
        if(typeof comp == 'object'){
            return comp;
        }
        if(this.items && this.items.get)
        {
        	return this.items.get(comp);
        }else{
        	return null;
        }
    }
});