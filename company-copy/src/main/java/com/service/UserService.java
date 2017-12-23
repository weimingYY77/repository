package com.service;

import com.entity.UserInfo;
import com.entity.Validate;

public interface UserService {

	/**
	 * 登录
	 * @param userInfo
	 * @return
	 */
	public UserInfo login(UserInfo userInfo);
	
	/**
	 * 注册
	 * @param userInfo
	 * @return
	 */
	public int insert(UserInfo userInfo);
	
	/**
	 * 检查手机号码是否存在
	 * @param userInfo
	 * @return
	 */
	public UserInfo inspect(UserInfo userInfo);
	
	/**
	 * 修改用户资料
	 * @param pic
	 * @return
	 */
	public int updateUser(UserInfo userInfo);
	
	/**
	 * 修改密码
	 * @param userInfo
	 * @return
	 */
	public int updatePw(UserInfo userInfo);
	
	/**
	 * 通过userId查询用户信息
	 * @param userInfo
	 * @return
	 */
	public UserInfo userById(UserInfo userInfo);
	
	/**
	 * 添加验证码
	 * @param validate
	 * @return
	 */
	public int addCode(Validate validate);
	
	/**
	 * 发送短信
	 * @param phoneNum
	 * @param code
	 * @return
	 */
	public String sendSms(String phoneNum,Integer code);
	
	/**
	 * 查询验证码
	 * @param validate
	 * @return
	 */
	public Validate findCode(Validate validate);
	
}
