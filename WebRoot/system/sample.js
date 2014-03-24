Ext.onReady(function() {
		/*Ext.Ajax.request({
		url : 'system/config2.js',
		
		callback : function(o, f, r) {
			try {
				eval(r.responseText);
			} catch (e) {
				Ext.getBody().mask('加载系统配置失败', 'x-mask-loading');
				return;
			}
			if (f) {
				// window.system = new MC.System(config);
				Ext.getBody().mask('加载系统配置完成', 'x-mask-loading');

			} else {
				Ext.getBody().mask('系统配置加载失败', 'x-mask-loading');
			}
		}
	});*/
	Ext.Ajax.request({
		url : 'system/config.js',
		/*
		 * argument:{ }, params: { name:k },
		 */
		callback : function(o, f, r) {
			window.temp = false;
			try {
				eval(r.responseText);
			} catch (e) {
				window.temp = false;
			}
			if (f && window.temp) {
				var config = window.temp;
				window.temp = undefined;
				// window.system = new MC.System(config);
				Ext.getBody().mask('加载用户配置信息，请稍候', 'x-mask-loading');
				Ext.Ajax.request({
					url : 'os/source/sourceLoad.do?method=getPreferences',
					argument : config,
					callback : function(o, f, r) {
						var config = r.argument;
						window.temp = false;
						try {
							eval(r.responseText);
						} catch (e) {
							window.temp = false;
						}
						if (f && window.temp) {
							var uconfig = window.temp;
							window.temp = undefined;

							Ext.apply(config, uconfig);
							window.system = new MC.System(config);
						} else {
							Ext.getBody().mask('未加载到用户配置信息，启用默认配置',
									'x-mask-loading');
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
				Ext.getBody().mask('系统配置加载失败', 'x-mask-loading');
			}
		}
	});
}, this)