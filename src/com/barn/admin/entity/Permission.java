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
 * EwjMediaMenu entity. @author MyEclipse Persistence Tools
 */
@Entity
public class Permission extends BaseEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7034994829383151815L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", 
			unique = true, 
			nullable = false)
	private Integer id;
	
	@ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH }, optional = true)  
    @JoinColumn(name="parentPermission")
	private Permission parentPermission;
	
	@Column(name = "permissionName",
			unique = true,
			nullable = false,
			length = 20)
	private String permissionName;
	
	@Column
	private Integer permissionType;
	
	@Column
	private Integer orders; // 排序字段
	
	@Column
	private String url;
	
	@Column
	private Boolean isMenu;
	
	@Column
	private String source;
	
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
    @JoinTable(name = "roleperm", 
    		inverseJoinColumns = @JoinColumn(name = "roleId"), 
    		joinColumns = @JoinColumn(name = "permissionId")) 
    		//JoinTable就是定义中间表的名字以及关联字段名  
	private Set<Role> roles; 
	
	

	/** default constructor */
	public Permission() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPermissionName() {
		return permissionName;
	}

	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}

	public Integer getPermissionType() {
		return permissionType;
	}

	public void setPermissionType(Integer permissionType) {
		this.permissionType = permissionType;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Permission getParentPermission() {
		return parentPermission;
	}

	public void setParentPermission(Permission parentPermission) {
		this.parentPermission = parentPermission;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	

	public Boolean getIsMenu() {
		return isMenu;
	}

	public void setIsMenu(Boolean isMenu) {
		this.isMenu = isMenu;
	}
	
	public Integer getorders() {
		return orders;
	}

	public void setorders(Integer orders) {
		this.orders = orders;
	}
	
	public Permission(Integer id, Permission parentPermission,
			String permissionName, Integer permissionType, Integer orders,
			String url, Boolean isMenu, String source, Date createDate,
			User createUser, Date updateDate, User updateUser, Boolean enable,
			Integer version, String memo, Set<Role> roles) {
		super();
		this.id = id;
		this.parentPermission = parentPermission;
		this.permissionName = permissionName;
		this.permissionType = permissionType;
		this.orders = orders;
		this.url = url;
		this.isMenu = isMenu;
		this.source = source;
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
		return "Permission#" + this.hashCode();
	}
}