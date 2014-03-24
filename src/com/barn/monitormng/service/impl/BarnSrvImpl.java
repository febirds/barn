package com.barn.monitormng.service.impl;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.monitormng.dao.BarnDao;
import com.barn.monitormng.entity.Barn;
import com.barn.monitormng.service.BarnSrv;


@Service
@Transactional
public class BarnSrvImpl extends BaseServiceImpl<Barn> implements BarnSrv {


	protected BarnDao getDao() {
		return (BarnDao) super.getDao();
	}

	@Autowired
	public void setDao(BarnDao dao) {
		super.setDao(dao);
	}
	
}
