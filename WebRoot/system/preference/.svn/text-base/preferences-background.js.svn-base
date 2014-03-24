Ext.override(MC.app.Preferences, {

	background : function(win) {
	var data ={"wallpapers":[
{"group":"Blank","id":"13","name":"Blank","pathtothumbnail":"system/resources/wallpapers/thumbnails/blank.gif","pathtofile":"system/resources/wallpapers/blank.gif"}
,{"group":"Nature","id":"1","name":"Buid","pathtothumbnail":"system/resources/wallpapers/thumbnails/buid.jpg","pathtofile":"system/resources/wallpapers/buid.jpg"}
,{"group":"Nature","id":"2","name":"Colorado Farm","pathtothumbnail":"system/resources/wallpapers/thumbnails/colorado-farm.jpg","pathtofile":"system/resources/wallpapers/colorado-farm.jpg"}
,{"group":"Nature","id":"3","name":"Curls On Green","pathtothumbnail":"system/resources/wallpapers/thumbnails/curls-on-green.jpg","pathtofile":"system/resources/wallpapers/curls-on-green.jpg"}
,{"group":"Nature","id":"6","name":"Fields of Peace","pathtothumbnail":"system/resources/wallpapers/thumbnails/fields-of-peace.jpg","pathtofile":"system/resources/wallpapers/fields-of-peace.jpg"}
,{"group":"Nature","id":"7","name":"Fresh Morning","pathtothumbnail":"system/resources/wallpapers/thumbnails/fresh-morning.jpg","pathtofile":"system/resources/wallpapers/fresh-morning.jpg"}
,{"group":"Nature","id":"8","name":"Ladybuggin","pathtothumbnail":"system/resources/wallpapers/thumbnails/ladybuggin.jpg","pathtofile":"system/resources/wallpapers/ladybuggin.jpg"}
,{"group":"Nature","id":"9","name":"Summer","pathtothumbnail":"system/resources/wallpapers/thumbnails/summer.jpg","pathtofile":"system/resources/wallpapers/summer.jpg"}
,{"group":"Patterns","id":"12","name":"Blue Curtain","pathtothumbnail":"system/resources/wallpapers/thumbnails/blue-curtain.jpg","pathtofile":"system/resources/wallpapers/blue-curtain.jpg"}
,{"group":"Patterns","id":"11","name":"Blue Psychedelic","pathtothumbnail":"system/resources/wallpapers/thumbnails/blue-psychedelic.jpg","pathtofile":"system/resources/wallpapers/blue-psychedelic.jpg"}
,{"group":"Patterns","id":"10","name":"Blue Swirl","pathtothumbnail":"system/resources/wallpapers/thumbnails/blue-swirl.jpg","pathtofile":"system/resources/wallpapers/blue-swirl.jpg"}
,{"group":"Patterns","id":"4","name":"Emotion","pathtothumbnail":"system/resources/wallpapers/thumbnails/emotion.jpg","pathtofile":"system/resources/wallpapers/emotion.jpg"}
,{"group":"Patterns","id":"5","name":"Eos","pathtothumbnail":"system/resources/wallpapers/thumbnails/eos.jpg","pathtofile":"system/resources/wallpapers/eos.jpg"}
/*,{"group":"qWikiOffice","id":"1","name":"qWikiOffice","pathtothumbnail":"system/resources/wallpapers/thumbnails/qwikioffice.jpg","pathtofile":"system/resources/wallpapers/qwikioffice.jpg"}*/
]}
	var store = new Ext.data.JsonStore({
		//url:'os/source/sourceLoad.do?method=getContent',
		baseParams :{moduleId:'wallpapers'},
		proxy: new Ext.data.MemoryProxy(data),
		fields: ['group','id', 'name', 'pathtothumbnail', 'pathtofile'],
		id: 'id',
		root: 'wallpapers'
	});
	
	//this.store = store;
	
	/*store.on('load', function(store, records){
		if(records){
			defaults.setTitle('默认墙纸 (' + records.length + ')');
			
			var id = system.styles.wallpaper.id;
			if(id){
				view.select('wallpaper-'+id);
			}
		}	
	}, this);*/
	store.loadData(data);
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="pref-view-thumb-wrap" id="wallpaper-{id}">',
				'<div class="pref-view-thumb"><img src="{pathtothumbnail}" title="{name}" /></div>',
			'<span>{shortName}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
	);

	var view = new Ext.DataView({
		autoHeight:true,
		cls: 'pref-thumnail-view',
		emptyText: 'No wallpapers to display',
		itemSelector:'div.pref-view-thumb-wrap',
		loadingText: 'loading...',
		singleSelect: true,
		overClass:'x-view-over',
		prepareData: function(data){
			data.shortName = Ext.util.Format.ellipsis(data.name, 17);
			return data;
		},
		store: store,
		tpl: tpl
	});
	view.on('selectionchange', this.onSelectionChange, this);
	
	var defaults = new Ext.Panel({
		animCollapse: false,
		baseCls:'collapse-group',
		border: false,
		cls: 'pref-thumbnail-viewer',
		collapsible: true,
		hideCollapseTool: true,
		id: 'pref-wallpaper-view',
		items: view,
		title: '默认墙纸',
		titleCollapse: true
	});
	
	var wallpapers = new Ext.Panel({
		autoScroll: true,
		bodyStyle: 'padding:10px',
		border: true,
		cls: 'pref-card-subpanel',
		id: 'wallpapers',
		items: defaults,
		margins: '10 15 0 15',
		region: 'center'
	});
	
	//var wpp = system.styles.wallpaperposition;
	var wpp = system.selectReg('user.preferences.styles').wallpaperposition;
	var tileRadio = this.createRadio('tile', wpp == 'tile' ? true : false, 90, 40);
	var centerRadio = this.createRadio('center', wpp == 'center' ? true : false, 200, 40);
	
	var position = new Ext.FormPanel({
		border: false,
		height: 140,
		id: 'position',
		items: [{
				border: false,
				items: {border: false, html:'墙纸的显示方式?'},
				x: 15,
				y: 15
			},{
				border: false,
				items: {border: false, html: '<img class="bg-pos-tile" src="'+Ext.BLANK_IMAGE_URL+'" width="64" height="44" border="0" alt="" />'},
				x: 15,
				y: 40
			},
				tileRadio,
			{
				border: false,
				items: {border: false, html: '<img class="bg-pos-center" src="'+Ext.BLANK_IMAGE_URL+'" width="64" height="44" border="0" alt="" />'},
				x: 125,
				y: 40
			},
				centerRadio,
			{
				border: false,
				items: {border: false, html:'选择桌面背景颜色'},
				x: 245,
				y: 15
			},{
				border: false,
				/* items: new Ext.ColorPalette({
					listeners: {
						'select': {
							fn: onColorSelect
							, scope: this
						}
					}
				}), */
				items: [{
					xtype:'button',
					handler: this.onChangeBgColor,
					//menu: new Ext.ux.menu.ColorMenu(),
					scope: this,
					text: '背景颜色'
				}],
				x: 245,
				y: 40
			},{
				border: false,
				items: {border: false, html:'选择桌面字体颜色'},
				x: 425,
				y: 15
			},{
				border: false,
				/* items: new Ext.ColorPalette({
					listeners: {
						'select': {
							fn: onFontColorSelect
							, scope: this
						}
					}
				}), */
				items:[{
					xtype:'button',
					handler: this.onChangeFontColor,
					scope: this,
					text: '字体颜色'
				}],
				x: 425,
				y: 40
				
		}],
		layout: 'absolute',
		region: 'south',
		split: false
	});

		var p = new Ext.Panel({
			id : 'background',
			layout: 'border',
			title: '桌面背景设置',
			/*listeners : {
				'render' : {
					fn : this.onCheckChange,
					scope : this
				}
			},*/
			border: false,
		/*buttons: [{
			//disabled: this.app.isAllowedTo('saveBackground', this.owner.moduleId) ? false : true,
			handler: this.saveBackground,
			scope: this,
			text: '保存'
			},{
			handler: this.toClose,
			scope: this,
			text: '关闭'
		}],*/
		cls: 'pref-card',
		items: [
			wallpapers,
			position
		]
		});
		
		win.add(p);
		//win.getLayout().setActiveItem(p);
		this.viewCard('background');
		win.doLayout();
	},
	createRadio:function(value, checked, x, y){
		if(value){
			radio = new Ext.form.Radio({
				name: 'position',
				inputValue: value,
				checked: checked,
				x: x,
				y: y
			});
			
			radio.on('check', this.togglePosition, radio);
			
			return radio;
		}
	},
    onChangeBgColor : function(){
    	/*var dialog = new Ext.ux.ColorDialog({
			border: false
			, closeAction: 'close'
			, listeners: {
				'select': { fn: this.onColorSelect, scope: this, buffer: 350 }
			}
			, manager: system.desktop.getManager()
			, resizable: false
			, title: '颜色拾取器'
		});
		dialog.show(system.styles.backgroundcolor);*/
    	this.createWindow({
    		width:353,
    		height:263,
    		isEmptyWin:true,
    		border: false
			, closeAction: 'close'
			/*, listeners: {
				'select': { fn: this.onColorSelect, scope: this, buffer: 350 }
			}*/
			//, manager: system.desktop.getManager()
			, resizable: false
			, title: '桌面背景 - 颜色拾取器'
    	},Ext.ux.ColorDialog).show(system.selectReg('user.preferences.styles').backgroundcolor,this.onColorSelect,this);
    },
    onColorSelect : function(hex){
		system.desktop.setBackgroundColor(hex);
		system.selectReg('user.preferences.styles').backgroundcolor = hex;
	},
	onChangeFontColor : function(){
    	this.createWindow({
    		//cacheable : true,
    		width:353,
    		height:263,
    		isEmptyWin:true,
    		border: false
			, closeAction: 'close'
			/*, listeners: {
				'select': { fn: this.onFontColorSelect, scope: this, buffer: 350 }
			}*/
			//, manager: system.desktop.getManager()
			, resizable: false
			, title: '桌面字体颜色 - 颜色拾取器'
    	},Ext.ux.ColorDialog).show(system.selectReg('user.preferences.styles').fontcolor,this.onFontColorSelect,this);
    	/*
    	var dialog = new Ext.ux.ColorDialog({
			border: false
			, closeAction: 'close'
			, listeners: {
				'select': { fn: this.onFontColorSelect, scope: this, buffer: 350 }
			}
			, manager: system.desktop.getManager()
			, resizable: false
			, title: '颜色拾取器'
		});
		dialog.show(system.styles.fontcolor);*/
    },
	onFontColorSelect : function(hex){
		system.desktop.setFontColor(hex);
		system.selectReg('user.preferences.styles').fontcolor = hex;
	},
	saveBackground : function(){
		var c = system.selectReg('user.preferences.styles');
		
		this.buttons[0].disable();
    	this.save({
    		action: 'saveBackground'
    		, callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, backgroundcolor: c.backgroundcolor
    		, fontcolor: c.fontcolor
    		, theme: c.theme.id
    		, transparency: c.transparency
    		, wallpaper: c.wallpaper.id
    		, wallpaperposition: c.wallpaperposition
    	});
	},
	onSelectionChange : function(view, sel){
		if(sel.length > 0){
			//var cId = system.styles.wallpaper.id,
			var cId = system.selectReg('user.preferences.styles').wallpaper.id
				r = view.getRecord(sel[0]),
				d = r.data;
			
			if(parseInt(cId) !== parseInt(r.id)){
				if(r && r.id && d.name && d.pathtofile){
					system.desktop.setWallpaper({
						id: r.id,
						name: d.name,
						pathtofile: d.pathtofile
					});
				}
			}
		}
	},
	togglePosition : function(field, checked){
		if(checked === true){
			system.desktop.setWallpaperPosition(field.inputValue);
		}
	}
});
