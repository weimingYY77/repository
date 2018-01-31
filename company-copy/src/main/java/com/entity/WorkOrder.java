package com.entity;

/**
 * 工单实体类
 * @author Administrator
 *
 */
public class WorkOrder {
	private Integer wo_id;//工单编号
	private String wo_type;//工单类型
	private Integer wo_u_id;//操作人id
	private String wo_subtime;//提交时间
	private String wo_state;//工单状态
	private String wo_content;//工单内容
	public Integer getWo_id() {
		return wo_id;
	}
	public void setWo_id(Integer wo_id) {
		this.wo_id = wo_id;
	}
	public String getWo_type() {
		return wo_type;
	}
	public void setWo_type(String wo_type) {
		this.wo_type = wo_type;
	}
	public Integer getWo_u_id() {
		return wo_u_id;
	}
	public void setWo_u_id(Integer wo_u_id) {
		this.wo_u_id = wo_u_id;
	}
	public String getWo_subtime() {
		return wo_subtime;
	}
	public void setWo_subtime(String wo_subtime) {
		this.wo_subtime = wo_subtime;
	}
	public String getWo_state() {
		return wo_state;
	}
	public void setWo_state(String wo_state) {
		this.wo_state = wo_state;
	}
	public String getWo_content() {
		return wo_content;
	}
	public void setWo_content(String wo_content) {
		this.wo_content = wo_content;
	}
	
}
