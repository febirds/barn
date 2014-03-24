Ext.onReady(function() {
	Ext.getBody().mask('加载用户信息，请稍候', 'x-mask-loading');
	Ext.Ajax.request({
		url : 'personal/com_getPermissions.action',
		/*
		 * argument:{ }, params: { name:k },
		 */
		callback : function(o, f, r) {
			var result = r.responseText;
			var menu = result.replace(/system.desktop.taskbarTop.menuClick/g,'undefined');
			var menutree = false;
			try {
				menutree = Ext.decode(menu);
				menutree.push(result);
			} catch (e) {
				menutree = false;
			}
			if (f && menutree) {
				// window.system = new MC.System(config);
				Ext.Ajax.request({
					url : 'personal/com_getPreferences.action',
					argument : menutree,
					callback : function(o, f, r) {
						var mt = r.argument;
						window.temp = false;
						try {
							window.temp = Ext.decode(r.responseText);
						} catch (e) {
							window.temp = false;
						}
						if (f && window.temp) {
							var config = {
								preferences : window.temp,
								menutree : mt
							};
							window.temp = undefined;
							window.system = new MC.System(config);
						} else {
							Ext.getBody().mask('未加载到用户配置信息，启用默认配置',
									'x-mask-loading');
							//这里记录下来
							var p = Ext.decode(Ext.encode({autorun : [],launchers : MC.SYS_CONFIG.launchers,styles: MC.SYS_CONFIG.styles}));
							var config = {
								menutree : mt,
								preferences:p
							};
							window.temp = config;
							setTimeout(function() {
								var c = window.temp;
								window.temp = undefined;
								window.system = new MC.System(c);
							}, 1000);
						}
						
					}
				});
			} else {
				Ext.getBody().mask('用户菜单加载失败', 'x-mask-loading');
			}
		}
	});
}, this)