Ext.override(MC.app.Preferences, {

	quickstart : function(win) {
		var nodes = this.expandQuickstartNodes(system.selectReg('sys.modules')/*[]*/, system.selectReg('user.preferences.launchers').quickstart);
		var p = new Ext.tree.TreePanel({
			autoScroll : true,
			bodyStyle : 'padding:10px',
			border : false,
			id : 'quickstart',
			cls : 'pref-card pref-check-tree',
			lines : false,
			listeners : {
				'checkchange' : {
					fn : this.onCheckChangeqs,
					scope : this
				}
			},
			/*buttons : [{
				// disabled : this.app.isAllowedTo('saveQuickstart',
				// this.owner.moduleId) ? false : true,
				handler : this.saveQuickstart,
				scope : this,
				text : '保存'
			}, {
				handler : this.toClose,
				scope : this,
				text : '关闭'
			}],*/
			loader : new Ext.tree.TreeLoader(),
			rootVisible : false,
			root : new Ext.tree.AsyncTreeNode({
				text : '快速启动项',
				children : nodes
			}),
			title : '添加删除快速启动栏项'

		});
		new Ext.tree.TreeSorter(p, {
			dir : "asc"
		});
		win.add(p);
		//win.getLayout().setActiveItem(p);
		this.viewCard('quickstart');
		win.doLayout();
	},
	expandQuickstartNodes : function(ms, ids) {
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
					checked : this.isCheckedqs(ms[i].moduleId, ids) ? true : false,
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
	isCheckedqs : function(id, ids) {
		for (var i = 0, len = ids.length; i < len; i++) {
			if (id == ids[i]) {
				return true;
			}
		}
	},
	onCheckChangeqs : function(node, checked) {
		if (node.leaf && node.id) {
			if (checked) {
				system.desktop.addQuickStartButton(node.id, true);
				system.selectReg("user.preferences.launchers").quickstart.push(node.id);
			} else {
				system.desktop.removeQuickStartButton(node.id, true);
				system.selectReg("user.preferences.launchers").quickstart.push(node.id);
			}
		}
		node.ownerTree.selModel.select(node);
	},
	saveQuickstart : function() {
		//this.buttons[0].disable();
		this.save({
			action : 'saveQuickstart',
			callback : function() {
				this.buttons[0].enable();
			},
			callbackScope : this,
			ids : Ext.encode(system.selectReg('launchers').quickstart)
		});
	}

});
