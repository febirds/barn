package com.barn.admin.dao;

import java.util.List;

import org.ebillion.common.hibernate.BaseDao;

import com.barn.admin.entity.Permission;

public interface PermissionDao extends BaseDao<Permission> {
	/**
	 * 获得用户权限
	 * 
	 * @param userId
	 * @return
	 */
	public List<Permission> getPermissions(Integer userId);


	/**
	 * 获得所有根节点
	 * 
	 * @return
	 */
	public List<Permission> getRootPermissions();

	/**
	 * 获得子节点
	 * 
	 * @param pid
	 * @return
	 */
	public List<Permission> getChildPermissions(Integer pid);
}
