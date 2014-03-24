package com.barn.monitormng.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.ebillion.common.entity.BaseEntity;

import com.barn.admin.entity.User;

@Entity
public class DeviceIndex extends BaseEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3236840964496994860L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", 
			unique = true, 
			nullable = false)
	private Integer id;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="device")
	private Device device;
	
	@Column
	private Double humidity; //湿度
	
	@Column
	private Double temperature; //温度
	
	@Column
	private Double consistency; //浓度
	
	@Column(updatable = false)
	private Date createDate;
	
	@Column(updatable = false)
	private Integer year;
	
	@Column(updatable = false)
	private Integer month;
	
	@Column(updatable = false)
	private Integer date;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="createUser")
	private User createUser;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	@SuppressWarnings("deprecation")
	public void setCreateDate(Date createDate) {
		year = createDate.getYear() + 1900;
		month = createDate.getMonth() + 1;
		date = createDate.getDate();
		
		this.createDate = createDate;
	}

	public User getCreateUser() {
		return createUser;
	}

	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}

		
	public Device getDevice() {
		return device;
	}

	public void setDevice(Device device) {
		this.device = device;
	}

	public Double getHumidity() {
		return humidity;
	}

	public void setHumidity(Double humidity) {
		this.humidity = humidity;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}

	public Double getConsistency() {
		return consistency;
	}

	public void setConsistency(Double consistency) {
		this.consistency = consistency;
	}

	@Override
	public String toString() {
		return "DeviceIndex#" + hashCode();
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getDate() {
		return date;
	}

	public void setDate(Integer date) {
		this.date = date;
	}

	public Date getUpdateDate() {
		return null;
	}

	public void setUpdateDate(Date updateDate) {
		
	}

	public User getUpdateUser() {
		return null;
	}

	public void setUpdateUser(User updateUser) {
	}
}
