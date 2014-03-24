package org.ebillion.right;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.ebillion.common.struts2.ContextPvd;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.context.support.WebApplicationContextUtils;

import com.barn.admin.entity.Permission;
import com.barn.admin.entity.Role;

public class AccessControlFilter implements Filter {
	private static Logger log = Logger
			.getLogger(AccessControlFilter.class);
	private boolean isControl;
	private static final String BEAN_NAME = "ewjMediaUserSrvImpl";

	public void init(FilterConfig filterConfig) throws ServletException {
		String control = filterConfig.getInitParameter("isControl");
		if ("false".equals(control)) {
			isControl = false;
		} else {
			isControl = true;
		}
		//WebApplicationContext wac = WebApplicationContextUtils
		//		.getRequiredWebApplicationContext(filterConfig
		//				.getServletContext());
	}

	@SuppressWarnings("unchecked")
	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) servletRequest;
		HttpServletResponse resp = (HttpServletResponse) servletResponse;
		HttpSession session = req.getSession(false);
		if (isControl) {
			if (session == null) {
				resp.sendRedirect(req.getContextPath() + "/no_login.html");
				return;
			}
			// 判断用户是否登录，session是否存在
			session = req.getSession();
			Integer userid = (Integer) session.getAttribute(ContextPvd.MEDIA_USER_KEY);
			if (userid == null) {
				resp.sendRedirect(req.getContextPath() + "/no_login.html");
				return;
			}

			// 判断用户是否具有页面权限
			ArrayList<Permission> menusList = new ArrayList<Permission>();

			String requestURI = req.getRequestURI();
			
			int str1p = requestURI.indexOf("/",2);	
			String newRequestURI = requestURI.substring(str1p);
			
			
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
				Set<Permission> menuSet = null; //...
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
				resp.sendRedirect(req.getContextPath() + "/no_login.html");
				return ;
			}

			chain.doFilter(servletRequest, servletResponse);
			return;
		} else {
			// 用于开发状态
			if (session == null) {
				session = req.getSession(true);
			}	
			chain.doFilter(servletRequest, servletResponse);
		}
	}

	private String getUrl(HttpServletRequest req) {
		String url = req.getRequestURI();
		String context = req.getContextPath();
		if (url.indexOf(".") != -1) {
			return url.substring(context.length(), url.indexOf("."));
		} else if (url.indexOf("?") != -1) {
			return url.substring(context.length(), url.indexOf("?"));
		} else {
			return url.substring(context.length());
		}
	}

	public void destroy() {
	}
}
