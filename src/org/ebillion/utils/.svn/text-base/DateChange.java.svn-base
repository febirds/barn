package org.ebillion.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 用于数字类型和时间格式相互转换 应用于和php系统的日期字段转换(精确到秒、去掉毫秒)
 * 
 * @author Administrator
 * 
 */

public class DateChange {
	/**
	 * int转换为Date
	 * 
	 * @param time
	 * @return
	 */
	public static Date intToTime(int time) {
		return longToTime(Long.valueOf(time + "000"), null);
	}

	public static String dateToString(Date date) {
		return date.toString().replace("-", ".");
	}

	public static void main(String[] args) throws Exception {
		String date = "2015-01-01";
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		Date d = sd.parse(date);
		System.out.println(d.getTime() / 1000);

		// System.out.println(DataTime.dateToString(new Date()));
	}

	public static int timeToInt(String time) {
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		Date d = null;
		try {
			d = sd.parse(time);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (int) d.getTime() / 1000;
	}

	public static int timeToInt() {
		return Integer.valueOf(String.valueOf(System.currentTimeMillis())
				.substring(0, 10));
	}

	/**
	 * long转换为Date
	 * 
	 * @param time
	 * @param format
	 * @return
	 * @throws Exception
	 */
	public static Date longToTime(long time, String format) {
		if (format == null)
			format = "yyyy-MM-dd";
		SimpleDateFormat s = new SimpleDateFormat(format);
		Date date = new Date(time);
		return java.sql.Date.valueOf(s.format(date));
	}

	/**
	 * Date转换为int
	 * 
	 * @param date
	 * @return
	 */
	public static int timeToInt(Date date) {
		return Integer.valueOf("" + timeToLong(date));
	}

	/**
	 * int转换为Date
	 * 
	 * @param date
	 * @return
	 */
	public static long timeToLong(Date date) {
		if (date == null)
			return 0;
		return date.getTime() / 1000;
	}

	/**
	 * 得到传入日期的格式字符
	 * 
	 * @param date
	 * @param format
	 * @return
	 */
	public static String getDateStr(Date date, String format) {
		SimpleDateFormat s = new SimpleDateFormat(format);
		return s.format(date);
	}
	
	/*
	 * 设置时间格式
	 */
	public static String setDateTime(String date, String format){
		try{
			if(date.getBytes().length != date.length()){
				return date;
			}else{
				System.out.println(date);
				SimpleDateFormat s = new SimpleDateFormat(format);
				long di;
				Date d = null;
				try{
					if(date != null){
						di = Long.valueOf(date + "000");
						d = new Date(di);
					}
					return s.format(d);
				}catch(NumberFormatException e){
	
					return date;
				}
			}
		}catch(NullPointerException e){
				return "";
		}
	}

}
