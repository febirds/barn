package com.barn.admin.action;

import java.util.List;

import org.apache.log4j.Logger;
import org.ebillion.common.action.BaseAction;
import org.ebillion.common.hibernate.OrderBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;

import com.barn.admin.entity.Permission;
import com.barn.admin.service.PermissionSrv;

@SuppressWarnings("serial")
@Scope("prototype")
@Controller("admin.permissionAct")
public class PermissionAct extends BaseAction {

	private static final Logger log = Logger.getLogger(PermissionAct.class);
	@Autowired
	protected PermissionSrv permissionSvr;

	protected List<Permission> menuList = null;

	public List<Permission> getMenuList() {
		return menuList;
	}

	public void setRoleList(List<Permission> menuList) {
		this.menuList = menuList;
	}

	public String list() {
		this.pagination = permissionSvr.findAll(pageNo, getCookieCount(),
				new OrderBy[] { OrderBy.asc("menuDefine1") });
		return null;
	}

	public String save() {
		permissionSvr.save(bean);
		log.info("添加功能 成功：{}" + bean);
		return list();
	}

	public String edit() {
		this.bean = permissionSvr.findById(id);
		return null;
	}

	public String update() {
		//bean.setEwjMediaRoles(null);
		permissionSvr.updateDefault(bean);
		log.info("修改 用户 成功");
		return list();
	}

	public String delete() {
		try {
			for (Permission o : permissionSvr.deleteById(ids)) {
				log.info(o);
			}
		} catch (DataIntegrityViolationException e) {
			addActionError("记录已被引用，不能删除!");
			return SHOW_ERROR;
		}
		return list();
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
				addActionError("默认管理员不能删除");
				return true;
			}
			if (vldExist(id)) {
				return true;
			}
		}
		return false;
	}

	private boolean vldExist(Integer id) {
		Permission entity = permissionSvr.findById(id);
		if (entity == null) {
			addActionError("记录不存在：" + id);
			return true;
		}
		return false;
	}

	private Permission bean;

	public Permission getBean() {
		return bean;
	}

	public void setBean(Permission bean) {
		this.bean = bean;
	}
	
	class Bean {

	}
}
