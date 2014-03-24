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
 * EwjMediaRole entity. @author MyEclipse Persistence Tools
 */
@Entity
public class Role extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1292647697976777977L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", 
			unique = true, 
			nullable = false)
	private Integer id;
	
	@Column(name = "roleName",
			unique = true,
			nullable = false,
			length = 20)
	private String roleName;
	
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
	
	@ManyToMany(cascade = CascadeType.REFRESH)  
    @JoinTable(name = "userrole", 
    		inverseJoinColumns = @JoinColumn(name = "userId"), 
    		joinColumns = @JoinColumn(name = "roleId")) 
    		//JoinTable就是定义中间表的名字以及关联字段名
	private Set<User> users;
	
	@ManyToMany(cascade = CascadeType.REFRESH)  
    @JoinTable(name = "roleperm", 
    		inverseJoinColumns = @JoinColumn(name = "permissionId"), 
    		joinColumns = @JoinColumn(name = "roleId")) 
    		//JoinTable就是定义中间表的名字以及关联字段名
	private Set<Permission> permissions;

	/** default constructor */
	public Role() {
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
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


	public Set<User> getUsers() {
		return users;
	}


	public void setUsers(Set<User> users) {
		this.users = users;
	}


	public Set<Permission> getPermissions() {
		return permissions;
	}


	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}


	public Role(Integer id, String roleName, Date createDate, User createUser,
			Date updateDate, User updateUser, Boolean enable, Integer version,
			String memo, Set<User> users, Set<Permission> permissions) {
		super();
		this.id = id;
		this.roleName = roleName;
		this.createDate = createDate;
		this.createUser = createUser;
		this.updateDate = updateDate;
		this.updateUser = updateUser;
		this.enable = enable;
		this.version = version;
		this.memo = memo;
		this.users = users;
		this.permissions = permissions;
	}

	public String toString() {
		return "Role#" + this.hashCode();
	}
}