Ext.ns('MC.app');
MC.app.Preferences = Ext.extend(MC.Window, {
 	title:'个人设置',
 	//cacheable : true,
 	clearLayout : false,
 	moduleId:'preferences',
 	relativeSize : '50% 90%',
 	cls:'pref',
 	clearer:[],
 	hasStatusBar : false,
 	actions : null,
	cards : [
		'navigation', // navigation
		'quickstart', // quickstart
		'appearance', // color and appearance
		'background', // background wallpaper
		'autorun', // autorun
		'shortcuts'  // shortcuts
	],
	contentPanel : null,
	cardHistory : [
		'navigation' // default
	],
 	welcome : function(win){
 		win.add({
 			html:lang.users.welcome_msg
 		});
 		win.doLayout();
 	},
 	initConfig : function(c){
 		return {
 			layout : 'card',
 			tbar:[{
					disabled: true,
                	handler: this.navHandler.createDelegate(this, [-1]),
                	itemId: 'back',
                	scope: this,
                	text: '后退'
                },{
                	disabled: true,
                	handler: this.navHandler.createDelegate(this, [1]),
                	itemId: 'next',
                	scope: this,
                	text: '前进'
                }, '->', {
						iconCls : 'save',
						text: '保存',
						scope : this,
						handler : this.save
					},'-',{
						text: '还原到默认',
						scope : this,
						handler : this.restoreDefault
					}]
 		};
 	},
	createStore : function(id){
		
	},
	restoreDefault : function(){
		this.confirm('提示','确定还原到默认设置?',this.resetPreferences,this)
	},
	resetPreferences : function(f){
		if(f=='yes')
		{
			var sys = system.selectReg("sys");
			system.selectReg("user").preferences = Ext.decode(Ext.encode({autorun : [],launchers : sys.launchers,styles: sys.styles}));
			system.desktop.initStyles();
			system.desktop.initLaunchers(true);
			this.save();
		}
	},
	handleButtonState : function(){
    	var cards = this.cardHistory, activeId = this.getLayout().activeItem.id;
    	var tb = this.getTopToolbar();
    	var back = tb.getI("back"), next = tb.getI("next");
    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			if(i <= 0){
    				back.disable();
    				next.enable();
    			}else if(i >= (len-1)){
    				back.enable();
    				next.disable();
    			}else{
    				back.enable();
    				next.enable();
    			}
    			break;
    		}
    	}
    },
	navHandler:function(index){
    	var cards = this.cardHistory,
    		activeId = this.getLayout().activeItem.id,
    		nextId;
    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			nextId = cards[i+index];
    			break;
    		}
    	}
    	this.getLayout().setActiveItem(nextId);
    	this.handleButtonState();
    },
    viewCard : function(card){
    	if(this.lookupI(card)==null)
    	{
    		this.loadSource(card,this);
    	}else
    	{
			this.getLayout().setActiveItem(card);
		    if(this.cardHistory.length > 1){
		    	this.cardHistory.pop();
		    }
		    this.cardHistory.push(card);
		    this.handleButtonState();
    	}
	},
	save : function(/*params*/){
	    /*var callback = params.callback || null;
		var callbackScope = params.callbackScope || this;
		
		params.moduleId = this.moduleId;*/
		/*
		 autorun:{desktop:{id:'desktop'}},
   			launchers :  {
							 		contextmenu: [],
							 		quickstart: ['apvouch'],
							 		shortcut: []
						    },
   			styles :{
								 		backgroundcolor: 'B8C7CE',//2247A4
								 		fontcolor: 'FFFFFF',
								 		transparency: 100,
								 		
								 		theme: {
									 		id: 0,
									 		name: 'Vista'
									 		,pathtofile: 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css'
								 	  },
								 	wallpaper: {
									 		id: 13,
									 		name: 'Blank',
									 		pathtofile: 'system/resources/wallpapers/blank.gif'
								 		},
								 		wallpaperposition: 'tile'
						    } 
		*/
		/*var config = {
			autorun : system.selectReg('autorun'),
			launchers : system.selectReg('launchers'),
			styles : system.selectReg('styles')
		};
		var c = Ext.decode(Ext.encode(config));
		Ext.apply(c,params.ids);
		var p = {config:Ext.encode(c)};*/
		var p = {
			config:Ext.encode(system.selectReg('user.preferences'))
		};
		Ext.Ajax.request({
			url: "os/source/sourceLoad.do?method=savePreferences",
			/* Could also pass moduleId and action in querystring like this
			 * instead of in the params config option.
			 *
			 * url: this.app.connection+'?moduleId='+this.id+'&action=myAction', */
			params: p,
			success: function(o){
				this.alert("提示","设置完成!");
			},
			failure: function(){
				this.alert("提示","设置失败!");
			},
			scope: this
		});
	},
	toClose : function() {
		this.delayClose();
	}
 });
 
 MC.app.Preferences.singleTon = true;
 Ext.onReady(function(){
  	window.system.install('preferences',MC.app.Preferences);
 });
