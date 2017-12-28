package com.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.UserDao;
import com.dao.ValidateDao;
import com.dao.impl.ValidateDaoImpl;
import com.entity.UserInfo;
import com.entity.Validate;
import com.service.UserService;

@Repository("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;
	
	
	/**
	 * 登录
	 * @param userInfo
	 * @return
	 */
	public UserInfo login(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.findUserInfo(userInfo);
	}

	/**
	 * 注册
	 * @param userInfo
	 * @return
	 */
	public int insert(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.insertUserInfo(userInfo);
	}

	/**
	 * 检查手机号码是否存在
	 * @param userInfo
	 * @return
	 */
	public UserInfo inspect(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.findUserPhone(userInfo);
	}

	/**
	 * 修改用户资料
	 * @param pic
	 * @return
	 */
	public int updateUser(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.updateUser(userInfo);
	}

	/**
	 * 修改密码
	 * @param userInfo
	 * @return
	 */
	@Override
	public int updatePw(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.updatePw(userInfo);
	}

	/**
	 * 通过userId查询用户信息
	 * @param userInfo
	 * @return
	 */
	@Override
	public UserInfo userById(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userDao.userById(userInfo);
	}

	/**
	 * 添加验证码
	 * @param validate
	 * @return
	 */
	@Override
	public int addCode(Validate validate) {
		// TODO Auto-generated method stub
		return userDao.addCode(validate);
	}

	/**
	 * 发送短信
	 * @param phoneNum
	 * @param code
	 * @return
	 */
	@Override
	public String sendSms(String phoneNum, Integer code) {
		// TODO Auto-generated method stub
		ValidateDao validateDao = new ValidateDaoImpl();
		return validateDao.sendSms(phoneNum, code);
	}

	/**
	 * 查询验证码
	 * @param validate
	 * @return
	 */
	@Override
	public Validate findCode(Validate validate) {
		// TODO Auto-generated method stub
		return userDao.findCode(validate);
	}

	
	@Override
	public int updateCodeStatu(Validate validate) {
		// TODO Auto-generated method stub
		return userDao.updateCodeStatu(validate);
	}

}
