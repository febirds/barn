package com.barn.admin.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.ebillion.common.entity.BaseEntity;

/**
 * EcsAdminUser entity. @author MyEclipse Persistence Tools
 */
@Entity
public class User extends BaseEntity {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -8623484968538537651L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", 
			unique = true, 
			nullable = false)
	private Integer id;
	
	@Column(name = "logName",
			unique = true,
			nullable = false,
			length = 20)
	private String logName;
	
	@Column(name = "password",
			nullable = false,
			length = 20)
	private String password;
	
	@Column(name = "zhName", length = 20)
	private String zhName;
	
	@Column(name = "email", length = 20)
	private String email;
	
	@Column(name = "lastLogIp", length = 25)
	private String lastLogIp;
	
	@Column
	private Boolean isAdmin;
	
	@Column(name = "lastUrl", length = 255)
	private String lastUrl;
	
	@Column
	private Date lastLogDate;
	
	@Column
	private Date createDate;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="createUser")
    //这里设置JoinColum设置了外键的名字，并且orderItem是关系维护端
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
	
	@ManyToMany(cascade = CascadeType.REFRESH)  
    @JoinTable(name = "userrole", 
    		inverseJoinColumns = @JoinColumn(name = "roleId"), 
    		joinColumns = @JoinColumn(name = "userId")) 
    		//JoinTable就是定义中间表的名字以及关联字段名  
	private Set<Role> roles; 

	
	/** default constructor */
	public User() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogName() {
		return logName;
	}

	public void setLogName(String logName) {
		this.logName = logName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getZhName() {
		return zhName;
	}

	public void setZhName(String zhName) {
		this.zhName = zhName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getLastLogDate() {
		return lastLogDate;
	}

	public void setLastLogDate(Date lastLogDate) {
		this.lastLogDate = lastLogDate;
	}

	public String getLastLogIp() {
		return lastLogIp;
	}

	public void setLastLogIp(String lastLogIp) {
		this.lastLogIp = lastLogIp;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public String getLastUrl() {
		return lastUrl;
	}

	public void setLastUrl(String lastUrl) {
		this.lastUrl = lastUrl;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
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
	
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public User(Integer id, String logName, String password, String zhName,
			String email, String lastLogIp, Boolean isAdmin, String lastUrl,
			Date lastLogDate, Date createDate, User createUser,
			Date updateDate, User updateUser, Boolean enable,
			Integer version, String memo, Set<Role> roles) {
		super();
		this.id = id;
		this.logName = logName;
		this.password = password;
		this.zhName = zhName;
		this.email = email;
		this.lastLogIp = lastLogIp;
		this.isAdmin = isAdmin;
		this.lastUrl = lastUrl;
		this.lastLogDate = lastLogDate;
		this.createDate = createDate;
		this.createUser = createUser;
		this.updateDate = updateDate;
		this.updateUser = updateUser;
		this.enable = enable;
		this.version = version;
		this.memo = memo;
		this.roles = roles;
	}

	public String toString() {
		return "User#" + this.hashCode();
	}
}