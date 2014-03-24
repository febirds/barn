Ext.override(MC.app.Preferences, {

	autorun : function(win) {
		var nodes = [];
		var nodes = this.expandAutorunNodes(system.selectReg('sys.modules')/*[]*/, system.selectReg('user.preferences.autorun'));
		var p = new Ext.tree.TreePanel({
			owner : win,
			id : 'autorun',
			autoScroll : true,
			bodyStyle : 'padding:10px',
			border : false,
			/*buttons : [{
				// disabled: this.app.isAllowedTo('saveAutorun',
				// this.owner.moduleId) ? false : true,
				handler : this.saveAutorun,
				scope: this,
				text : '保存'
			}, {
				handler : this.toClose,
				scope: this,
				text : '关闭'
			}],*/
			cls : 'pref-card pref-check-tree',
			lines : false,
			listeners : {
				'checkchange' : {
					fn : this.onCheckChangeAutoRun,
					scope : this
				}
			},
			loader : new Ext.tree.TreeLoader(),
			rootVisible : false,
			root : new Ext.tree.AsyncTreeNode({
				text : '自动启动项',
				children : nodes
			}),
			title : '自动启动项'
		});
		new Ext.tree.TreeSorter(p, {
			dir : "asc"
		});

		win.add(p);
		this.viewCard('autorun');
		win.doLayout();
	},
	expandAutorunNodes : function(ms, ids) {
		var nodes = [];
		var tree = system.selectReg("user.menutree");
		for (var i = 0, len = ms.length; i < len; i++) {
			if(typeof tree.getNodeById(ms[i].moduleId) !="object")continue;
			if (ms[i].moduleType === 'menu') {
				/*
				 * nodes.push({ leaf: false, text: ms[i].launcher.text,
				 * children: this.expandNodes(o.menu.items, ids) });
				 */
			} else {
				nodes.push({
					checked : this.isCheckedAutoRun(ms[i].moduleId, ids) ? true : false,
					iconCls : ms[i].iconCls,
					id : ms[i].moduleId,
					leaf : true,
					selected : true,
					text : ms[i].text
				});
			}
		}
		return nodes;
	},
	isCheckedAutoRun : function(id, ids) {
		for (var i = 0, len = ids.length; i < len; i++) {
			if (id == ids[i]) {
				return true;
			}
		}
	},
	onCheckChangeAutoRun : function(node, checked) {
		if (node.leaf && node.id) {
			if (checked) {
				system.desktop.addAutoRun(node.id);
			} else {
				system.desktop.removeAutoRun(node.id);
			}
		}
		node.ownerTree.selModel.select(node);
	},
	saveAutorun : function() {
		this.buttons[0].disable();
		this.save({
			action : 'saveShortcut',
			callback : function() {
				this.buttons[0].enable();
			},
			callbackScope : this,
			ids : system.selectReg('user.preferences.autorun')
		});
	}
});
