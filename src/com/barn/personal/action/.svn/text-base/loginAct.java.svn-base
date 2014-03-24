package com.barn.personal.action;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.ebillion.common.action.BaseAction;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.barn.admin.entity.Permission;
import com.barn.admin.entity.Role;
import com.barn.admin.entity.User;

@SuppressWarnings("serial")
@Scope("prototype")
@Controller("personal.loginAct")
public class loginAct extends BaseAction {

	private static final Logger log = Logger.getLogger(loginAct.class);


	public String loginInput() {
		return INPUT;
	}

	public String login() throws Exception {

		System.out.println("login");

		
		log.info("loginName=" + loginName);
		log.info("password=" + password);

		if(loginName != null) {
			
			return renderText("{'success':true,'data':'yes'}");
		}
		User user = null;
		if (user == null) {
			addActionError("用户不存在或密码错误！");
			return loginInput();
		}

		//判断用户是否禁用
		if (!user.getEnable()) {
			addActionError("用户被锁定，禁止登陆！");
			return loginInput();
		}

		// 清除以前登录信息
		contextPvd.logout();

		ArrayList<String> rightList = new ArrayList<String>();
		Set<Permission> menuList = null;
		Iterator<Permission> menuItr = menuList.iterator();
		while (menuItr.hasNext()) {
			Permission menuObj = menuItr.next();
			rightList.add(menuObj.getSource());
		}

		// Set<Role> roleList = user.getRoles();
		Set<Role> roleList = null;
		Iterator<Role> roleItr = roleList.iterator();
		while (roleItr.hasNext()) {
			Role roleObj = roleItr.next();
			Set<Permission> menuList1 = null;///...............
			Iterator<Permission> menuItr1 = menuList1.iterator();
			while (menuItr1.hasNext()) {
				Permission menuObj1 = menuItr1.next();
				rightList.add(menuObj1.getSource());
			}
		}

		Iterator<String> rightItr = rightList.iterator();
		while (rightItr.hasNext()) {
			String val1 = rightItr.next();
			// log.info("right="+val1);
		}

		// 为防止关联到Hibernate持久层对象，生成一个新的VO对象放在Session中。
		//EwjMediaUser newUser = new EwjMediaUser();
		BeanUtils bu = new BeanUtils();
		//bu.copyProperties(newUser, user);

		// 是否为超级管理员角色，可以看到所有数据，否则只能看到所属媒体数据。
		Boolean isSuperAdmin = false;
		//Set roles = user.getRoles();
		Set<Role> roles = null;
		Iterator<Role> itr = roles.iterator();
		while (itr.hasNext()) {
			Role roleObj = itr.next();
			String isSuperFlag = roleObj.getRoleName();
			if (isSuperFlag != null && isSuperFlag.equals("是")) {
				isSuperAdmin = true;
			}
		}
		// log.info("isSuperAdmin="+isSuperAdmin);

		// 保存当前登录信息
		contextPvd.setSessionAttr(contextPvd.ADMIN_KEY, user.getId());
		contextPvd.setSessionAttr(contextPvd.MEDIA_USER_KEY, user.getId());
		contextPvd.setSessionAttr(contextPvd.MEDIA_RIGHTS_KEY, rightList);
		contextPvd.setSessionAttr(contextPvd.MEDIA_SUPER_ADMIN_KEY,
				isSuperAdmin);

		return SUCCESS;
	}
	
	public String getPermissions() {
		
		return "permissions";
	}
	
	public String getPagePermissions() {
		
		return renderText("{'operId':'1','menuId':'1','enterRight':'1','addRight':'1','selectRight':'1','updateRight':'1','deleteRight':'1','printRight':'1','checkRight':'1','clearRight':'1','moneyRight':'1','ccreatePerson':'1'}");
	}
	
	public String getPreferences() {
		
		return renderText("");
	}
	
	public String getSource() {
		
		System.out.println(appId);
		return appId;
	}

	public String logout() {
		contextPvd.logout();
		return "logout";
	}

	private String checkCode;
	private String loginName;
	private String password;
	
	//模块名
	private String name;
	//模块id
	private String appId;
	

	public String getCheckCode() {
		return checkCode;
	}

	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	
}
