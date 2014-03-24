/**
 * 系统对象类，单态
 * 构造全局对象system
 */
Ext.ns('MC.lang');
MC.util = {
	expandNode : function(node,children){
		var c = children ||[];
		for(var i=0;i<c.length;i++)
		{
			var cc = c[i];
			var nc = {};
			var hc = Ext.isArray(cc.children);
			if(hc)
			{
				nc.children = true;
			}
			Ext.applyIf(nc,cc);
			var n = new Ext.data.Node(nc);
			node.appendChild(n);
			if(hc)
			{
				MC.util.expandNode(n,cc.children);
			}
		}
		return node;
	},
	createTree : function(cfg){
		var tree = new Ext.data.Tree();
		var nc = {};
		var hc = Ext.isArray(cfg.children);
		if(hc)
		{
			nc.children = true;
		}
		Ext.applyIf(nc,cfg);
		var n = new Ext.data.Node(nc);
		tree.setRootNode(n);
		if(hc)
		{
			MC.util.expandNode(n,cfg.children);
		}
		return tree;
	}
}
MC.System = function(config){
    //Ext.apply(this, config);
    this.config = config;
    Ext.apply(this.config, {
    	userId:document.getElementById('userid').value,
   		userName:document.getElementById('username').value
    });
    this.addEvents({
        'ready' : true,
        'beforeunload' : true
    });
    window.lang = MC.lang;
	this.init();
	this.onReady(this.start,this);
	/*this.on('beforeunload',function(){//页面卸载的时候调用的方法
		//this.logout();
		return true;
	});*/
};

Ext.extend(MC.System, Ext.util.Observable, {
    isReady : false,
    animative:false,//动画效果
    registration : {},
    applications : {},
    allowcache : true,//是否允许缓存窗体
    tasks : null, //执行的任务
    caches:null,  //缓存
	connection : '',
	loader : '',
	/**
	 * 把grid在配置cm时的配置对象转换成所需要的配置对象
	 * @param c 表格的列定义
	 */
	prepareCMConfig : function(c) {
		var p;
		if (!c.xtype && c.dataIndex) {
			p = {};
			if (c.editor && c.editor.xtype) {
				c.editor = Ext.ComponentMgr.create(c.editor, c.editor.xtype);
			}
			Ext.apply(p, c);
			if (p.cmType) {
				delete p.cmType;
			}
		} else if (c.xtype) {
			if (c.xtype == 'rowNumberer') {
				p = new Ext.grid.RowNumberer(c);
			} else if (c.xtype == 'checkboxSelectionModel') {
				p = new Ext.grid.CheckboxSelectionModel(c);
			} else if (c.xtype == 'rowExpander') {
				p = new Ext.grid.RowExpander(c);
			}
		}
		return p;
	},
	/**
	 * 把一个store的数据序列化成为一个json字符串
	 * @param s store
	 * @param cm 所需要的列数组
	 * @param f 是否是只需要修改过的数据  true为是
	 */
	store2Json:function(s,cm,f){
		var tmp = {cm:cm,result:[]};
		if(f)
		{
			var r = s.getModifiedRecords();
			for(var j=0,l=r.length;j<l;j++)
			{
				var p = new Object();
				for(var i=0,len=tmp.cm.length;i<len;i++)
				{
					p[tmp.cm[i]]=r[j].get(tmp.cm[i]);
				}
				tmp.result.push(p);
			}
			
		}else{
			s.each(function(r){
				var p = new Object();
				for(var i=0,len=this.cm.length;i<len;i++)
				{
					p[this.cm[i]]=r.get(this.cm[i]);
				}
				this.result.push(p);
			},tmp);
		}
		var tp = tmp.result;
		delete tmp.result;
		delete tmp.cm;
		return tp;
	},
	/**
	 * 获得视图区的大小
	 */
	getViewSize:function(){
		if(this.tasks.containsKey('desktop'))
		{
			return this.tasks.get('desktop').getViewSize();
		}
		return {width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()};
	},
	/**
	 * 根据store的id获得store
	 */
	getStore : function(key){
		if(Ext.StoreMgr.containsKey(key))
		{
			return Ext.StoreMgr.get(key);
		}
		return false;
	},
	/**
	 * 系统初始化完之后所调用的方法
	 */
	start : function(){
		var p = this;
		setTimeout(function(){
			var auto = p.selectReg('sys.autorun');
			if(auto!==null)
			{
				for(var o in auto)
				{
					p.execute(o,auto[o]);
				}
			}
		},0);
		/*this.install('desktop',MC.Desktop);
			var auto = this.selectReg('sys.autorun');
			if(auto!==null)
			{
				for(var o in auto)
				{
					this.execute(o,auto[o]);
				}
			}*/
		},
	/**
	 * 系统初始化
	 */
	init : function(){
			this.styles = {};
			this.tasks = new Ext.util.MixedCollection();
			this.caches = new Ext.util.MixedCollection();
			this.initReg();
			//this.applications = new Ext.util.MixedCollection();
			if(Ext.isSafari)
			{
				window.onbeforeunload = this.onBeforeUnload;
			}else{
				Ext.EventManager.on(window, 'beforeunload', this.onBeforeUnload, this);//登出应该在有页面的情况下就注册
			}
			window.onunload = this.logout;
			this.fireEvent('ready', this);
			this.isReady = true;
    },
    /**
     * 是否有指定的类
     */
    hasClass:function(n){
		return typeof this.applications[n] != 'undefined';
	},
	/**
	 * 获得一个类
	 */
	getClass:function(n){
		return this.applications[n];
	},
	/**
	 * 安装资源文件
	 */
	install : function(k,v){
		if(typeof v === 'function')
		{
			this.applications[k]=v;
		}else{
			alert('安装文件类型不对，安装失败');
		}
	},
	/**
	 * 卸载资源文件
	 */
	unInstall : function(id){
		this.applications[id]=null;
		delete this.applications[id];
	},
	/**
	 * 在注册对象当中注册一个信息
	 * @param k 注册的 键 key
	 * @param v 注册的 值 value
	 */
	insetReg : function(k,v){
		var arr = k.split('.');
		var temp=null;
		for(var i=0;i<arr.length;i++)
		{

			if(i!==0)
			{
				if(typeof temp[arr[i]]===undefined)
				{
					temp[arr[i]] = {};
				}
				temp = temp[arr[i]];
			}else{
				if(arr.length ==1)
				{
					temp = this.registration;
				}else{
					temp = typeof this.registration[arr[i]] === undefined ? {}:this.registration[arr[i]];
				}
			}
		}
		temp[arr[arr.length-1]] = v;
		return this.selectReg(k);
	},
	/**
	 * 在注册对象当中删除一个信息
	 * @param path 信息路径
	 */
	deleteReg : function(path){
		var temp = this.selectReg(path,true);
		if(typeof temp !== 'object')
		{
			return false;
		}
		var arr = path.split('.');
		var p = arr[arr.length-1];
		if(!temp.hasOwnProperty(p))
		{
			return false;
		}
		temp[p]=null;
		delete temp[p];
		return true;
	},
	findProperty : function(path,object){
		var l = path.indexOf(".");
		if(l==-1)
		{
			if(object.hasOwnProperty(path))
			{
				return object[path];
			}else{
				return undefined;
			}
		}else{
			var s1 = path.substring(0,l);
			var s2 = path.substring(l+1);
			if(object.hasOwnProperty(s1))
			{
				return this.findProperty(s2,object[s1]);
			}else{
				return undefined;
			}
		}
	},
	/**
	 * 在注册对象当中查找一个信息
	 * @param path 信息路径
	 * @param parent 父节点
	 */
	selectReg : function(path,parent){
		return this.findProperty(path,this.registration);
	},
	/*selectReg : function(path,parent){
		var arr = path.split('.');
		var temp = null;
		for(var i=0;i<arr.length;i++)
		{
			if(i!==0)
			{
				temp = temp[arr[i]];
				if(i==arr.length-2){
					if(parent)
					{
						return temp[arr[i]];
					}
				}else
				if(i==arr.length-1){
					temp[arr[i]] = null;
				}
			}else{
				temp = this.registration[arr[i]];
			}
			if(typeof temp ===undefined)
			{
				//temp = null;
				break;
			}
		}
		return temp;
	},*/
	/**
	 * 初始化注册对象
	 */
	initReg : function(){
		/*
		MC.SYS_CONFIG //machine
		var config = {
			preferences : window.temp,
			menutree : mt
		};
		*/
		var tree = MC.util.createTree(this.config.menutree[0]);
		tree.source = this.config.menutree[1];
		var user = {
			//autorun : this.config.autorun || [],
			menutree:tree,
			preferences:this.config.preferences,
			userId:document.getElementById('userid').value,
   			userName:document.getElementById('username').value
			};
		Ext.apply(this.registration,{
			sys : MC.SYS_CONFIG,
			user:user
		});
		//Ext.apply(this.registration.sys,MC.SYS_CONFIG);
		//Ext.apply(this.registration.user,user);
		//Ext.apply(this.registration,this.config);//如何导入注册对象，从根目录开始-------------important
	},
	/**
	 * 加载一个应用资源
	 * @param k 资源所对应的关键字
	 * @param c 运行资源的配置参数
	 * @param fun 加载之后调用的方法
	 * @param scope fun中的this指针
	 */
	loadSources : function(k,c,fun,scope){
		if(MC.app.Print != undefined)//专为打印添加的判断，欠妥
		{
			fun.call(scope,c,true);
			return;
		}
		var notifyWin;
			if(this.desktop)
			{
				notifyWin = this.desktop.showNotification({
				id:k+'_',
				hideDelay: 3000,
				html: '加载 ' + k + '...'
				, title: '请稍候.'
				});
			}
			Ext.Ajax.request({
    		url: 'personal/com_getSource.action',
    		argument:{
    			config:c,
    			appId:k,
    			fn:fun,
    			scope:scope
    		},
    		params: {
    			name:k,
    			appId:k
    		},
    		callback : function(o,f,r){
				var key = r.argument.config;
				var funs = r.argument.fn;
				var sope = r.argument.scope;
				try{
				eval(r.responseText);
				}catch(e){
					funs.call(sope,key,false);
				}
				if(f)
				{
					funs.call(sope,key,true);
				}else{
					funs.call(sope,key,false);
				}
    			
    		},
    		scope: scope?scope:this
    	});
	},
	/**
	 * 加载一个应用资源
	 * @param k 资源所对应的关键字
	 * @param c 运行资源的配置参数
	 */
	loadSource : function(k,c){//安装资源文件
		var notifyWin;
			if(this.desktop)
			{
				notifyWin = this.desktop.showNotification({
				id:k+'_',
				hideDelay: 3000,
				html: '加载 ' + k + '...'
				, title: '请稍候.'
				});
			}
			Ext.Ajax.request({
    		url: 'personal/com_getSource.action',
    		argument:{
    			config:c,
    			appId:k
    		},
    		params: {
    			name:k,
    			appId:k
    		},
    		callback : this.callback,
    		scope: this
    	});
		},
	//private
	setNotifyWin:function(notifyWin,config){
		if(!config)
		{
			config = {};
		}
		notifyWin.setIconClass(config.icon?config.icon:'x-icon-done');
		notifyWin.setTitle(config.title?config.title:'完成');
		notifyWin.setMessage((config.moduleName?config.moduleName:notifyWin.id) + ' 加载完成.');
		this.desktop.hideNotification(notifyWin,2000);
	},
	/**
	 * 加载资源的回调方法
	 */
	callback : function(o,f,r){
		var key = r.argument.appId,w;
		if(w = Ext.WindowMgr.get(key+'_'))
		{
			this.setNotifyWin(w);
		}
		if(!f)
		{
			Ext.Msg.alert('提示','加载资源'+key+'失败,请检查您的网络连接或者通知管理员！');
			return;
		}
			window.eval(r.responseText);
			//提示安装完成，可以到注册表找相应的信息
			var c = r.argument.config;
			delete r.argument.config;
			this.run(key,c);
			//if(c/*判断形式？*/)
			//{
			//	this.run(key,c);
			//}
	},
	/**
	 * 运行一个应用
	 * @param key 应用关键字
	 * @param config 运行的配置
	 */
	run : function(key,config){
			//要不要在这里写入任务管理器？
			var app = this.getClass(key),t;
			if(app.singleTon)
			{
				t = this.tasks.get(key);
				if(t == undefined)
				{
					if(this.caches.containsKey(key))
					{
						t = this.caches.get(key);
						t.cacheReset.call(t);
					}else{
						t = new app(config);
						if(t.cacheable && this.allowcache)
						{
							this.caches.add(key,t);
						}
					}
					this.tasks.add(key,t);
				}
				t.show();
			}else{
				t = new app(config);
				this.tasks.add(key,t);
				t.show();
				if(t.cacheable && this.allowcache)
				{
					this.caches.add(key,t);
				}
			}
		},
	getRight:function(id){
		var tree = system.selectReg("user.menutree");
		var node = tree.getNodeById(id);
		if(node && node.right)
		{
			return Ext.decode(Ext.encode(node.right));
		}else{
			return {};
		}
	},
	getUser:function(){
		var u = system.selectReg("user");
		return {
			userId:u.userId,
			userName:u.userName
		};
	},
	/**
	 * 执行一个应用，这个应用的资源是有可能还没有加载的.
	 * @param app 应用的名称
	 * @param config 执行参数
	 */
	execute : function(app,config){//运行某个程序
			/*var key = this.selectReg(app);
			if(key===null||key===undefined)
			{
				alert('系统没有找到:'+app+' 相关应用');
				return false;
			}
			config.right = key;*/
			var flag = (app !="desktop" && app !="preferences");
			if(flag)
			{
				var tree = system.selectReg("user.menutree");
				var node = tree.getNodeById(app);
				if(typeof node.right!='object')
				{
					Ext.Ajax.request({
			    		url:'personal/com_getPagePermissions.action',
			    		argument:node,
			    		params:{
			    			operId:system.selectReg("user").userId,
			    			menuId:node.id
			    		},
			    		callback:function(o,f,r){
			    			if(!f)
			    			{
			    				Ext.Msg.alert("提示","获取模块权限失败！");
			    				return;
			    			}
			    			var rs = r.responseText;
			    			var right = Ext.decode(rs);
			    			var n = r.argument;
			    			n.right = right;
			    			Ext.applyIf(n,{innerView:'browser'});
			    			var cfg = {right:n.right,innerView : n.innerView};
			    			n.config = cfg;
			    			system.execute(n.id,n.config);
			    		}
		    		});
		    		return;
				}
			}
			if(this.hasClass(app))
			{
				this.run(app,flag?system.selectReg("user.menutree").getNodeById(app).config:config);
			}else{
				this.loadSource(app,flag?system.selectReg("user.menutree").getNodeById(app).config:config);
			}
		},
	/**
	 * 注册系统初始化完毕之后的事件
	 */
	onReady : function(fn, scope){
        if(!this.isReady){
            this.on('ready', fn, scope);
        }else{
            fn.call(scope, this);
        }
    },
    /**
     * 系统登出行为方法
     */
    logout : function(){
    	Ext.Ajax.request({
    		url: 'login/login.do?method=loginout',
    		params: {
    			//user:system.user,
    			//token:system.token
    		}
    		//,scope: this
    	});
    },
    /**
     * 页面卸载前行为
     */
    onBeforeUnload : function(e){
        //if(this.fireEvent('beforeunload', this) === false){
            e.stopEvent();
            return false;
        //}
    },
    /**
     * 查看一个对象的属性  (开发阶段的调试方法)
     */
    look : function(obj){
					if(typeof obj!="object")
					{
						alert(obj);
						return;
					}
					for(var o in obj)
					{
						if(!window.confirm(''+o+':\n-------------------------------------------\n'+obj[o]))
						{
								return;
						}
					}
	},
	expandNode : function(node,children){
		var c = children ||[];
		for(var i=0;i<c.length;i++)
		{
			var cc = c[i];
			var nc = {};
			var hc = Ext.isArray(cc.children);
			if(hc)
			{
				nc.children = true;
			}
			Ext.applyIf(nc,cc);
			var n = new Ext.data.Node(nc);
			node.appendChild(n);
			if(hc)
			{
				system.expandNode(n,cc.children);
			}
		}
		return node;
	},
	createTree : function(cfg){
		var tree = new Ext.data.Tree();
		var nc = {};
		var hc = Ext.isArray(cfg.children);
		if(hc)
		{
			nc.children = true;
		}
		Ext.applyIf(nc,cfg);
		var n = new Ext.data.Node(nc);
		tree.setRootNode(n);
		if(hc)
		{
			system.expandNode(n,cfg.children);
		}
		return tree;
	}
});

Ext.grid.RowExpander = function(config){
    Ext.apply(this, config);
	
    this.addEvents({
        beforeexpand : true,
        expand: true,
        beforecollapse: true,
        collapse: true
    });
	
    Ext.grid.RowExpander.superclass.constructor.call(this);

    if(this.tpl){
        if(typeof this.tpl == 'string'){
            this.tpl = new Ext.Template(this.tpl);
        }
        this.tpl.compile();
    }

    this.state = {};
    this.bodyContent = {};
};

Ext.extend(Ext.grid.RowExpander, Ext.util.Observable, {
    header: "",
    width: 20,
    sortable: false,
    fixed:true,
    menuDisabled:true,
    dataIndex: '',
    id: 'expander',
    lazyRender : true,
    isAllep:false,
    enableCaching: true,

    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        //alert(content);
        if(!content && !this.lazyRender){
            content = this.getBodyContent(record, rowIndex);
        }
        if(content){
            p.body = content;
        }
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },

    init : function(grid){
        this.grid = grid;

        var view = grid.getView();
       view.getRowClass = this.getRowClass.createDelegate(this);

        view.enableRowBody = true;

        grid.on('render', function(){
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    getBodyContent : function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(!content){
            content = this.tpl.apply(record.data);
            this.bodyContent[record.id] = content;
        }
        return content;
    },

    onMouseDown : function(e, t){
        if(t.className == 'x-grid3-row-expander'){
            e.stopEvent();
            var row = e.getTarget('.x-grid3-row');
            this.toggleRow(row);
        }
    },

    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';
        return '<div class="x-grid3-row-expander">&#160;</div>';
    },

    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){
                body.innerHTML = this.getBodyContent(record, rowIndex);
            }
            return true;
        }else{
            return false;
        }
    },

    toggleRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },
    toggleAllRow:function(){
    	
    
    },
	expandRowAll:function(){
		var length=this.grid.view.getRows().length;
		for(i=0;i<length;i++){
			this.expandRow(i);			
		}
		this.isAllep=true;
	},
	collapseAll:function(){
		var length=this.grid.view.getRows().length;
		for(i=0;i<length;i++){
			this.collapseRow(i);
		
		}
		this.isAllep=false;
		
	},
	isexpandAll:function(){
		return this.isAllep;
	},
    expandRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
           this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },

    collapseRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforcollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});