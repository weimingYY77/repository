package com.dao.impl;

import com.aliyun.api.gateway.demo.SmsDemo;
import com.aliyuncs.exceptions.ClientException;
import com.dao.ValidateDao;

public class ValidateDaoImpl implements ValidateDao {

	/**
	 * 发送短信
	 * @param phoneNum
	 * @param code
	 * @return
	 */
	@Override
	public String sendSms(String phoneNum, Integer code) {
		// TODO Auto-generated method stub
		
		SmsDemo sms = new SmsDemo();
		try {
			sms.sendSms(phoneNum, code);
		} catch (ClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "ok";
	}

}
