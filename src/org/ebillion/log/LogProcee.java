package org.ebillion.log;

import java.lang.reflect.Array;


import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Repository;


@Repository
@Aspect
public class LogProcee {
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	@Around("execution(public * com.ebillion.*.service.*.*.*(..))")
	public Object logInfo(ProceedingJoinPoint invocation) throws Throwable {
		Signature signature = invocation.getSignature();
		Object[] args = invocation.getArgs();
		Object target = invocation.getTarget();
		log.info("log begin");
		log.info("service model：" + target.getClass().getName());
		log.info("execute method："	+ signature.getName());
		log.info("args：" + getObjectString(args));
		Object retVal = invocation.proceed();
		log.info("service model：" + target.getClass().getName() + " execute method："
				+ signature.getName() + " return value：" + getObjectString(retVal));
		log.info("log end");
		return retVal;
	}	
	
	
	@Around("execution(public * org.ebillion.common.hibernate.BaseServiceImpl.*(..))")
	public Object logBaseSrv(ProceedingJoinPoint invocation) throws Throwable {
		Signature signature = invocation.getSignature();
		Object[] args = invocation.getArgs();
		Object target = invocation.getTarget();
		log.info("log begin");
		log.info("service model：" + target.getClass().getName());
		log.info("execute method："	+ signature.getName());
		log.info("args：" + getObjectString(args));
		Object retVal = invocation.proceed();
		log.info("service model：" + target.getClass().getName() + " execute method："
				+ signature.getName() + " return value：" + getObjectString(retVal.toString()));
		log.info("log end");
		return retVal;
	}	

	private String getObjectString(Object o) {
		if(o == null) {
			log.error("no object");
		} else {
			String res = "" + o.toString();
			if(o != null && o.getClass().getName().contains("[")) {
				for (int i = 0; i < Array.getLength(o); i++) {
					res = res + "arg" + i + "-" +  this.getObjectString(Array.get(o, i));
				}
			}
			else {
				res = ReflectionToStringBuilder.toString(o);
			}
			return res;
		}
		
		
		return "";
	}
}
