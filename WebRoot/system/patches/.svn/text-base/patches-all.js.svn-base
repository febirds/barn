/*
 * Ext JS Library 2.2
 * patches
 */
 
Ext.override(Ext.Element,{
    replaceWith: function(el){
        if(typeof el == 'object' && !el.nodeType && !el.dom){ // dh config
            el = this.insertSibling(el, 'before');
        }else{
            el = Ext.getDom(el);
            this.dom.parentNode.insertBefore(el, this.dom);
        }
        El.uncache(this.id);
				//in ie, the "parentNode.removeChild" make the old "this.dom" orphan, so use "Ext.removeNode" to remove it.
        Ext.removeNode(this.dom);
        this.dom = el;
        this.id = Ext.id(el);
        El.cache[this.id] = this;
        return this;
    }
});
Ext.Element.garbageCollect = function(cleanFly){//add clean _flyweights
    if(!Ext.enableGarbageCollector){
        clearInterval(El.collectorThread);
        return;
    }
    for(var eid in El.cache){
        var el = El.cache[eid], d = el.dom;
        // -------------------------------------------------------
        // Determining what is garbage:
        // -------------------------------------------------------
        // !d
        // dom node is null, definitely garbage
        // -------------------------------------------------------
        // !d.parentNode
        // no parentNode == direct orphan, definitely garbage
        // -------------------------------------------------------
        // !d.offsetParent && !document.getElementById(eid)
        // display none elements have no offsetParent so we will
        // also try to look it up by it's id. However, check
        // offsetParent first so we don't do unneeded lookups.
        // This enables collection of elements that are not orphans
        // directly, but somewhere up the line they have an orphan
        // parent.
        // -------------------------------------------------------
        if(!d || !d.parentNode || (!d.offsetParent && !document.getElementById(eid))){
            delete El.cache[eid];
            if(d && Ext.enableListenerCollection){
                Ext.EventManager.removeAll(d);
            }
        }
    }
    if (cleanFly === true) {
        El._flyweights = {};
    }
}

Ext.EventManager = function(){
    var docReadyEvent, docReadyProcId, docReadyState = false;
    var resizeEvent, resizeTask, textEvent, textSize;
    var E = Ext.lib.Event;
    var D = Ext.lib.Dom;
    // fix parser confusion
    var xname = 'Ex' + 't';

    var elHash = {};

    var addListener = function(el, ename, fn, wrap, scope){
        var id = Ext.id(el);
        if(!elHash[id]){
            elHash[id] = {};
        }
        var es = elHash[id];
        if(!es[ename]){
            es[ename] = [];
        }
        var ls = es[ename];
        ls.push({
            id: id,
            ename: ename,
            fn: fn,
            wrap: wrap,
            scope: scope
        });

         E.on(el, ename, wrap);

        if(ename == "mousewheel" && el.addEventListener){ // workaround for jQuery
            el.addEventListener("DOMMouseScroll", wrap, false);
            E.on(window, 'unload', function(){
                el.removeEventListener("DOMMouseScroll", wrap, false);
            });
        }
        if(ename == "mousedown" && el == document){ // fix stopped mousedowns on the document
            Ext.EventManager.stoppedMouseDownEvent.addListener(wrap);
        }
    }

    var removeListener = function(el, ename, fn, scope){
        el = Ext.getDom(el);
        var id = Ext.id(el), es = elHash[id], wrap;
        if(es){
            var ls = es[ename], l;
            if(ls){
                for(var i = 0, len = ls.length; i < len; i++){
                    l = ls[i];
                    if(l.fn == fn && (!scope || l.scope == scope)){
                        wrap = l.wrap;
                        E.un(el, ename, wrap);
                        ls.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if(ename == "mousewheel" && el.addEventListener && wrap){
            el.removeEventListener("DOMMouseScroll", wrap, false);
        }
        if(ename == "mousedown" && el == document && wrap){ // fix stopped mousedowns on the document
            Ext.EventManager.stoppedMouseDownEvent.removeListener(wrap);
        }
    }

    var removeAll = function(el){
        el = Ext.getDom(el);
        var id = Ext.id(el), es = elHash[id], ls;
        if(es){
            for(var ename in es){
                if(es.hasOwnProperty(ename)){
                    ls = es[ename];
                    for(var i = 0, len = ls.length; i < len; i++){
                        E.un(el, ename, ls[i].wrap);
                        ls[i] = null;
                    }
                }
                es[ename] = null;
            }
            delete elHash[id];
        }
    }

     var fireDocReady = function(){
        if(!docReadyState){
            docReadyState = Ext.isReady = true;
            if(Ext.isGecko || Ext.isOpera) {
                document.removeEventListener("DOMContentLoaded", fireDocReady, false);
            }
            if(docReadyProcId){
                clearInterval(docReadyProcId);
                docReadyProcId = null;
            }
            if(docReadyEvent){
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
            }
        }
    };

    var initDocReady = function(){
        docReadyEvent = new Ext.util.Event();

        if(Ext.isReady){
            return;
        }
        // no matter what, make sure it fires on load
        E.on(window, 'load', fireDocReady);

        if(Ext.isGecko || Ext.isOpera) {
            document.addEventListener('DOMContentLoaded', fireDocReady, false);
        }
        else if(Ext.isIE){
            docReadyProcId = setInterval(function(){
                    try{
                        // throws errors until DOM is ready
                    Ext.isReady || (document.documentElement.doScroll('left'));
                    }catch(e){
                        return;
                    }
                    fireDocReady();  // no errors, fire
            }, 5);

			document.onreadystatechange = function(){
				if(document.readyState == 'complete'){
					document.onreadystatechange = null;
					fireDocReady();
				}
            };
        }
        else if(Ext.isSafari){
            docReadyProcId = setInterval(function(){
                var rs = document.readyState;
                if(rs == 'complete') {
                    fireDocReady();
                 }
            }, 10);
        }
    };

    var createBuffered = function(h, o){
        var task = new Ext.util.DelayedTask(h);
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Ext.EventObjectImpl(e);
            task.delay(o.buffer, h, null, [e]);
        };
    };

    var createSingle = function(h, el, ename, fn, scope){
        return function(e){
            Ext.EventManager.removeListener(el, ename, fn, scope);
            h(e);
        };
    };

    var createDelayed = function(h, o){
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Ext.EventObjectImpl(e);
            setTimeout(function(){
                h(e);
            }, o.delay || 10);
        };
    };

    var listen = function(element, ename, opt, fn, scope){
        var o = (!opt || typeof opt == "boolean") ? {} : opt;
        fn = fn || o.fn; scope = scope || o.scope;
        var el = Ext.getDom(element);
        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        var h = function(e){
            // prevent errors while unload occurring
            if(!window[xname]){
                return;
            }
            e = Ext.EventObject.setEvent(e);
            var t;
            if(o.delegate){
                t = e.getTarget(o.delegate, el);
                if(!t){
                    return;
                }
            }else{
                t = e.target;
            }
            if(o.stopEvent === true){
                e.stopEvent();
            }
            if(o.preventDefault === true){
               e.preventDefault();
            }
            if(o.stopPropagation === true){
                e.stopPropagation();
            }

            if(o.normalized === false){
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if(o.delay){
            h = createDelayed(h, o);
        }
        if(o.single){
            h = createSingle(h, el, ename, fn, scope);
        }
        if(o.buffer){
            h = createBuffered(h, o);
        }

        addListener(el, ename, fn, h, scope);
        return h;
    };

    var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
    var pub = {
        addListener : function(element, eventName, fn, scope, options){
            if(typeof eventName == "object"){
                var o = eventName;
                for(var e in o){
                    if(propRe.test(e)){
                        continue;
                    }
                    if(typeof o[e] == "function"){
                        // shared options
                        listen(element, e, o, o[e], o.scope);
                    }else{
                        // individual options
                        listen(element, e, o[e]);
                    }
                }
                return;
            }
            return listen(element, eventName, options, fn, scope);
        },
        removeListener : function(element, eventName, fn, scope){
            return removeListener(element, eventName, fn, scope);
        },
        removeAll : function(element){
            return removeAll(element);
        },
        onDocumentReady : function(fn, scope, options){
			if(!docReadyEvent){
                initDocReady();
			}
			if(docReadyState || Ext.isReady){ // if it already fired
				options || (options = {});
				fn.defer(options.delay||0, scope);
			}else{
				docReadyEvent.addListener(fn, scope, options);
			}
        },
		// replace the unname function in onWindowResize.
        doResizeEvent: function(){
            resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
        },
        onWindowResize : function(fn, scope, options){
            if(!resizeEvent){
                resizeEvent = new Ext.util.Event();
                resizeTask = new Ext.util.DelayedTask(this.doResizeEvent);//use unname function will lock the args "scope" object, even the scope object destroy late. //change by guig
                E.on(window, "resize", this.fireWindowResize, this);
            }
            resizeEvent.addListener(fn, scope, options);
        },
        // exposed only to allow manual firing
        fireWindowResize : function(){
            if(resizeEvent){
                if((Ext.isIE||Ext.isAir) && resizeTask){
                    resizeTask.delay(50);
                }else{
                    resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                }
            }
        },
        onTextResize : function(fn, scope, options){
            if(!textEvent){
                textEvent = new Ext.util.Event();
                var textEl = new Ext.Element(document.createElement('div'));
                textEl.dom.className = 'x-text-resize';
                textEl.dom.innerHTML = 'X';
                textEl.appendTo(document.body);
                textSize = textEl.dom.offsetHeight;
                setInterval(function(){
                    if(textEl.dom.offsetHeight != textSize){
                        textEvent.fire(textSize, textSize = textEl.dom.offsetHeight);
                    }
                }, this.textResizeInterval);
            }
            textEvent.addListener(fn, scope, options);
        },
        removeResizeListener : function(fn, scope){
            if(resizeEvent){
                resizeEvent.removeListener(fn, scope);
            }
        },
        fireResize : function(){
            if(resizeEvent){
                resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
            }
        },
        ieDeferSrc : false,
        textResizeInterval : 50
    };
    pub.on = pub.addListener;
    pub.un = pub.removeListener;
    pub.stoppedMouseDownEvent = new Ext.util.Event();
    return pub;
}();

Ext.override(Ext.Component,{
	lookupO : function(id){
		if(!this.ownerCt)
		{
			return null;
		}
		if(id == this.ownerCt.itemId || id == this.ownerCt.id)
		{
			return this.ownerCt;
		}else{
			return this.lookupO.call(this.ownerCt,id);
		}
	},
	    // default function is not really useful
    onRender : function(ct, position){
        if(this.autoEl){
            if(typeof this.autoEl == 'string'){
                this.el = document.createElement(this.autoEl);
            }else{
                var div = document.createElement('div');
                Ext.DomHelper.overwrite(div, this.autoEl);
                this.el = div.firstChild;
                this._parentDivForAutoEl = div; //for destroy 
            }
            if (!this.el.id) {
            	this.el.id = this.getId();
            }
        }
        if(this.el){
            this.el = Ext.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
	            if (this._parentDivForAutoEl) {//remove the parent div for autoEl
	                Ext.removeNode(this._parentDivForAutoEl);
	                delete this._parentDivForAutoEl;
	            }
            }
            if(this.overCls) {
                this.el.addClassOnOver(this.overCls);
            }
        }
    },
	  destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.beforeDestroy();
            if(this.rendered && !Ext.isIE){//if is ie then do this follow! 
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Ext.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
            this.purgeListeners();
            if(this.rendered && Ext.isIE){//if is ie, do this after all be done, because the "this.el.remove()" will delete el and el's children in "Ext.removeNode", so child component can't get right element by element's id ("document.getElementById()" can't find element). in ie do "this.el.remove()" after onDestroy.
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            if (this._parentDivForAutoEl) {//remove the parent div for autoEl
                Ext.removeNode(this._parentDivForAutoEl);
                this._parentDivForAutoEl = null;
            }
        }
    }
});

Ext.override(Ext.Button,{
        initButtonEl : function(btn, btnEl){

        this.el = btn;
        if(this.id){//element's id must be assigned before add listeners, otherwise removeAllListeners can't remove these listeners, because element's id not same between "on()" and "removeAllListeners()".
            Ext.Element.uncache(this.el);
            this.el.dom.id = this.el.id = this.id;
        }
				// move
        btn.addClass("x-btn");

        if(this.icon){
            btnEl.setStyle('background-image', 'url(' +this.icon +')');
        }
        if(this.iconCls){
            btnEl.addClass(this.iconCls);
            if(!this.cls){
                btn.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
            }
        }
        if(this.tabIndex !== undefined){
            btnEl.dom.tabIndex = this.tabIndex;
        }
        if(this.tooltip){
            if(typeof this.tooltip == 'object'){
                Ext.QuickTips.register(Ext.apply({
                      target: btnEl.id
                }, this.tooltip));
            } else {
                btnEl.dom[this.tooltipType] = this.tooltip;
            }
        }
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(this.handleMouseEvents){
            btn.on("mouseover", this.onMouseOver, this);
            // new functionality for monitoring on the document level
            //btn.on("mouseout", this.onMouseOut, this);
            btn.on("mousedown", this.onMouseDown, this);
        }
        if(this.menu){
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }

				/* //move ahead //id  must be changed before add listeners
				        if(this.id){
				            this.el.dom.id = this.el.id = this.id;
				        }
				*/
        if(this.repeat){
            var repeater = new Ext.util.ClickRepeater(btn,
                typeof this.repeat == "object" ? this.repeat : {}
            );
            repeater.on("click", this.onClick,  this);
        }
        btn.on(this.clickEvent, this.onClick, this);
    },
    beforeDestroy: function(){
    	if(this.rendered){
	        var btn = this.el.child(this.buttonSelector);
	        if(btn){
                if(this.tooltip){//do unregister quicktips, reduce quicktip targets's size
                    if(typeof this.tooltip == 'object'){
                        Ext.QuickTips.unregister(btn);
                    }
                }
	            btn.removeAllListeners();
	        }
	    }
        if(this.menu){
            Ext.destroy(this.menu);
        }
    }
});

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

Ext.override(Ext.Resizable,{
    destroy : function(removeEl){
        this.proxy.removeAllListeners();//remove "this.proxy" all listeners for destroy
        this.proxy.remove();
        if(this.overlay){
            this.overlay.removeAllListeners();
            this.overlay.remove();
        }
        var ps = Ext.Resizable.positions;
        for(var k in ps){
            if(typeof ps[k] != "function" && this[ps[k]]){
                var h = this[ps[k]];
                h.el.removeAllListeners();
                h.el.remove();
            }
        }
        if(removeEl){
            this.el.update("");
            this.el.remove();
        }
    }
});

Ext.override(Ext.Panel,{
    addTool : function(){
        if(!this[this.toolTarget]) { // no where to render tools!
            return;
        }
        if(!this.toolTemplate){
            // initialize the global tool template on first use
            var tt = new Ext.Template(
                 '<div class="x-tool x-tool-{id}">&#160;</div>'
            );
            tt.disableFormats = true;
            tt.compile();
            Ext.Panel.prototype.toolTemplate = tt;
        }
        for(var i = 0, a = arguments, len = a.length; i < len; i++) {
            var tc = a[i], overCls = 'x-tool-'+tc.id+'-over';
            if (!this.tools[tc.id]) {//prevent build same id tool
	            var t = this.toolTemplate.insertFirst((tc.align !== 'left') ? this[this.toolTarget] : this[this.toolTarget].child('span'), tc, true);
	            this.tools[tc.id] = t;
	            t.enableDisplayMode('block');
	            t.on('click', this.createToolHandler(t, tc, overCls, this));
	            if(tc.on){
	                t.on(tc.on);
	            }
	            if(tc.hidden){
	                t.hide();
	            }
	            if(tc.qtip){
	                if(typeof tc.qtip == 'object'){
	                    Ext.QuickTips.register(Ext.apply({
	                          target: t.id
	                    }, tc.qtip));
	                } else {
	                    t.dom.qtip = tc.qtip;
	                }
	            }
	            t.addClassOnOver(overCls);
	        }
        }
    },
    beforeDestroy : function(){
        if(this.header) {//remove header's listeners.
            this.header.removeAllListeners();
            if (this.headerAsText){
                Ext.Element.uncache(this.header.child('span'));
            }
        }
        Ext.Element.uncache(
            this.header,
            this.tbar,
            this.bbar,
            this.footer,
            this.body
            ,this.bwrap
        );
        if(this.tools){
            for(var k in this.tools){
                Ext.destroy(this.tools[k]);
            }
        }
        if(this.buttons){
            for(var b in this.buttons){
                Ext.destroy(this.buttons[b]);
            }
        }
        Ext.destroy(
            this.topToolbar,
            this.bottomToolbar
        );
        Ext.Panel.superclass.beforeDestroy.call(this);
    }
});

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

Ext.override(Ext.SplitBar,{
 onEndProxyDrag : function(e){
        Ext.get(this.proxy).setDisplayed(false);
        var endPoint = Ext.lib.Event.getXY(e);
        if(this.overlay){
            Ext.destroy(this.overlay);//replace "remove()" by "Ext.destroy"  , destroy more data.
            delete this.overlay;
        }
        var newSize;
        if(this.orientation == Ext.SplitBar.HORIZONTAL){
            newSize = this.dragSpecs.startSize +
                (this.placement == Ext.SplitBar.LEFT ?
                    endPoint[0] - this.dragSpecs.startPoint[0] :
                    this.dragSpecs.startPoint[0] - endPoint[0]
                );
        }else{
            newSize = this.dragSpecs.startSize +
                (this.placement == Ext.SplitBar.TOP ?
                    endPoint[1] - this.dragSpecs.startPoint[1] :
                    this.dragSpecs.startPoint[1] - endPoint[1]
                );
        }
        newSize = Math.min(Math.max(newSize, this.activeMinSize), this.activeMaxSize);
        if(newSize != this.dragSpecs.startSize){
            if(this.fireEvent('beforeapply', this, newSize) !== false){
                this.adapter.setElementSize(this, newSize);
                this.fireEvent("moved", this, newSize);
                this.fireEvent("resize", this, newSize);
            }
        }
    },
    destroy : function(removeEl){
        if(this.shim){
            this.shim.remove();
        }
        this.dd.unreg();
        Ext.destroy(Ext.get(this.proxy));//replace "Ext.removeNode" by "Ext.destroy" , destroy more data.
        if(removeEl){
            this.el.remove();
        }
    }
});

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

Ext.override(Ext.PagingToolbar,{
      onDestroy : function(){//unbind store when destroy
        if (this.store) {this.unbind(this.store);}
        Ext.PagingToolbar.superclass.onDestroy.call(this);
    },
    reset : function(){
    	this.afterTextEl.el.innerHTML = String.format(this.afterPageText, 1);
    	this.displayEl.update("");
        this.field.dom.value = 1;
        this.first.setDisabled(true);
        this.prev.setDisabled(true);
        this.next.setDisabled(true);
        this.last.setDisabled(true);
    }
});

Ext.override(Ext.TabPanel,{
      beforeDestroy : function() {
        if (this.items) {
            this.items.each(function(item) {
                if (item && item.itemTabStrip) {
                    Ext.get(item.itemTabStrip).removeAllListeners();
                    item.itemTabStrip = null;
                }
            }, this);
        }
        if (this.strip) {
            this.strip.removeAllListeners();
        }

        Ext.TabPanel.superclass.beforeDestroy.apply(this);
        
    }
});

Ext.override(Ext.Window,{
    beforeDestroy : function(){
        this.hide();//do hide before destroy
        Ext.destroy(
            this.focusEl,//destroy this.focusEl
            this.resizer,
            this.dd,
            this.proxy,
            this.mask
        );
        Ext.Window.superclass.beforeDestroy.call(this);
    }
});

Ext.override(Ext.grid.GridView,{
    destroy : function(){
        if(this.colMenu){
            this.colMenu.destroy();
            delete this.colMenu;
        }
        if(this.hmenu){
            this.hmenu.destroy();
            delete this.hmenu;
        }
        if(this.grid.enableColumnMove){
            var dds = Ext.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            if(dds){
                for(var dd in dds){
                    if(!dds[dd].config.isTarget && dds[dd].dragElId){
                        var elid = dds[dd].dragElId;
                        dds[dd].unreg();
                        Ext.get(elid).remove();
                    } else if(dds[dd].config.isTarget){
                        dds[dd].proxyTop.remove();
                        dds[dd].proxyBottom.remove();
                        dds[dd].unreg();
                    }
                    if(Ext.dd.DDM.locationCache[dd]){
                        delete Ext.dd.DDM.locationCache[dd];
                    }
                }
                delete Ext.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            }
        }
        Ext.destroy(this.splitone);
        this.scroller.removeAllListeners();
        this.mainHd.removeAllListeners();
        Ext.fly(this.innerHd).removeAllListeners();
        this.focusEl.removeAllListeners();
        Ext.destroy(this.resizeMarker, this.resizeProxy);
        if(this.dragZone){
            this.dragZone.unreg();
        }
        this.initData(null, null);
        Ext.EventManager.removeResizeListener(this.onWindowResize, this);
    }
});

Ext.override(Ext.form.FieldSet,{
    beforeDestroy : function(){//unset "this.checkbox" listener
        if (this.checkbox) {
            this.checkbox.un('click', this.onCheckClick, this);
        }
        Ext.form.FieldSet.superclass.beforeDestroy.call(this);
    }
});

Ext.override(Ext.util.ClickRepeater,{
   //destroy el and purgeListeners
    destroy : function() {
        Ext.destroy(this.el);
        this.purgeListeners();
    }
});

Ext.override(Ext.DatePicker,{
	showToday : true,
    onRender : function(container, position){
        var m = [
             '<table cellspacing="0">',
                '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var dn = this.dayNames;
        for(var i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push("<th><span>", dn[d].substr(0,1), "</span></th>");
        }
        m[m.length] = "</tr></thead><tbody><tr>";
        for(var i = 0; i < 42; i++) {
            if(i % 7 == 0 && i != 0){
                m[m.length] = "</tr><tr>";
            }
            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }
        m.push('</tr></tbody></table></td></tr>',
                this.showToday ? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>' : '',
                '</table><div class="x-date-mp"></div>');

        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");

        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.eventEl = Ext.get(el.firstChild);

        this.leftcr = new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"), {//for destroy
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.rightcr = new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"), {//for destroy
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');

        var kn = new Ext.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.eventEl.on("click", this.handleDateClick,  this, {delegate: "a.x-date-date"});

        this.el.unselectable();

        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new Ext.Button({
            text: "&#160;",
            tooltip: this.monthYearText,
            renderTo: this.el.child("td.x-date-middle", true)
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");

        if(this.showToday){
            this.todayKeyListener = this.eventEl.addKeyListener(Ext.EventObject.SPACE, this.selectToday,  this);
            var today = (new Date()).dateFormat(this.format);
            this.todayBtn = new Ext.Button({
                renderTo: this.el.child("td.x-date-bottom", true),
                text: String.format(this.todayText, today),
                tooltip: String.format(this.todayTip, today),
                handler: this.selectToday,
                scope: this
            });
        }

        if(Ext.isIE){
            this.el.repaint();
        }
        this.update(this.value);
    },
		//destroy some element
    onDestroy : function() {
        Ext.DatePicker.superclass.onDestroy.call(this);
        if(this.rendered){
	        Ext.destroy(
	            this.leftcr,
	            this.rightcr,
	            this.monthPicker,
	            this.eventEl
	        );
        }
    },
    beforeDestroy : function() {
        if(this.rendered){
	        this.mbtn.destroy();
	        if(this.todayBtn)
	        {
	        	this.todayBtn.destroy();
	        }
        }
    }
});

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

Ext.override(Ext.layout.AnchorLayout,{
    onLayout : function(ct, target){
        Ext.layout.AnchorLayout.superclass.onLayout.call(this, ct, target);
        var size = this.getAnchorViewSize(ct, target);
        var w = size.width, h = size.height;
        if(w < 20 || h < 20){
            return;
        }
        var aw, ah;
        if(ct.anchorSize){
            if(typeof ct.anchorSize == 'number'){
                aw = ct.anchorSize;
            }else{
                aw = ct.anchorSize.width;
                ah = ct.anchorSize.height;
            }
        }else{
            aw = ct.initialConfig.width;
            ah = ct.initialConfig.height;
        }
        var cs = ct.items.items, len = cs.length, i, c, a, cw, ch;
        var ha = 0;
        for(i = 0; i < len; i++){
            c = cs[i];
            if(c.anchor){
                a = c.anchorSpec;
                if(!a){ 
                    var vs = c.anchor.split(' ');
                    c.anchorSpec = a = {
                        right: this.parseAnchor(vs[0], c.initialConfig.width, aw),
                        bottom: this.parseAnchor(vs[1], c.initialConfig.height, ah)
                    };
                }
                cw = a.right ? this.adjustWidthAnchor(a.right(w), c) : undefined;
                ch = a.bottom ? this.adjustHeightAnchor(a.bottom(h), c) : undefined;

                if(cw || ch){
                    c.setSize(cw || undefined, ch ? ch-ha : undefined);
                }
            }
            ha = ha + c.el.getHeight();
        }
    }
});

Ext.override(Ext.layout.BorderLayout,{
    destroy: function() {
        var r = ['north', 'south', 'east', 'west'];
        for (var i = 0; i < r.length; i++) {
            var region = this[r[i]];
            if (region) {//if find region's destroy, then run it first. for example, Ext.layout.BorderLayout.SplitRegion.destroy.
                if (region.destroy) {
                    region.destroy();
                } else if (region.split) {
                    region.split.destroy(true);
                }
            }
        }
        Ext.layout.BorderLayout.superclass.destroy.call(this);
    }
});

Ext.override(Ext.layout.BorderLayout.SplitRegion,{
	destroy : function() {
        Ext.destroy(this.miniSplitEl, this.split, this.splitEl);
    }
});