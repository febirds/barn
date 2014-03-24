package com.barn.admin.action;

import java.util.Properties;

import org.ebillion.common.action.BaseAction;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@SuppressWarnings("serial")
@Scope("prototype")
@Controller("admin.adminConsoleAct")
public class AdminConsoleAct extends BaseAction {
	

	public String right() {
		props = System.getProperties();
		freeMemoery = Runtime.getRuntime().freeMemory();
		totalMemory = Runtime.getRuntime().totalMemory();
		return null;
	}
	
	public String home() {
		props = System.getProperties();
		freeMemoery = Runtime.getRuntime().freeMemory();
		totalMemory = Runtime.getRuntime().totalMemory();
		return "home";
	}

	private Properties props;
	private long freeMemoery;
	private long totalMemory;
	private boolean pwdWarn = false;	
	private String zhName;
	
	public String getZhName() {
		return zhName;
	}

	public void setZhName(String zhName) {
		this.zhName = zhName;
	}

	public Properties getProps() {
		return props;
	}

	public void setProps(Properties props) {
		this.props = props;
	}

	public long getFreeMemoery() {
		return freeMemoery;
	}

	public void setFreeMemoery(long freeMemoery) {
		this.freeMemoery = freeMemoery;
	}

	public long getTotalMemory() {
		return totalMemory;
	}

	public void setTotalMemory(long totalMemory) {
		this.totalMemory = totalMemory;
	}

	public boolean isPwdWarn() {
		return pwdWarn;
	}

	public void setPwdWarn(boolean pwdWarn) {
		this.pwdWarn = pwdWarn;
	}
}
