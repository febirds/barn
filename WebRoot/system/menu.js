window.temp = [{
	id : "0",
	text : "系统菜单",
	hideOnClick : false,
	children : [{
		id : "admin",
		text : "系统设置",
		hideOnClick : false,
		children : [{
			id : "personal",
			text : "个人密码管理",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "operRight",
			text : "操作权限",
			hideOnClick : false,
			children : [{
				id : "role",
				text : "角色",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "operators",
				text : "操作员",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "roleright",
				text : "角色权限分配",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "operatorsright",
				text : "操作员权限分配",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "billCodeRule",
			text : "单据编号设置",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "menu",
			text : "菜单设置",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "finOption",
			text : "财务选项",
			hideOnClick : false,
			children : [{
				id : "fprofile",
				text : "会计参数",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "period",
				text : "会计期间",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}]
	}, {
		id : "baseInfo",
		text : "基本资料",
		hideOnClick : false,
		children : [{
			id : "customer",
			text : "客户相关资料",
			hideOnClick : false,
			children : [{
				id : "customerBasicInfo",
				text : "客户资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "customersGoodsInfo",
				text : "客户存货信息",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "customersGoodsPrice",
				text : "客户存货价格",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "vendorInfo",
			text : "供应商相关资料",
			hideOnClick : false,
			children : [{
				id : "vendor",
				text : "供应商资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "venProduct",
				text : "供应商存货信息",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "venPrice",
				text : "供应商存货价格",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "invVenPrice",
				text : "存货供应商价格",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "inventoryInfo",
			text : "存货相关资料",
			hideOnClick : false,
			children : [{
				id : "wareHouseInit",
				text : "仓库资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "invClass",
				text : "存货类别",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "invInit",
				text : "存货资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "productInfo",
			text : "生产相关资料",
			hideOnClick : false,
			children : [{
				id : "bomInit",
				text : "BOM资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "financeInfo",
			text : "财务相关资料",
			hideOnClick : false,
			children : [{
				id : "fsubject",
				text : "会计科目",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "settlestyle",
				text : "结算方式",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "vouchersort",
				text : "凭证类别",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "defaultFsub",
				text : "默认科目设置",
				hideOnClick : false,
				children : [{
					id : "arinputcode",
					text : "应收基本科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}, {
					id : "arctrlcode",
					text : "应收控制科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}, {
					id : "arinvcode",
					text : "应收产品科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}, {
					id : "apinputcode",
					text : "应付基本科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}, {
					id : "apctrlcode",
					text : "应付控制科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}, {
					id : "apinvcode",
					text : "应付产品科目",
					//handler : system.desktop.taskbarTop.menuClick,
					leaf : true
				}]
			}, {
				id : "fexchange",
				text : "汇率",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "currency",
				text : "币种",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "bank",
				text : "银行帐号",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "GLBdigest",
				text : "常用摘要",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "projectribose",
				text : "核算项目",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "human",
			text : "人事相关资料",
			hideOnClick : false,
			children : [{
				id : "department",
				text : "部门资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "employee",
				text : "职员资料",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}]
	}, {
		id : "initialtion",
		text : "初始化",
		hideOnClick : false,
		children : [{
			id : "glaccsum",
			text : "总账科目初始数据",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "invint",
			text : "库存初始数据",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "buyInfo",
		text : "采购管理",
		hideOnClick : false,
		children : [{
			id : "inquire",
			text : "采购询价单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "buyorder",
			text : "采购订单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "saleInfo",
		text : "销售管理",
		hideOnClick : false,
		children : [{
			id : "quotalion",
			text : "销售报价单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "sellorder",
			text : "销售订单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "shipment",
			text : "销售发货通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "warehouse",
		text : "仓库管理",
		hideOnClick : false,
		children : [{
			id : "buystorecheck",
			text : "采购收货单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "sendBack",
			text : "采购退货单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "saleout",
			text : "销售发货单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "mvrecordout",
			text : "领料出库单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "supRecordout",
			text : "补料出库单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "rmwhin",
			text : "退料入库单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "jskin",
			text : "生产入库单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "allocation",
			text : "仓库调拨单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "regulate",
			text : "存货调整单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "check",
			text : "仓库盘点单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "mrpInfo",
		text : "MRP",
		hideOnClick : false,
		children : [{
			id : "analyze",
			text : "MRP需求分析",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "productManagement",
		text : "生产管理",
		hideOnClick : false,
		children : [{
			id : "productflow",
			text : "生产工单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "matRequire",
			text : "生产领料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "matSupply",
			text : "生产补料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "matReturn",
			text : "生产退料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "product",
			text : "生产入库通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "productreport",
			text : "生产日报",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "outsourcingflowInfo",
		text : "委外管理",
		hideOnClick : false,
		children : [{
			id : "outsourcProductflow",
			text : "委外工单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "outsourcMatRequire",
			text : "委外领料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "outsourcMatSupply",
			text : "委外补料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "outsourcMatReturn",
			text : "委外退料通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "outsourceProduct",
			text : "委外入库通知单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "outsourcProductreport",
			text : "委外生产日报",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "moldInfo",
		text : "模具管理",
		hideOnClick : false,
		children : [{
			id : "mold",
			text : "模具维护",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "moldVen",
			text : "供应商模具查询",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "financeAr",
		text : "应收管理",
		hideOnClick : false,
		children : [{
			id : "salebill",
			text : "销售发票",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "arvouchs",
			text : "其他应收单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "arclosebill",
			text : "收款单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "financeAp",
		text : "应付管理",
		hideOnClick : false,
		children : [{
			id : "purbill",
			text : "采购发票",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "apvouch",
			text : "其他应付单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "closebill",
			text : "付款单",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "financeAll",
		text : "总账管理",
		hideOnClick : false,
		children : [{
			id : "glaccvouch",
			text : "凭证管理",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "gltally",
			text : "记账管理",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}, {
			id : "glsettle",
			text : "结账管理",
			//handler : system.desktop.taskbarTop.menuClick,
			leaf : true
		}]
	}, {
		id : "journaling",
		text : "报表",
		hideOnClick : false,
		children : [{
			id : "saleReports",
			text : "销售报表",
			hideOnClick : false,
			children : [{
				id : "orderStatusQuery",
				text : "订单执行进度表",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "wareReports",
			text : "库存报表",
			hideOnClick : false,
			children : [{
				id : "materialsummary",
				text : "进销存汇总表",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "materialdetails",
				text : "进销存明细表",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "storagemgr",
				text : "库存查询",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}, {
			id : "finReports",
			text : "财务报表",
			hideOnClick : false,
			children : [{
				id : "glaccsum_sort",
				text : "总分类账",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "glaccvouch_sort",
				text : "明细分类账",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "glaccvouch_sequence",
				text : "序时簿",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "glaccvouch_fsubject",
				text : "日报表",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}, {
				id : "glaccsum_balance",
				text : "余额表",
				//handler : system.desktop.taskbarTop.menuClick,
				leaf : true
			}]
		}]
	}]
}];