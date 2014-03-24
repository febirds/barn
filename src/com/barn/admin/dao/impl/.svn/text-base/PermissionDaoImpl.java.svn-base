package com.barn.admin.dao.impl;

import java.util.List;

import org.ebillion.common.hibernate.BaseDaoImpl;
import org.springframework.stereotype.Repository;

import com.barn.admin.dao.PermissionDao;
import com.barn.admin.entity.Permission;

@Repository
public class PermissionDaoImpl extends BaseDaoImpl<Permission> implements
		PermissionDao {


	public List<Permission> getChildPermissions(Integer pid) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Permission> getPermissions(Integer userId) {
		String hql = "select m from EwjMediaPermission m where m.id in"
			+ " (select m1.id from EwjMediaUser u join u.ewjMediaRoles r join r.ewjMediaPermissions m1 where u.id = ?) or m.id in "
			+ " (select m2.id from EwjMediaUser u join u.ewjMediaPermissions m2 where u.id = ?)"
			+ " order by m.id asc";
	return find(hql, userId, userId);
	}

	@SuppressWarnings("unchecked")
	public List<Permission> getRootPermissions() {
		String hql = "from EwjMediaPermission m where m.ewjMediaPermission.id = 0 order by m.menuDefine1";
		return find(hql);
	}
		
}
