Ext.override(MC.app.Preferences, {

	navigation : function(win) {
		var p = new Ext.Panel({
			autoScroll : true,
			bodyStyle : 'padding:15px',
			border : false,
			html : '<ul id="pref-nav-panel"> \
				<li> \
					<img src="'
					+ Ext.BLANK_IMAGE_URL
					+ '" class="icon-pref-autorun"/> \
					<a id="viewShortcuts" href="#">桌面图标项</a><br /> \
					<span>选择哪些组件的图标显示到桌面.</span> \
				</li> \
				<li> \
					<img src="'
					+ Ext.BLANK_IMAGE_URL
					+ '" class="icon-pref-autorun"/> \
					<a id="viewAutoRun" href="#">自动启动项</a><br /> \
					<span>选择哪些组件在系统启动的时候随系统一起启动.</span> \
				</li> \
				<li> \
					<img src="'
					+ Ext.BLANK_IMAGE_URL
					+ '" class="icon-pref-quickstart"/> \
					<a id="viewQuickstart" href="#">快速启动栏</a><br /> \
					<span>选择哪些组件添加到快速启动栏.</span> \
				</li> \
				<li> \
					<img src="'
					+ Ext.BLANK_IMAGE_URL
					+ '" class="icon-pref-appearance"/> \
					<a id="viewAppearance" href="#">外观样式</a><br /> \
					<span>设置系统的外观风格样式.</span> \
				</li> \
				<li> \
					<img src="'
					+ Ext.BLANK_IMAGE_URL
					+ '" class="icon-pref-wallpaper"/> \
					<a id="viewWallpapers" href="#">桌面背景项</a><br /> \
					<span>设置桌面背景样式.</span> \
				</li> \
			</ul>',
			owner : win,
			id : 'navigation',
			actions : {
				'viewShortcuts' : function(owner) {
					owner.viewCard('shortcuts');
				},
				'viewAutoRun' : function(owner) {
					owner.viewCard('autorun');
				},
				'viewQuickstart' : function(owner) {
					owner.viewCard('quickstart');
				},
				'viewAppearance' : function(owner) {
					owner.viewCard('appearance');
				},
				'viewWallpapers' : function(owner) {
					owner.viewCard('background');
				}
			},
			listeners:{
				render : function() {
					this.body.on({
						'mousedown' : {
							fn : this.doAction,
							scope : this,
							delegate : 'a'
						},
						'click' : {
							fn : Ext.emptyFn,
							scope : null,
							delegate : 'a',
							preventDefault : true
						}
					});
				}
			},
			doAction : function(e, t) {
				e.stopEvent();
				this.actions[t.id](this.owner);
			}
		});
		win.add(p);
		//win.getLayout().setActiveItem(p);
		this.viewCard('navigation');
		win.doLayout();
	}

});
