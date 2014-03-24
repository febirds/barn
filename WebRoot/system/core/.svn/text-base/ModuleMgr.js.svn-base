MC.ModuleMgr = function(config){
	return Ext.apply({
		
	},config);
}

MC.ModuleMgr = function(config){
    Ext.apply(this, config);
	this.init();
};
Ext.override(MC.ModuleMgr,{
    
	loader : 'os/source/loadChildModule.do?method=getSource',
	taskMgr : null,
	
	mMgr : null,
	
	init : function(){
		this.initMMgr();
		this.initTaskMgr();
	},
	initMMgr : function(){
	    this.mMgr =  {
	        all : new Ext.util.MixedCollection(),
	        types : new Object(),
	        register : function(k,v){
	            this.all.add(k,v);
	        },
	        unregister : function(n){
	        	if(typeof n == 'string')
	        	{
	            	this.all.remove(this.all.get(n));
	            }else if(typeof n == 'object'){
	            	this.all.remove(n);
	            }
	        },
	        get : function(id){
	            return this.all.get(id);
	        },
	        hasInstance : function(id){
	            return this.all.containsKey(id);
	        },
	        //上操作对象，下操作类
	        hasClass:function(n){
				return typeof this.types[n] != 'undefined';
			},
			getClass:function(n){
				return this.types[n];
			},
			getClassType : function(cn){
	    		mcp = this.getClass(cn).prototype;
		    	return {
		    		f:mcp.f,
					v:mcp.v
		    	};
	    	},
	        registerClass : function(type, cls){
	            this.types[type] = cls;
	            //cls.type = type;
	        },
	        create : function(config, defaultType){
	            return new this.types[config.rType || defaultType](config);
	        }
	    };
	},
	initTaskMgr : function(){
		this.taskMgr = {
				tQueueStore : new Ext.util.MixedCollection(),
				textPackage : function(id){
					var p = this.tQueueStore.get(id).package;
					for(o in p)
					{	
						if(p[o]==null)
						{
							return false;
						}
					}
					return true;
				},
				requestBack : function(response,option){
					//要考虑是成功返回还是失败返回
					var id = option.params.cn;
					var t = option.params.type;
					//如果id没有找到？考虑任务队列的销毁问题
					var p = this.tQueueStore.get(id).package;
					p[t] = response.responseText;
						if(this.textPackage(id))
						{
							if(p.hasOwnProperty('none'))
							{/*Ext.processJs*/
								//try{
									Ext.processJs(p['none']);
									//}catch(e){}
							}
							for(obj in p)
							{
								if(obj!='none')
								{	
									//try{
									Ext.processJs(p[obj],'javascript');
									//}catch(e){}
								}
							}
							this.back(id);
						}

				},
				addRequest:function(c,ra){
					var tq = this.tQueueStore.get(c.cn);
					if(typeof rq == 'undefined')
					{
						c.package = {};
						tq = this.newTaskQueue(c.cn,c);
					}
					for(i=0;i<ra.length;i++)
					{
						tq.package[ra[i]] = null;
					}
					
				},
				//
				exec:function(id){
					var p = this.tQueueStore.get(id).package;
					for(o in p)
					{
						this.owner.loadModule(id,o,this.requestBack,this);
					}
				},
				//
				newTaskQueue:function(k,v){
					this.tQueueStore.add(k,v);
					return v;
				},
				back:function(id){
					tq = this.tQueueStore.get(id);
					if(tq.backObj)
					{
						
						tq.callback.call(tq.scope,this.owner.orderInstance(tq.cn,tq.config));
					}else{
						tq.callback.call(tq.scope);
					}
					this.removeTaskQueue(id);
				},
				removeTaskQueue:function(o){
					if(typeof o == 'string')
					{
						this.tQueueStore.remove(this.tQueueStore.get(o));
					}else if(typeof keyORarray == 'object'){
						this.tQueueStore.remove(o);
					}
				}
			};
			this.taskMgr.owner = this;
		
    },
	getInstance :function(c){
		/*只需要判断类型，是否有对象会在回调方法时给出*/
		/*最好检查c的数据，在调试阶段*/
		c.backObj = true;
		if(this.checkModule(c))
		{
			//类型达到要求，直接返回
			c.callback.call(c.scope,this.orderInstance(c.cn,c.config));
			
		}else{
			//类型没有达到要求
			this.taskMgr.exec(c.cn);
		}

	},
	orderInstance : function(id,config){
		if(!this.cmMgr.hasInstance(id))
		{
			m = this.cmMgr.getClass(id);
			new m({cn:id});
		}
		return Ext.apply(this.cmMgr.get(id),config||{});
	},
	fitModule : function(c){
		//只加载模块，不返回对象
		if(this.checkModule(c))
		{
			//类型达到要求，直接返回
			c.callback.call(c.scope);
			
		}else{
			//类型没有达到要求，执行已经准备好的队列
			this.taskMgr.exec(c.cn);
		}
	},
	checkModule : function(c){
		cn = c.cn;
		type = c.rType;
		if(false/*this.cmMgr.hasClass(cn)*/){//---------------每次都更新文件--------------------------------
			var t = this.cmMgr.getClassType(cn);
			if(t.f==type.f&&t.v==type.v)
			{
				//类型不缺,这个地方的顺序是看情况出现的可能性大小
			}else if(t.f==type.f&&t.v!=type.v){
				//f对上了,v有差异
				if(type.v){
					//本地无v，要求的有，才执行
					this.taskMgr.addRequest(c,['v']);
					return false;
				}
			}else if(t.f!=type.f&&t.v==type.v){
				//v对上了,f有差异
				if(type.f){
					//本地无f，要求的有，才执行
					this.taskMgr.addRequest(c,['f']);
					return false;
				}
			}else{
				//f v都缺
				this.taskMgr.addRequest(c,['f','v']);
				return false;
			}
			return true;
		}else{
			//连构造函数都没有，按要求加载
			if(!type.f&&!type.v)
			{
				this.taskMgr.addRequest(c,['none']);
			}else if(type.f&&!type.v){
					this.taskMgr.addRequest(c,['none','f']);
				}else if(!type.f&&type.v){
						this.taskMgr.addRequest(c,['none','v']);
					}else{
						this.taskMgr.addRequest(c,['none','f','v']);
					}
			
			return false;
		}
	},
    loadModule : function(cn,type,callback,scope){
    	Ext.Ajax.request({
    		url: this.loader,
    		params: {
    			cn:cn,
    			type:type
    		},
    		success: callback,
    		failure: callback,
    		scope: scope
    	});
    }
});
