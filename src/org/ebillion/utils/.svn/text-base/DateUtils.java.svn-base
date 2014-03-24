package org.ebillion.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	private static SimpleDateFormat sdf = null;

	public static String getStringLongDate(Date date) {
		return "" + date.getTime();
	}

	/**
	 * 格式日期:yyyyMMddHHmmss
	 * @param date
	 * @return dateString
	 */
	public static String getStringDateAsYYYYMMDDHHMMSS(Date date) {
		sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		return sdf.format(date);
	}
	/**
	 * 格式日期:yyyy-MM-dd HH:mm:ss
	 * @param date
	 * @return dateString
	 */
	public static String getStringDateAsYYYY_MM_DD_HH_MM_SS(Date date) {
		 sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
	
	/**
	 * 格式日期:yyyy-MM-dd
	 * @param date 
	 * @return dateString
	 */
	public static String getStringDateAsYYYY_MM_DD(Date date) {
		sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}
	/**
	 * 格式日期:HHmmss
	 * @param date 
	 * @return dateString
	 */
	public static String getStringTimeAsHHMMSS(Date date) {
		sdf = new SimpleDateFormat("HHmmss");
		return sdf.format(date);
	}
	public static Date getDateParseYYYY_MM_DD(String date) {
		sdf = new SimpleDateFormat("yyyy-MM-dd");
		if (date == null || "".equals(date)) {
			return null;
		}
		try {
			return sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}	
	
	public static void main(String[] args) {
		System.out.println(getStringDateAsYYYYMMDDHHMMSS(new Date()));
		DateFormat df = DateFormat.getDateInstance();
		System.out.println(df.format(new Date()));;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		System.out.println(sdf.format(new Date()));
		System.out.println(getStringDateAsYYYY_MM_DD(new Date()).split("-")[0]);
	}
	
	
}
