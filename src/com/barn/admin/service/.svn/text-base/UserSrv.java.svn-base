package com.barn.admin.service;

import org.ebillion.common.hibernate.BaseService;

import com.barn.admin.entity.User;

public interface UserSrv   extends BaseService<User>{
	/**
	 * 认证。并返回用户对象。认证失败抛出异常。
	 * 
	 * @param loginName
	 * @param password
	 * @return
	 */
	User authenticate(String loginName, String password);
	/**
	 * 检查email是否已经被使用
	 * 
	 * @param email
	 * @return true：没有被使用；false：已经被使用
	 */
	public boolean checkEmail(String email);
	
	/**
	 * 检查登录名是否已经被注册
	 * 
	 * @param loginName
	 * @return true：没有被注册；false：已经被注册
	 */	
	boolean checkLoginName(String username);
}
