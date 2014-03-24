package com.barn.monitormng.service.impl;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.monitormng.dao.DeviceIndexDao;
import com.barn.monitormng.entity.DeviceIndex;
import com.barn.monitormng.service.DeviceIndexSrv;

@Service
@Transactional
public class DeviceIndexSrvImpl extends BaseServiceImpl<DeviceIndex> implements
		DeviceIndexSrv {

	protected DeviceIndexDao getDao() {
		return (DeviceIndexDao) super.getDao();
	}

	@Autowired
	public void setDao(DeviceIndexDao dao) {
		super.setDao(dao);
	}

}
