package com.barn.monitormng.dao.impl;

import org.ebillion.common.hibernate.BaseDaoImpl;
import org.springframework.stereotype.Repository;

import com.barn.monitormng.dao.BarnDao;
import com.barn.monitormng.entity.Barn;

@Repository
public class BarnDaoImpl extends BaseDaoImpl<Barn> implements BarnDao {
}
