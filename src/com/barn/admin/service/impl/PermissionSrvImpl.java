package com.barn.admin.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.admin.dao.PermissionDao;
import com.barn.admin.entity.Permission;
import com.barn.admin.service.PermissionSrv;

@Service
@Transactional
public class PermissionSrvImpl extends BaseServiceImpl<Permission>
		implements PermissionSrv {

	@Override
	public List<Permission> getChildPermissions(Integer pid) {
		
		return null;
	}


	@Override
	public Set<Permission> getPermissionItems(Integer userId) {
		
		return null;
	}
	@Override
	public Permission createRoot() {
		Permission menu = new Permission();
		menu.setId(0);
		//menu.setPermissionName("所有权限");
		//menu.setCreateTime(new Date());
		//menu.setMemuType(0);
		//menu.setPermissionState("0");
		//menu.setChild(new LinkedHashSet<EwjMediaPermission>(getDao().getRootPermissions()));
		return menu;
	}
	

	@Override
	public List<Permission> getPermissions(Integer userId) {
		return this.getDao().getPermissions(userId);
	}

	@Override
	public List<Permission> getRootPermissions() {
		
		return null;
	}

	@Autowired
	public void setDao(PermissionDao dao) {
		super.setDao(dao);
	}
	
	public PermissionDao getDao() {
		return (PermissionDao) super.getDao();
	}


	@Override
	public List<Permission> getAllPermissionsAsTree() {
		Set<Permission> permissions = new HashSet<Permission>(getDao().findAll());
		List<Permission> tree = new ArrayList<Permission>();
		while(permissions.size() > 0) {
			for (Iterator<Permission> it = permissions.iterator(); it.hasNext();) {
				Permission permission = (Permission) it.next();
				
			}
		}
		return null;
	}
	
	private Set<Permission>	getTree(Permission p, Iterator<Permission> it) {
		while (it.hasNext()) {
			Permission permission = (Permission) it.next();
			
		}
		
		return null;
	}
}
