package com.barn.admin.dao.impl;

import org.ebillion.common.hibernate.BaseDaoImpl;
import org.springframework.stereotype.Repository;

import com.barn.admin.dao.UserDao;
import com.barn.admin.entity.User;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements
		UserDao {
	public User getUserByLoginName(String loginName) {
		String hql = "from EcsAdminUser au where au.userName=?";
		return (User) findUnique(hql, loginName);
	}
	
	@Override
	public User getByName(String userName) {
		String hql = "from EcsAdminUser where userName = '" + userName + "'";
		return (User) this.getSession().createQuery(hql).uniqueResult();
	}
}
