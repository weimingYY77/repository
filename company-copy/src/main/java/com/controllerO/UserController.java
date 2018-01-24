package com.controllerO;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.UserInfo;
import com.entity.Validate;
import com.service.UserService;

/**
 * 系统用户控制类
 * @author Administrator
 *
 */
@RequestMapping(value = "/UserController")
@Controller
public class UserController {

	@Resource
	private UserService userService;
	
	/**
	 * 用户登录控制
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/login.do")
	@ResponseBody
	public Map<String, Object> login(UserInfo userInfo,HttpServletRequest request) throws Exception{
		 UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		 UserInfo resultUser=userService.login(userInfo);
		 Map maps=new HashMap();
		 if(inspect!= null){
			 if(resultUser==null){
				 maps.put("code", 0010);//密码错误
				 maps.put("msg","密码错误");
			     maps.put("data",null);
			     return maps; 
			 }else{
				 maps.put("code", 0000);//成功
			     maps.put("msg","操作成功");
			     maps.put("data",resultUser);
			     return maps;
			 }
		 }else{
			 maps.put("code", 0020);//用户不存在
			 maps.put("msg","用户不存在！");
		     maps.put("data",null);
		     return maps;
		 }
	
	}	
	
	/*
	 * 注销登录
	 */
	@RequestMapping(value ="/off.do")
	public String off(HttpServletRequest request){
		
		return "";
		
	}
	
	/*
	 * 用户注册
	 */
	@RequestMapping(value="/insert.do")
	@ResponseBody
	public Map<String, Object> insert(UserInfo userInfo,Validate validate,HttpServletRequest request) throws Exception{
		
		UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		Map maps=new HashMap();
		if(inspect!=null){
			maps.put("code", 0010);
		    maps.put("msg","用户已存在");
		    return maps; 
		}else{
			String noseCode =  validate.getV_code().toString();//页面输入的验证码
			Validate resultV = userService.findCode(validate);
			String code = "";
			Date date=new Date();
			DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time=format.format(date.getTime());//系统时间
			String endTime = "";
			if(resultV!=null){
				code = resultV.getV_code().toString();//后台验证码
				endTime = resultV.getV_endTime();
			}
			if(noseCode.equals(code)){
					if(format.parse(time).getTime()<=format.parse(endTime).getTime()){
						int addUser = userService.insert(userInfo); //注册
						if(addUser<=0){
							maps.put("code", 0020);
						    maps.put("msg","注册失败");
						    return maps; 
						}else{
							UserInfo resultUser=userService.login(userInfo);
							maps.put("code", 0000);
						    maps.put("msg","操作成功");
						    maps.put("data",resultUser);
						    return maps; 
						}
					}else{
						maps.put("code", 0030);
					    maps.put("msg","验证码失效，请重新获取！");
					    return maps; 
					}
			}else{
				maps.put("code", 0040);
			    maps.put("msg","验证码错误！");
			    return maps; 
			}
		}
	}
	
	/*
	 * 判断用户是否存在
	 */
	@RequestMapping(value="/isPhone.do")
	@ResponseBody
	public int isPhone(UserInfo userInfo) throws Exception{
		UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		if(inspect!=null){
			return 1; //用户存在
		}else{
			return 2; //用户不存在
		}
	}
	
	/*
	 * 修改用户资料
	 */
	@RequestMapping(value="/updateUser.do")
	@ResponseBody
	public Map<String, Object> updateUser(UserInfo userInfo) throws Exception{
		int update = userService.updateUser(userInfo);
		Map maps=new HashMap();
		if(update<=0){
			maps.put("code", 0020);
			maps.put("msg","更新失败！");
			maps.put("data",null);
		    return maps;
		}else{
			UserInfo userById = userService.userById(userInfo);
			maps.put("code", 0000);
			maps.put("msg","保存成功！");
			 maps.put("data",userById);
		    return maps;
		}
	}
	
	/*
	 * 通过userId查询用户信息
	 */
	@RequestMapping(value="/userById.do")
	@ResponseBody
	public Map<String, Object> userById(UserInfo userInfo) throws Exception{
		UserInfo userById = userService.userById(userInfo);
		Map maps=new HashMap();
		if(userById==null){
			 maps.put("code", 0020);
			 maps.put("msg","用户不存在！");
		     maps.put("data",null);
		     return maps;
		}else{
			 maps.put("code", 0000);//成功
			 maps.put("msg","操作成功！");
		     maps.put("data",userById);
		     return maps;
		}
	}
	
	
	/*
	 * 修改密码
	 */
	@RequestMapping(value="/updatePw.do")
	@ResponseBody
	public Map<String, Object> updatePw(UserInfo userInfo) throws Exception{
		int update = userService.updatePw(userInfo);
		Map maps=new HashMap();
		if(update<=0){
			 maps.put("code", 0010);
			 maps.put("msg","修改失败！");
		     return maps;
		}else{
			 maps.put("code", 0000);//成功
			 maps.put("msg","修改成功！");
		     return maps;
		}
	}
	
	/*
	 * 发送短信，以及添加验证码
	 */
	@RequestMapping(value="/addCode.do")
	@ResponseBody
	public Map<String, Object> addCode(Validate validate,UserInfo userInfo) throws Exception{
		Map maps=new HashMap();
		Integer update = -1;
		Integer code = (int)((Math.random()*9+1)*100000);
		UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		if(inspect== null){
			String sms = userService.sendSms(validate.getU_phoneNum(), code);
			if("ok".equals(sms)){
				Date date=new Date();
				DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String startTime=format.format(date.getTime());
				validate.setV_startTime(startTime);
				String endTime = format.format(date.getTime()+5*60*1000);
				validate.setV_endTime(endTime);
				validate.setV_code(code);
				update = userService.addCode(validate);
			}
			if(update<=0){
				maps.put("code", 0020);
				maps.put("msg","短信发送失败！");
			    return maps;
			}else{
				maps.put("code", 0000);
				maps.put("msg","短信发送成功！");
			    return maps;
			}
		}else{
			 maps.put("code", 0030);//用户不存在
			 maps.put("msg","用户已存在！");
		     return maps;
		}
	}
	
	/*
	 * 忘记密码验证码
	 * 发送短信，以及添加验证码
	 */
	@RequestMapping(value="/sfpCode.do")
	@ResponseBody
	public Map<String, Object> sfpCode(Validate validate,UserInfo userInfo) throws Exception{
		Map maps=new HashMap();
		Integer update = -1;
		Integer code = (int)((Math.random()*9+1)*100000);
		UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		if(inspect!= null){
			String sms = userService.sendSms(validate.getU_phoneNum(), code);//发送短信
			if("ok".equals(sms)){
				Date date=new Date();
				DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String startTime=format.format(date.getTime());
				validate.setV_startTime(startTime);
				String endTime = format.format(date.getTime()+5*60*1000);
				validate.setV_endTime(endTime);
				validate.setV_code(code);
				update = userService.addCode(validate);
			}
			if(update<=0){
				maps.put("code", 0020);
				maps.put("msg","短信发送失败！");
			    return maps;
			}else{
				maps.put("code", 0000);
				maps.put("msg","短信发送成功！");
			    return maps;
			}
		}else{
			 maps.put("code", 0030);//用户不存在
			 maps.put("msg","用户不存在！");
		     return maps;
		}
	}
	
	/*
	 * 忘记密码验证是否成功
	 */
	@RequestMapping(value="/verification.do")
	@ResponseBody
	public Map<String, Object> verification(UserInfo userInfo,Validate validate) throws Exception{
		
		UserInfo inspect = userService.inspect(userInfo); //判断用户是否存在
		Map maps=new HashMap();
		if(inspect==null){
			maps.put("code", 0010);
		    maps.put("msg","用户不存在");
		    return maps; 
		}else{
			String noseCode =  validate.getV_code().toString();//页面输入的验证码
			Validate resultV = userService.findCode(validate);
			String code = "";
			Date date=new Date();
			DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time=format.format(date.getTime());//系统时间
			String endTime = "";
			Integer codeStatu = -1;
			if(resultV!=null){
				code = resultV.getV_code().toString();//后台验证码
				endTime = resultV.getV_endTime();
				codeStatu = resultV.getV_statu();//验证码状态
			}
			if(codeStatu==0){
				if(noseCode.equals(code)){
						if(format.parse(time).getTime()<=format.parse(endTime).getTime()){
							int updateCodeStatu = userService.updateCodeStatu(resultV); //修改验证码状态
							if(updateCodeStatu>0){
								maps.put("code", 0000);
								maps.put("msg","操作成功！");
								maps.put("data", inspect);
								return maps; 
							}else{
								maps.put("code", 0020);
								maps.put("msg","验证码状态修改失败！");
								return maps; 
							}
						}else{
							maps.put("code", 0030);
						    maps.put("msg","验证码失效，请重新获取！");
						    return maps; 
						}
				}else{
					maps.put("code", 0040);
				    maps.put("msg","验证码错误！");
				    return maps; 
				}
			}else{
				maps.put("code", 0050);
			    maps.put("msg","验证码已被使用，请重新获取！");
			    return maps;
			}
		}
	}
	
}
