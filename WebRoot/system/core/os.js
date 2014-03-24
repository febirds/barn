Ext.ns('FILESYSTEM','Mc.filesystem');
SYSTEM = function(){
    var registration = {};
    var applications = {};
    return {
    	registration:registration,
    	applications:applications,
    	eval:function(o, s, r){
    		if(r.responseText)
    		{
    			window.eval(r.responseText);
    		}else if(o.responseText)
    		{
    			window.eval(o.responseText);
    		}
    	},
    	look:function(obj){
					if(typeof obj!="object")
					{
						alert(obj);
						return;
					}
					for(var o in obj)
					{
						if(!window.confirm(''+o+':\n-------------------\n'+obj[o]))
						{
								return;
						}
					}
		}
    };
}();
SYSTEM.FileWork = {
	loadFile:function(f){
		var file = f;
		if(typeof f =='string')
		{
			file = FILESYSTEM.findFile(f);
		}
		SYSTEM.NetWork.request({
            url:file.url?file.url:file.parent.url,
            argument:file,
            params:{
				appId:file.key
			},
			callback:this.callback,
			scope:this
        });
	},
	callback:function(o,f,r){
		var bf = r.argument;
    	if(f)
    	{
    		bf.context = r.responseText;
    		bf.loaded = true
    	}else{
    	}
    	bf.fireEvent("load", bf,o,f,r);
	},
	loadFilesAndEval:function(files,cb){
    	for(var i=0;i<files.length;i++)
    	{
    		FILESYSTEM.findFile(files[i])
    	}
    },
    evalFile:function(path){
    	window.eval(FILESYSTEM.findFile(path).context);
    }
};
SYSTEM.NetWork = /*new Ext.data.Connection(*/{
	works:[],
	workID:0,
	proxy:{},
	request:function(o){
		Ext.Ajax.request(o);
	},
	getWork:function(wId){
		for(var i=0,len=this.works.length;i<len;i++)
		{
			if(wId ==this.works[i]||wId ==this.works[i].workId)
			{
				return this.works[i];
			}
		}
		return null;
	},
	work:function(options){
		var o = options;
		if(typeof options =='array')
		{
			o = {};
			o.tasks = options;
		}
		o.workId = 'work'+this.workID++;
		this.works.push(o);
		this.doWork(o);
	},
	prepareProxy:function(p,ti){
		if(!ti.url)
		{
			ti.url = ti.workCollection.url;
		}
		Ext.apply(p,ti);
		p.workCollection = null;
		delete p.workCollection;
		delete p.success;
		delete p.failure;
		p.argument = ti;
		p.callback = this.callback;
		p.scope = this;
		return p;
	},
	doWork:function(w){
		var t = w.tasks,titm;
		var len=t.length;
		w.taskLen = len;
		for(var i=0;i<len;i++)
		{
			titm = t[i];
			titm.taskId = i;
			titm.workCollection = w;
			titm.tId = Ext.Ajax.request(this.prepareProxy({},titm)).tId;
			
		}
	},
	abortWork : function(workId){
		
	},
	callback:function(option,flag,response){
		var t = response.argument;
		response.tId = t.tId;
		t.result = {
			type:flag,
			response:response
		};
		var wc = t.workCollection;
		if(!flag)
		{
			if(!wc.errors)
			{
				wc.errors = [];
			}
			wc.errors.push(t);
		}
		wc.taskLen = wc.taskLen-1;
		if(wc.taskLen == 0)
		{
			this.exeWork(wc);
		}
	},
	exeWork:function(wk){
		var flag = true;
		if(wk.requestsBack)
		{
			flag = (wk.requestsBack.call(wk.scope?wk.scope:this,wk.tasks)===false)?false:true;
		}
		if(wk.errors&&wk.failure)
		{
			flag = (wk.failure.call(wk.scope?wk.scope:this,wk.errors)===false)?false:true;
		}
		if(!flag)
		{
			return;
		}
		var tasks = wk.tasks,tsk,rslt;
		for(var i=0;i<tasks.length;i++)
		{
			tsk = tasks[i];
			rslt = tsk.result;
			delete tsk.result;
			s = tsk.scope?tsk.scope:window;
			if(tsk.success)
			{
				tsk.success.call(s,rslt.response,tsk);
			}
			if(tsk.failure)
			{
				tsk.failure.call(s,rslt.response,tsk);
			}
			if(tsk.callback)
			{
				tsk.callback.call(s,tsk,rslt.type,rslt.response);
			}
		}
		if(wk.finishFun)
		{
			wk.finishFun.call(wk.scope?wk.scope:this,wk);
		}
		
	}
}/*);*/

Mc.filesystem.FileLoader = function(config){
    this.baseParams = {};
    Ext.apply(this, config);

    this.addEvents(
        "beforeload",
        "load",
        "loadexception"
    );

    Mc.filesystem.FileLoader.superclass.constructor.call(this);
};

Ext.extend(Mc.filesystem.FileLoader, Ext.util.Observable, {
    uiProviders : {},
    clearOnLoad : true,
    load : function(node, options){
    	//if(node.isLeaf()){
    	//	this.requestData(node, callback);
    	//}else{
	        if(this.clearOnLoad){
	            while(node.firstChild){
	                node.removeChild(node.firstChild);
	            }
	        }
	        if(this.doPreload(node)){ // preloaded json children
	            if(typeof options.callback =='function')
	            {
	            	options.callback.call(options.scope?options.scope:node,node);
	            }
	        }else if(this.dataUrl||this.url){
	            this.requestData(node, options);
	        }
    	//}
    },

    doPreload : function(node){
    	var cs = node.attributes.children?node.attributes.children:
                (node.attributes.menus?node.attributes.menus:node.attributes.innerH);
        if(cs){
            if(node.childNodes.length < 1){ // preloaded?
                
                node.beginUpdate();
                for(var i = 0, len = cs.length; i < len; i++){
                    var cn = node.appendChild(this.createNode(cs[i]));
                    if(this.preloadChildren){
                        this.doPreload(cn);
                    }
                }
                node.endUpdate();
            }
            return true;
        }else {
            return false;
        }
    },

    getParams: function(node){
        var buf = [], bp = this.baseParams;
        for(var key in bp){
            if(typeof bp[key] != "function"){
                buf.push(encodeURIComponent(key), "=", encodeURIComponent(bp[key]), "&");
            }
        }
        buf.push("root_id=", encodeURIComponent(node.id));
        return buf.join("");
    },

    requestData : function(node, options){
        if(this.fireEvent("beforeload", this, node) !== false){
            this.transId = Ext.Ajax.request({
                method:this.requestMethod,
                url: this.dataUrl||this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {options: options, node: node},
                params: this.getParams(node)
            });
        }else{
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if(typeof options.callback == "function"){
                options.callback.call(options.scope?options.scope:node,node);
            }
        }
    },

    isLoading : function(){
        return this.transId ? true : false;
    },

    abort : function(){
        if(this.isLoading()){
            Ext.Ajax.abort(this.transId);
        }
    },
    createNode : function(attr){
        if(this.baseAttrs){
            Ext.applyIf(attr, this.baseAttrs);
        }
        if(this.applyLoader !== false){
            attr.loader = this;
        }
        return new Mc.filesystem.AsyncFile(attr);
    },
    /*createNode : function(attr){
        // apply baseAttrs, nice idea Corey!
        if(this.baseAttrs){
            Ext.applyIf(attr, this.baseAttrs);
        }
        if(this.applyLoader !== false){
            attr.loader = this;
        }
        if(typeof attr.uiProvider == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        return(attr.leaf ?
                        new Ext.tree.TreeNode(attr) :
                        new Ext.tree.AsyncTreeNode(attr));
    },*/

    processResponse : function(response, node, options){
        var json = response.responseText;
        if(node.isLeaf())
        {
        	node.source = json;
        	return;
        }
        try {
            var o = eval("("+json+")");
            node.beginUpdate();
            var child = o.menus?o.menus:[];
            for(var i = 0, len = child.length; i < len; i++){
                var n = this.createNode(child[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            if(typeof options.callback == "function"){
                options.callback.call(options.scope?options.scope:node,node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    },

    handleResponse : function(response){
        this.transId = false;
        var a = response.argument;
        this.processResponse(response, a.node, a.options);
        this.fireEvent("load", this, a.node, response);
    },

    handleFailure : function(response){
        this.transId = false;
        var a = response.argument;
        this.fireEvent("loadexception", this, a.node, response);
    }
});


Mc.filesystem.File = Ext.extend(Ext.data.Node,{
	beginUpdate : function(){
        //this.childrenRendered = false;
    },
    endUpdate : function(){
        //if(this.expanded && this.rendered){
        //    this.renderChildren();
        //}
    }
});

Mc.filesystem.AsyncFile = function(config){
    this.loaded = false;
    this.loading = false;
    Mc.filesystem.AsyncFile.superclass.constructor.apply(this, arguments);
    this.addEvents('beforeload', 'load');
    if(this.autoLoad){
        this.load.defer(10, this, [
            typeof this.autoLoad == 'object' ?
                this.autoLoad : undefined]);
    }
};
Ext.extend(Mc.filesystem.AsyncFile, Mc.filesystem.File, {
	load : function(options){
        options = options || {};
        if(!this.loaded){
        	if(this.fireEvent("beforeload", this, options) !== false){
            	var p = Ext.apply(options.params || {}, this.baseParams);
	            this.loading = true;
	            //this.ui.beforeLoad(this);
	            var loader = this.loader || this.attributes.loader || this.getOwnerTree().getLoader();
	            if(loader){
	                loader.load(this,options);
	                return;
	            }
        	}
        } else {
          return false;
        }
    },
    /*load : function(callback){
        if(this.loading){
            var timer;
            var f = function(){
                if(!this.loading){
                    clearInterval(timer);
                    this.load(callback);
                }
            }.createDelegate(this);
            timer = setInterval(f, 200);
            return;
        }
        if(!this.loaded){
            if(this.fireEvent("beforeload", this) === false){
                return;
            }
            this.loading = true;
            //this.ui.beforeLoad(this);
            var loader = this.loader || this.attributes.loader || this.getOwnerTree().getLoader();
            if(loader){
                loader.load(this,options);
                return;
            }
        }
        //Ext.tree.AsyncTreeNode.superclass.expand.call(this, deep, anim, callback);
    },*/
    isLoading : function(){
        return this.loading;  
    },
    
    loadComplete : function(callback){
        this.loading = false;
        this.loaded = true;
        //this.ui.afterLoad(this);
        this.fireEvent("load", this);
        this.load(callback);
    },
    isLoaded : function(){
        return this.loaded;
    },
    
    hasChildNodes : function(){
        if(!this.isLeaf() && !this.loaded){
            return true;
        }else{
            return Mc.filesystem.AsyncFile.superclass.hasChildNodes.call(this);
        }
    },
    reload : function(options){
        //this.collapse(false, false);
        //this.childrenRendered = false;
        this.loaded = false;
        this.load(options);
    }
});