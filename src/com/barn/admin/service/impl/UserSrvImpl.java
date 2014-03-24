package com.barn.admin.service.impl;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.ebillion.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.admin.dao.UserDao;
import com.barn.admin.entity.User;
import com.barn.admin.service.UserSrv;

@Service
@Transactional
public class UserSrvImpl extends  BaseServiceImpl<User>
		implements UserSrv {
	private MD5 md5=new MD5();

	@Override
	public User authenticate(String loginName, String password) {
		User admin = getUserByLoginName(loginName);
		if (admin != null) {
			String md5Pwd = md5.getMD5ofStr(password);
			if (md5Pwd.equals(admin.getPassword())) {
				return admin;
			}
		}
		return null;
	}
	
	public User getUserByEmail(String email) {
		return getDao().findUniqueByProperty("email", email);
	}
	
	public boolean checkEmail(String email) {
		User u = getUserByEmail(email);
		return u == null ? true : false;
	}

	public User getUserByLoginName(String loginName) {
		User admin = getDao().getUserByLoginName(loginName);
		return admin;
	}
	
	@Autowired
	public void setDao(UserDao dao) {
		super.setDao(dao);
	}

	@Override
	public UserDao getDao() {
		return (UserDao) super.getDao();
	}

	@Override
	public boolean checkLoginName(String loginName) {
		User u = getUserByLoginName(loginName);
		return u == null ? true : false;
	}
	
}
