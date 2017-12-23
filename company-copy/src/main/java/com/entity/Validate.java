package com.entity;

/**
 * 验证码实体类
 * @author Administrator
 *
 */
public class Validate {
	private Integer v_id;//验证id
	private String u_phoneNum;//手机号码
	private Integer v_code;//验证码
	private String v_startTime;//开始时间
	private String v_endTime;//结束时间
	public Integer getV_id() {
		return v_id;
	}
	public void setV_id(Integer v_id) {
		this.v_id = v_id;
	}
	public String getU_phoneNum() {
		return u_phoneNum;
	}
	public void setU_phoneNum(String u_phoneNum) {
		this.u_phoneNum = u_phoneNum;
	}
	public Integer getV_code() {
		return v_code;
	}
	public void setV_code(Integer v_code) {
		this.v_code = v_code;
	}
	public String getV_startTime() {
		return v_startTime;
	}
	public void setV_startTime(String v_startTime) {
		this.v_startTime = v_startTime;
	}
	public String getV_endTime() {
		return v_endTime;
	}
	public void setV_endTime(String v_endTime) {
		this.v_endTime = v_endTime;
	}
}
