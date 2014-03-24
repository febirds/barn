Ext.override(MC.app.Preferences, {

	appearance : function(win) {

		var data = {
			"themes" : [/*{
				"group" : "Vista",
				"id" : "2",
				"name" : "Vista Black",
				"pathtothumbnail" : "system/resources/themes/xtheme-vistablack/xtheme-vistablack.png",
				"pathtofile" : "system/resources/themes/xtheme-vistablack/css/xtheme-vistablack.css"
			},*/ {
				"group" : "Vista",
				"id" : "1",
				"name" : "Vista Blue",
				"pathtothumbnail" : "system/resources/themes/xtheme-vistablue/xtheme-vistablue.png",
				"pathtofile" : "system/resources/themes/xtheme-vistablue/css/xtheme-vistablue.css"
			}/*, {
				"group" : "Vista",
				"id" : "3",
				"name" : "Vista Glass",
				"pathtothumbnail" : "system/resources/themes/xtheme-vistaglass/xtheme-vistaglass.png",
				"pathtofile" : "system/resources/themes/xtheme-vistaglass/css/xtheme-vistaglass.css"
			}*/]
		};
		this.store = new Ext.data.JsonStore({
			// url : 'os/source/sourceLoad.do?method=getContent',
			baseParams : {
				moduleId : 'themes'
			},
			proxy : new Ext.data.MemoryProxy(data),
			fields : ["group", 'id', 'name', 'pathtothumbnail', 'pathtofile'],
			root : 'themes'
		});
		/*store.on('load', function(store, records) {
			if (records) {
				defaults.setTitle('默认主题 (' + records.length + ')');

				var id = system.styles.theme.id;
				if (id) {
					view.select('theme-' + id);
				}
				store.loaded = true;
			}
		}, this);*/
		this.store.loadData(data);
		this.store.loaded = true;//后面是远程数据
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="pref-view-thumb-wrap" id="theme-{id}">',
				'<div class="pref-view-thumb"><img src="{pathtothumbnail}" title="{name}" /></div>',
				'<span>{shortName}</span></div>', '</tpl>',
				'<div class="x-clear"></div>');
		var view = new Ext.DataView({
			autoHeight : true,
			cls : 'pref-thumnail-view',
			emptyText : 'No themes to display',
			itemSelector : 'div.pref-view-thumb-wrap',
			loadingText : 'loading...',
			singleSelect : true,
			overClass : 'x-view-over',
			prepareData : function(data) {
				data.shortName = Ext.util.Format.ellipsis(data.name, 17);
				return data;
			},
			store : this.store,
			tpl : tpl
		});
		view.on('selectionchange', this.onSelectionChange, this);
		var defaults = new Ext.Panel({
			animCollapse : false,
			baseCls : 'collapse-group',
			border : false,
			cls : 'pref-thumbnail-viewer',
			collapsible : true,
			hideCollapseTool : true,
			id : 'pref-theme-view',
			items : view,
			title : '默认主题',
			titleCollapse : true
		});
		var themes = new Ext.Panel({
			autoScroll : true,
			bodyStyle : 'padding:10px',
			border : true,
			cls : 'pref-card-subpanel',
			id : 'themes',
			items : defaults,
			margins : '10 15 0 15',
			region : 'center'
		});
		this.slider = this.createSlider({
			handler : new Ext.util.DelayedTask(this.updateTransparency, this),
			min : 0,
			max : 100,
			x : 15,
			y : 35,
			width : 100
		});
		var smenu = new Ext.form.Checkbox({
			name: 'shortmenu',
			x : 280,
			y : 35,
			//inputValue: value,
			handler:function(c){
					alert(c.value);
			},//this.smenuOncheck,
			checked: system.selectReg("user.preferences.styles").shortMenu
		});
		smenu.on('check',this.smenuOncheck);
		var formPanel = new Ext.FormPanel({
			border : false,
			height : 70,
			items : [{
				x : 15,
				y : 15,
				xtype : 'label',
				text : '任务栏透明度设置'
			}, this.slider.slider,
			this.slider.display,
			smenu,
			{
				xtype:'label',
				x : 300,
				y : 35,
				text:'显示快捷菜单'
			}
			],
			layout : 'absolute',
			split : false,
			region : 'south'
		});
		var p = new Ext.Panel({
			autoScroll : true,
			id : 'appearance',
			border : false,
			layout : 'border',
			title : '主题样式',
			cls : 'pref-card',
			/*buttons : [{
				//disabled : this.app.isAllowedTo('saveAppearance',
				//		this.owner.moduleId) ? false : true,
				handler : this.saveAppearance,
				scope : this,
				text : '保存'
			}, {
				handler : this.toClose,
				scope : this,
				text : '关闭'
			}],*/
			listeners : {
				render : function() {
					this.on('show', this.ownerCt.loadStore, this.ownerCt, {
						single : true
					});
				}
			},
			items : [themes, formPanel]
		});
		win.add(p);
		win.doLayout();
		this.viewCard('appearance');
	},
	smenuOncheck:function(c){
		//alert(this.value+":"+c.getValue());
		system.desktop.setShortMenu(c.getValue());
	},
	loadStore : function() {
		if (!this.store.loaded) {
			this.store.load();
		}
		//this.slider.slider.setValue(system.styles.transparency);
		this.slider.slider.setValue(system.selectReg('user.preferences.styles').transparency);
	},
	createSlider : function(config) {
		var handler = config.handler, min = config.min, max = config.max, width = config.width
				|| 100, x = config.x, y = config.y;
		var slider = new Ext.Slider({
			minValue : min,
			maxValue : max,
			width : width,
			x : x,
			y : y
		});
		var display = new Ext.form.NumberField({
			cls : 'pref-percent-field',
			enableKeyEvents : true,
			maxValue : max,
			minValue : min,
			width : 45,
			x : x + width + 15,
			y : y - 1
		});
		function sliderHandler(slider) {
			var v = slider.getValue();
			display.setValue(v);
			handler.delay(100, null, null, [v]); // delayed task prevents IE
													// bog
		}
		slider.on({
			'change' : {
				fn : sliderHandler,
				scope : this
			},
			'drag' : {
				fn : sliderHandler,
				scope : this
			}
		});
		display.on({
			'keyup' : {
				fn : function(field) {
					var v = field.getValue();
					if (v !== '' && !isNaN(v) && v >= field.minValue
							&& v <= field.maxValue) {
						slider.setValue(v);
					}
				},
				buffer : 350,
				scope : this
			}
		});
		return {
			slider : slider,
			display : display
		}
	},
	saveAppearance : function() {
		var c = system.selectReg('styles');
		this.buttons[0].disable();
		this.owner.save({
			action : 'saveAppearance',
			callback : function() {
				this.buttons[0].enable();
			},
			callbackScope : this,
			backgroundcolor : c.backgroundcolor,
			fontcolor : c.fontcolor,
			theme : c.theme.id,
			transparency : c.transparency,
			wallpaper : c.wallpaper.id,
			wallpaperposition : c.wallpaperposition
		});
	},
	onSelectionChange : function(view, sel) {
		this.alert('提示', '正在使用默认主题！');
		return;
		if (sel.length > 0) {
			var cId = system.selectReg('styles').theme.id, r = view.getRecord(sel[0]), d = r.data;

			if (parseInt(cId) !== parseInt(r.id)) {
				if (r && r.id && d.name && d.pathtofile) {
					system.desktop.setTheme({
						id : r.id,
						name : d.name,
						pathtofile : d.pathtofile
					});
				}
			}
		}
	},
	updateTransparency : function(v) {
		system.desktop.setTransparency(v);
	}

});
