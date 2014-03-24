package org.ebillion.common.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

public class ExtAction extends BaseAction{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 376765854837623697L;
	
	private static final Logger log = Logger.getLogger(ExtAction.class);
	
	/**
	 * 绕过Template,直接输出内容的简便函数.
	 */
	protected String render(String text, String contentType) {
		try {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType(contentType);
			response.getWriter().write(text);
			response.getWriter().flush();
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}
}
