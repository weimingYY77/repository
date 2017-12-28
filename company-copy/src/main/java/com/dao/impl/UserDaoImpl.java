package com.dao.impl;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;

import com.aliyun.api.gateway.demo.SmsDemo;
import com.aliyuncs.exceptions.ClientException;
import com.dao.UserDao;
import com.entity.UserInfo;
import com.entity.Validate;

public class UserDaoImpl implements UserDao {

	@Resource
	private SqlSessionTemplate sqlSessionTemplate;  //工厂session
	
	/**
	 * 登录
	 * @param userInfo
	 * @return
	 */
	public UserInfo findUserInfo(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectOne("com.dao.UserDao.findUserInfo",userInfo);
	}

	/**
	 * 检查手机号码是否存在
	 * @param userInfo
	 * @return
	 */
	public UserInfo findUserPhone(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectOne("com.dao.UserDao.findUserPhone", userInfo);
	}

	/**
	 * 注册
	 * @param userInfo
	 * @return
	 */
	public int insertUserInfo(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.insert("com.dao.UserDao.insertUserInfo",userInfo);
	}

	/**
	 * 修改用户资料
	 * @param pic
	 * @return
	 */
	public int updateUser(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.update("com.dao.UserDao.updateUser",userInfo);
	}

	/**
	 * 修改密码
	 * @param userInfo
	 * @return
	 */
	@Override
	public int updatePw(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.update("com.dao.UserDao.updatePw",userInfo);
	}

	/**
	 * 通过userId查询用户信息
	 * @param userInfo
	 * @return
	 */
	@Override
	public UserInfo userById(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectOne("com.dao.UserDao.userById",userInfo);
	}

	/**
	 * 添加验证码
	 * @param userInfo
	 * @return
	 */
	@Override
	public int addCode(Validate validate) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.insert("com.dao.UserDao.addCode",validate);
	}

	/**
	 * 查询验证码
	 * @param validate
	 * @return
	 */
	@Override
	public Validate findCode(Validate validate) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectOne("com.dao.UserDao.findCode",validate);
	}

	/**
	 * 更改验证码状态
	 * @param validate
	 * @return
	 */
	@Override
	public int updateCodeStatu(Validate validate) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.update("com.dao.UserDao.updateCodeStatu",validate);
	}

}
