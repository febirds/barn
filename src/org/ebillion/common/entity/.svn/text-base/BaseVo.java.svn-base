package org.ebillion.common.entity;

import java.io.Serializable;

public abstract class BaseVo implements Serializable {
	/**
	 * 把属性和值组装字符窜。
	 */
	public abstract String toString();
	
	/**
	 * 得到主键的值
	 * @return
	 */
	public abstract Serializable getId();
	/**
	 * 实现两个对象的比较
	 * @return
	 */
	public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        BaseEntity other = (BaseEntity) obj;
        if (getId() == null) {
            if (other.getId() != null)
                return false;
        } else if (!getId().equals(other.getId()))
            return false;
        return true;
    }
}
