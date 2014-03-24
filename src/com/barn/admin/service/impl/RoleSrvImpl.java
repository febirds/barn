package com.barn.admin.service.impl;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.admin.dao.RoleDao;
import com.barn.admin.entity.Role;
import com.barn.admin.service.RoleSrv;

@Service
@Transactional
public class RoleSrvImpl extends BaseServiceImpl<Role>
		implements RoleSrv {

	
	
	

	
	@Override
	protected RoleDao getDao() {
		return (RoleDao) super.getDao();
	}
	@Autowired
	public void setDao(RoleDao dao) {
		super.setDao(dao);
	}
	
}
