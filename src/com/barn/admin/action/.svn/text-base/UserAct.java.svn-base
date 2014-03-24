package com.barn.admin.action;

import org.apache.log4j.Logger;
import org.ebillion.common.action.ExtAction;
import org.ebillion.common.hibernate.OrderBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;

import com.barn.admin.entity.User;
import com.barn.admin.service.UserSrv;

@SuppressWarnings("serial")
@Scope("prototype")
@Controller("admin.userAct")
public class UserAct extends ExtAction {
	private static final Logger log = Logger.getLogger(UserAct.class);
	@Autowired
	protected UserSrv userSrv;

	public String list() {
		this.pagination = userSrv.findAll(pageNo, getCookieCount(),
				new OrderBy[] { OrderBy.desc("id") });
		return null;
	}

	public String save() {
		userSrv.save(bean);
		log.info("添加 用户 成功：" + bean.getLogName());
		return renderText("{}");
	}

	public String edit() {
		this.bean = userSrv.findById(id);
		return null;
	}

	public String update() {
		userSrv.updateDefault(bean);
		log.info("修改 用户 成功：" + bean.getLogName());
		return list();
	}

	public String delete() {
		try {
			for (User o : userSrv.deleteById(ids)) {
				log.info( o.getLogName());
			}
		} catch (DataIntegrityViolationException e) {
			addActionError("记录已被引用，不能删除!");
			return SHOW_ERROR;
		}
		return list();
	}

	public String editPassword() {
		return "editPassword";
	}
	
	public boolean validateSave() {
		if(bean.getLogName().equals("admin")) {
			renderText("{success:fales}");
			return true;
		}
		
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
				addActionError("超级管理员不能删除");
				return true;
			}
			if (vldExist(id)) {
				return true;
			}
		}
		return false;
	}

	private boolean vldExist(Integer id) {
		User entity = userSrv.findById(id);
		if (entity == null) {
			addActionError("记录不存在：" + id);
			return true;
		}
		return false;
	}

	private User bean;

	public User getBean() {
		return bean;
	}

	public void setBean(User bean) {
		this.bean = bean;
	}
	
}
