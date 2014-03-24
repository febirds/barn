package org.ebillion.common.entity;

public class LabelValue {

	private Object label;
	private Object value;

	public Object getLabel() {
		return label;
	}

	public void setLabel(Object label) {
		this.label = label;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public LabelValue(Object label, Object value) {
		super();
		this.label = label;
		this.value = value;
	}

	public LabelValue() {
		super();
	}

	public static LabelValue[] createLabelValues(Object[] labels,
			Object[] values) throws Exception {
		if (labels.length == values.length) {
			LabelValue[] lvs = new LabelValue[labels.length];
			for (int i = 0; i < lvs.length; i++) {
				lvs[i] = new LabelValue(labels[i], values[i]);				
			}
			return lvs;
		}
		else {
			throw new Exception("LabelValue错误：labels长度和values长度不一致！");
		}
	}
}
