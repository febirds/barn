Ext.override(MC.app.Preferences, {
	shortcuts : function(win) {
		var nodes = this.expandShortcutsNodes(system.selectReg('sys.modules')/*[]*/, system.selectReg('user.preferences.launchers').shortcut);
		var p = new Ext.tree.TreePanel({
			id : 'shortcuts',
			autoScroll : true,
			bodyStyle : 'padding:10px',
			border : false,
			cls : 'pref-card pref-check-tree',
			lines : false,
			/*buttons : [{
				// disabled: system.isAllowedTo('saveShortcut',
				// this.owner.moduleId) ? false : true,
				handler : this.saveShortcuts,
				scope : this,
				text : '保存'
			}, {
				handler : this.toClose,
				scope : this,
				text : '关闭'
			}],*/

			listeners : {
				'checkchange' : {
					fn : this.onCheckChangesc,
					scope : this
				}
			},
			loader : new Ext.tree.TreeLoader(),
			rootVisible : false,
			root : new Ext.tree.AsyncTreeNode({
				text : 'Shortcuts',
				children : nodes
			}),
			title : '添加删除桌面图标'
		});
		new Ext.tree.TreeSorter(p, {
			dir : "asc"
		});
		win.add(p);
		//win.getLayout().setActiveItem(p);
		this.viewCard('shortcuts');
		win.doLayout();
	},
	expandShortcutsNodes : function(ms, ids) {
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
					checked : this.isCheckedsc(ms[i].moduleId, ids) ? true : false,
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

	isCheckedsc : function(id, ids) {
		for (var i = 0, len = ids.length; i < len; i++) {
			if (id == ids[i]) {
				return true;
			}
		}
	},
	onCheckChangesc : function(node, checked) {
		if (node.leaf && node.id) {
			if (checked) {
				system.desktop.addShortcut(node.id, true);
				system.selectReg("user.preferences.launchers").shortcut.push(node.id);
			} else {
				system.desktop.removeShortcut(node.id, true);
				system.selectReg("user.preferences.launchers").shortcut.remove(node.id);
			}
		}
		node.ownerTree.selModel.select(node);
	},
	saveShortcuts : function() {
		//this.buttons[0].disable();
		this.save({
			action : 'saveShortcut',
			/*callback : function() {
				this.buttons[0].enable();
			},
			callbackScope : this,*/
			ids : system.selectReg('user.preferences.launchers').shortcut//Ext.encode(system.selectReg('launchers').shortcut)
		});
	}
});
