package com.dao;

public interface ValidateDao {

	/**
	 * 发送短信
	 * @param phoneNum
	 * @param code
	 * @return
	 */
	public String sendSms(String phoneNum,Integer code);
}
