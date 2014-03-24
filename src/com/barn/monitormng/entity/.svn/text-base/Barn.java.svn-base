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
public class Barn extends BaseEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1033801196721734209L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", 
			unique = true, 
			nullable = false)
	private Integer id;
	
	@Column(unique = true, 
			nullable = false, 
			length = 20)
	private String barnCode;// 仓号
	
	@Column(length = 20)
	private String barnName;// 名称
	
	@Column(length = 20)
	private String country; // 国家
	
	@Column(length = 20)
	private String province; // 省份、特区
	
	@Column(length = 20)
	private String city; //市、地区
	
	@Column(length = 20)
	private String county; //县、区
	
	@Column(length = 100)
	private String address; //详细地址
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="admin") //粮仓管理员
	private User admin;
	
	@Column
	private Date createDate;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="createUser")
	private User createUser;
	
	@Column
	private Date updateDate;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="updateUser")
	private User updateUser;
	
	@Column
	private Boolean enable;
	
	@Column
	private Integer version;
	
	@Column(name = "memo", length = 255)
	private String memo;


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Date getCreateDate() {
		return createDate;
	}


	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}


	public User getCreateUser() {
		return createUser;
	}


	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}


	public Date getUpdateDate() {
		return updateDate;
	}


	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}


	public User getUpdateUser() {
		return updateUser;
	}


	public void setUpdateUser(User updateUser) {
		this.updateUser = updateUser;
	}


	public Boolean getEnable() {
		return enable;
	}


	public void setEnable(Boolean enable) {
		this.enable = enable;
	}


	public Integer getVersion() {
		return version;
	}


	public void setVersion(Integer version) {
		this.version = version;
	}


	public String getMemo() {
		return memo;
	}


	public void setMemo(String memo) {
		this.memo = memo;
	}

	

	public String getBarnCode() {
		return barnCode;
	}


	public void setBarnCode(String barnCode) {
		this.barnCode = barnCode;
	}


	public String getBarnName() {
		return barnName;
	}


	public void setBarnName(String barnName) {
		this.barnName = barnName;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public String getProvince() {
		return province;
	}


	public void setProvince(String province) {
		this.province = province;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getCounty() {
		return county;
	}


	public void setCounty(String county) {
		this.county = county;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}
	
	
	public User getAdmin() {
		return admin;
	}

	public void setAdmin(User admin) {
		this.admin = admin;
	}


	@Override
	public String toString() {
		return "Barn#" + hashCode();
	}
	
}
