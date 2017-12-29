package com.dao;

import com.entity.UserInfo;
import com.entity.Validate;

public interface UserDao {
	
	/**
	 * 登录
	 * @param userInfo
	 * @return
	 */
	public UserInfo findUserInfo(UserInfo userInfo);
	
	/**
	 * 检查手机号码是否存在
	 * @param userInfo
	 * @return
	 */
	public UserInfo findUserPhone(UserInfo userInfo);
	
	/**
	 * 注册
	 * @param userInfo
	 * @return
	 */
	public int insertUserInfo(UserInfo userInfo);
	
		/**
	 * 修改用户资料
	 * @param pic
	 * @return
	 */
	public int updateUser(UserInfo userInfo);
	
	/**
	 * 通过userId查询用户信息
	 * @param userInfo
	 * @return
	 */
	public UserInfo userById(UserInfo userInfo);
	
	/**
	 * 修改密码
	 * @param userInfo
	 * @return
	 */
	public int updatePw(UserInfo userInfo);
	
	/**
	 * 添加验证码
	 * @param userInfo
	 * @return
	 */
	public int addCode(Validate validate);
	
	
	/**
	 * 查询验证码
	 * @param validate
	 * @return
	 */
	public Validate findCode(Validate validate);
	
	/**
	 * 更改验证码状态
	 * @param validate
	 * @return
	 */
	public int updateCodeStatu(Validate validate);
	
}
