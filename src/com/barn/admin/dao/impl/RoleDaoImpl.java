package com.barn.admin.dao.impl;

import org.ebillion.common.hibernate.BaseDaoImpl;
import org.springframework.stereotype.Repository;

import com.barn.admin.dao.RoleDao;
import com.barn.admin.entity.Role;

@Repository
public class RoleDaoImpl extends BaseDaoImpl<Role> implements
		RoleDao {

}
