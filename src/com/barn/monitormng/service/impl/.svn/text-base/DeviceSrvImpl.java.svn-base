package com.barn.monitormng.service.impl;

import org.ebillion.common.hibernate.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.barn.monitormng.dao.DeviceDao;
import com.barn.monitormng.entity.Device;
import com.barn.monitormng.service.DeviceSrv;

@Service
@Transactional
public class DeviceSrvImpl extends BaseServiceImpl<Device> implements DeviceSrv {
	
	protected DeviceDao getDao() {
		return (DeviceDao) super.getDao();
	}

	@Autowired
	public void setDao(DeviceDao dao) {
		super.setDao(dao);
	}
}
