package com.barn.admin.action;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.ebillion.common.action.BaseAction;
import org.ebillion.common.hibernate.OrderBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;

import com.barn.admin.entity.Permission;
import com.barn.admin.entity.Role;
import com.barn.admin.service.PermissionSrv;
import com.barn.admin.service.RoleSrv;

@SuppressWarnings("serial")
@Scope("prototype")
@Controller("admin.roleAct")
public class RoleAct extends BaseAction {

	private static final Logger log = Logger.getLogger(RoleAct.class);

	@Autowired
	protected RoleSrv roleSrv;

	@Autowired
	protected PermissionSrv permissionSrv;

	private Integer[] menuId;
	private Role bean;
	private Permission rootMenu = null;
	private List<Permission> ewjMediaMenus;

	public List<Permission> getEwjMediaMenus() {
		return ewjMediaMenus;
	}

	public void setEwjMediaMenus(List<Permission> ewjMediaMenus) {
		this.ewjMediaMenus = ewjMediaMenus;
	}

	public Role getBean() {
		return bean;
	}

	public void setBean(Role bean) {
		this.bean = bean;
	}

	public Permission getRootMenu() {
		return rootMenu;
	}

	public void setRootMenu(Permission rootMenu) {
		this.rootMenu = rootMenu;
	}

	public Integer[] getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer[] menuId) {
		this.menuId = menuId;
	}

	public String list() {
		this.pagination = roleSrv.findAll(pageNo, getCookieCount(),
				new OrderBy[] { OrderBy.desc("id") });
		return null;
	}

	public String save() {
		bean.setRoleName("是");
		bean.setCreateDate(new Date());
		roleSrv.save(bean);
		log.info("添加角色成功：{}" + bean.getRoleName());
		return list();
	}

	public String edit() {
		this.bean = roleSrv.findById(id);
		return null;
	}

	public String update() {
		roleSrv.updateDefault(bean);
		log.info("修改角色 成功：{}" + bean.getRoleName());
		return list();
	}

	public String delete() {
		try {
			for (Role o : roleSrv.deleteById(ids)) {
				log.info("角色删除 成功" + o.getRoleName());
			}
		} catch (DataIntegrityViolationException e) {
			addActionError("记录已被引用，不能删除!");
			return SHOW_ERROR;
		}
		return list();
	}

	public String menu() {
		this.bean = roleSrv.findById(id);
		rootMenu = permissionSrv.createRoot();
		return "menu";
	}

	public String updatemenu() {
		this.bean = roleSrv.findById(bean.getId());
		rootMenu = permissionSrv.createRoot();
		Iterator<Permission> rootItr = ewjMediaMenus.iterator();
		HashSet<Permission> urSet = new HashSet<Permission>();
		while (rootItr.hasNext()) {
			Permission currObjTmp = rootItr.next();
			Integer currId = currObjTmp.getId();
			if (currId != null && currId.intValue() != 0) {
				Permission currObj = permissionSrv.findById(currObjTmp.getId());
				urSet.add(currObj);
			}
		}
		// bean.setEwjMediaMenus(urSet);
		roleSrv.updateDefault(bean);
		return "menu";
	}

	public boolean validateSave() {
		if (hasErrors()) {
			return true;
		}
		return false;
	}

	public boolean validateEdit() {
		if (hasErrors()) {
			return true;
		}
		if (vldExist(id)) {
			return true;
		}
		return false;
	}

	public boolean validateUpdate() {
		if (hasErrors()) {
			return true;
		}
		if (vldExist(bean.getId())) {
			return true;
		}
		return false;
	}

	public boolean validateDelete() {
		if (hasErrors()) {
			return true;
		}
		if (vldBatch()) {
			return true;
		}
		for (Integer id : ids) {
			if (id.equals(1)) {
				addActionError("默认角色不能删除");
				return true;
			}
			if (vldExist(id)) {
				return true;
			}
		}
		return false;
	}

	private boolean vldExist(Integer id) {
		Role entity = roleSrv.findById(id);
		if (entity == null) {
			addActionError("记录不存在：" + id);
			return true;
		}
		return false;
	}

}
