package org.ebillion.right;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.ebillion.common.struts2.ContextPvd;

import com.barn.admin.action.AdminLoginAct;
import com.barn.admin.entity.Permission;
import com.barn.admin.entity.Role;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

@SuppressWarnings("serial")
public class AuthorityInterceptor extends AbstractInterceptor {

	private static final Logger log = Logger.getLogger(AdminLoginAct.class);

	protected ContextPvd contextPvd;


	@Override
	public String intercept(ActionInvocation invocation) throws Exception {

		ActionContext ctx = invocation.getInvocationContext();

		// 判断用户是否登录，session是否存在
		Map session = ctx.getSession();
		Integer userid = (Integer) session.get(contextPvd.MEDIA_USER_KEY);
		if (userid == null) {
			return Action.LOGIN;
		}

		// 判断用户是否具有页面权限
		ArrayList<Permission> menusList = new ArrayList<Permission>();
		Map contextMap = ctx.getContextMap();
		HttpServletRequest req1 = (HttpServletRequest) contextMap
				.get("com.opensymphony.xwork2.dispatcher.HttpServletRequest");
		String requestURI = req1.getRequestURI();
		
		int str1p = requestURI.indexOf("/",2);	
		String newRequestURI = requestURI.substring(str1p);
		
		//log.info("requestURI=" + requestURI);
		//log.info("newRequestURI=" + newRequestURI);
		
		//EwjMediaUser mUser = ewjMediaUserSrv.findById(userid);
		Set<Permission> menus = null;
		Iterator<Permission> menuItr = menus.iterator();
		while (menuItr.hasNext()) {
			Permission menu1 = menuItr.next();
			menusList.add(menu1);
		}
		
		Set<Role> roles = null;
		Iterator<Role> roleItr = roles.iterator();
		while (roleItr.hasNext()) {
			Role role1 = roleItr.next();
			Set<Permission> menuSet = null; //..
			Iterator<Permission> menuItr2 = menuSet.iterator();
			while (menuItr2.hasNext()) {
				Permission menu3 = menuItr2.next();
				menusList.add(menu3);
			}
		}
		
		boolean isExist = false; 
		Iterator<Permission> menuItr3 = menusList.iterator();
		while (menuItr3.hasNext()){
			Permission menu4 = menuItr3.next();
			//log.info("getId=" + menu4.getId() + ", getMenuName ="+menu4.getMenuName() + ", getSource ="+menu4.getSource());
			if (newRequestURI.equals(menu4.getSource())) {
				isExist = true;
			}
		}		
		//无权访问
		if (!isExist) {
			return "refuseAccess";
		}

		return invocation.invoke();
	}

}
