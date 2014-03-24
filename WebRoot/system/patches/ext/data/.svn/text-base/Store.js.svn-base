/**
 * 扩展store的功能，使之有更换连接的功能
 */
Ext.override(Ext.data.Store,{
	//private
	createLinks : function(){
		this.links = [];
		this.links.push({
			linkId:this.linkId?this.linkId:'base',
			baseParams:this.baseParams?this.baseParams:{},
			proxy:this.proxy?this.proxy:null,
			reader:this.reader?this.reader:null,
			recordType:this.recordType?this.recordType:null,
			fields:this.fields?this.fields:null
		});
		if(this.linksConfig)
		{
			this.registLinks(this.linksConfig);
			delete this.linksConfig;
		}
	},
	/**
	 * 注册一个连接
	 */
	registLinks : function(config){
		if(!this.links)
		{
			this.createLinks();
		}
		if(Ext.isArray(config)){
            for(var i = 0, len = config.length; i < len; i++) {
                this.registLinks(config[i]);
            }
        }
		var link = Ext.apply(config,{});
		if(link.url && !link.proxy){
        	link.proxy = new Ext.data.HttpProxy({url: link.url});
	    }
	    if(link.reader){
	        if(!link.recordType){
	            link.recordType = link.reader.recordType;
	        }
	        if(link.reader.onMetaChange){
	            link.reader.onMetaChange = this.onMetaChange.createDelegate(this);
	        }
	    }
	    if(link.recordType){
	        link.fields = link.recordType.prototype.fields;
	    }
	    if(link.proxy)
	    {
	    	this.relayEvents(link.proxy,["loadexception"]);
	    }
	    this.links.push(link);
	},
	/**
	 * 设置当前连接
	 */
	setLink : function(l){
		if(Ext.type(l) == 'string')
		{
			var lk = this.getLink(l);
			Ext.apply(this,lk);
		}else if(Ext.type(l) == 'object')
		{
			this.registLinks(l);
			Ext.apply(this,this.getLink(l.linkId));
		}
	},
	/**
	 * 得到store的一个连接
	 */
	getLink : function(o){
		if(!this.links)
		{
			this.createLinks();
		}
		for(var i=0;i<this.links.length;i++)
		{
			if(o===(this.links[i].linkId))
			{
				return this.links[i];
			}
		}
		return null;
	}
	
});