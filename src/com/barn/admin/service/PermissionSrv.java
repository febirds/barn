package com.barn.admin.service;

import java.util.List;
import java.util.Set;

import org.ebillion.common.hibernate.BaseService;

import com.barn.admin.entity.Permission;

public interface PermissionSrv extends BaseService<Permission> {
	
	
	/**
	 * 获得系统所有权限，以树型结构返回
	 * 
	 * @return
	 */
	List<Permission> getAllPermissionsAsTree();
	
	/**
	 * 获得用户权限
	 * 
	 * @param userId
	 * @return
	 */
	List<Permission> getPermissions(Integer userId);

	/**
	 * 获得用户权限项集合
	 * 
	 * @param userId
	 * @return
	 */
	Set<Permission> getPermissionItems(Integer userId);

	/**
	 * 获得所有根节点
	 * 
	 * @return
	 */
	List<Permission> getRootPermissions();

	/**
	 * 获得子节点
	 * 
	 * @param pid
	 * @return
	 */
	List<Permission> getChildPermissions(Integer pid);
	/**
	 * 生成一个根节点
	 * @return
	 */
	Permission createRoot();
}
