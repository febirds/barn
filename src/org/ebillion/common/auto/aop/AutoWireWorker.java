package org.ebillion.common.auto.aop;

import java.util.Date;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.ebillion.common.auto.CreateDate;
import org.ebillion.common.auto.CreateUser;
import org.ebillion.common.auto.UpdateDate;
import org.ebillion.common.auto.UpdateUser;
import org.ebillion.common.struts2.ContextPvd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
//@Aspect
@SuppressWarnings("deprecation")
public class AutoWireWorker {
	private Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private ContextPvd contextPvd;

	@Before("execution(public * org.ebillion.common.hibernate.BaseDaoImpl.save*(..))")
	public void aotuWire(ProceedingJoinPoint invocation) throws Throwable {
		Object[] args = invocation.getArgs();
		log.info("********属性注入开始********");
		if (args != null && args.length > 0) {
			if (args[0] instanceof CreateDate) {
				setCreateDate((CreateDate) args[0]);
			}
			if (args[0] instanceof CreateUser) {
				setCreateUser((CreateUser) args[0]);
			}
			if (args[0] instanceof UpdateDate) {
				setUpdateDate((UpdateDate) args[0]);
			}
			if (args[0] instanceof UpdateUser) {
				setUpdateUser((UpdateUser) args[0]);
			}
		}
		
		log.info("********属性注入结束********");
	}

	private void setCreateDate(CreateDate entity) {
		if (entity.getCreateDate() == null) {
			entity.setCreateDate(new Date());
			log.info("自动注入 createDate:"
					+ entity.getCreateDate().toLocaleString());
		} else {
			log.info("createDate 不为空不自动注入");
		}
	}

	private void setCreateUser(CreateUser entity) {
		if (entity.getCreateUser() == null) {
			entity.setCreateUser(contextPvd.getLogUser());
			log.info("自动注入 createUser:" + entity.getCreateUser());
		} else {
			log.info("createUser 不为空不自动注入");
		}
	}

	private void setUpdateDate(UpdateDate entity) {
		if (entity.getUpdateDate() == null) {
			entity.setUpdateDate(new Date());
			log.info("自动注入 updateDate:"
					+ entity.getUpdateDate().toLocaleString());
		} else {
			log.info("updateDate 不为空不自动注入");
		}
	}

	private void setUpdateUser(UpdateUser entity) {
		if (entity.getUpdateUser() == null) {
			entity.setUpdateUser(contextPvd.getLogUser());
			log.info("自动注入 updateUser:" + entity.getUpdateUser());
		} else {
			log.info("updateUser 不为空不自动注入");
		}
	}
}
