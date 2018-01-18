package com.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.entity.UserInfo;
import com.service.StatisticsService;

/**
 * 统计控制类
 * @author Administrator
 *
 */
@RequestMapping(value = "/StatisticsController")
@Controller
public class StatisticsController {
	
	@Resource
	private StatisticsService statisticsService;
	
	/**
	 * 收录
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/include.do")
	@ResponseBody
	public Map<String, Object> include(String url,Map<String, String> params) throws Exception{
		 Map maps=new HashMap();
		 String urll = "http://api.k780.com:88";
		 Map<String, String> paramss = new LinkedHashMap<String, String>();
    	 paramss.put("app","entry.baidu");
    	 paramss.put("appkey","10003");
    	 paramss.put("sign","b59bc3ef6191eb9f747dd4e83c99f2a4");
    	 paramss.put("website","qzdzzj.com");
    	 paramss.put("format","json");
		 String result =  statisticsService.include(urll, paramss);
		 JSONObject data = JSON.parseObject(result);
		 if(result!=null){
			 maps.put("code", 0000);
			 maps.put("msg","成功！");
			 maps.put("data",data);
		     return maps; 
		 }else{
			 maps.put("code", 0010);
			 maps.put("msg","失败！");
		     return maps; 
		 }
	}	
	
	/**
	 * 权重
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/weight.do")
	@ResponseBody
	public Map<String, Object> weight(String url,Map<String, String> params) throws Exception{
		 Map maps=new HashMap();
		 String urll = "http://api.k780.com:88";
		 Map<String, String> paramss = new LinkedHashMap<String, String>();
    	 params.put("app","entry.baidu");
    	 params.put("appkey","10003");
    	 params.put("sign","b59bc3ef6191eb9f747dd4e83c99f2a4");
    	 params.put("website","qzdzzj.com");
    	 params.put("format","json");
		 String result =  "";
		 if("ok".equals(result)){
			 maps.put("code", 0000);//密码错误
			 maps.put("msg","成功！");
		     return maps; 
		 }else{
			 maps.put("code", 0010);//密码错误
			 maps.put("msg","失败！");
		     return maps; 
		 }
	}	
	
	
	/**
	 * 关键词排名
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/keyword词排名.do")
	@ResponseBody
	public Map<String, Object> keyword(String url,Map<String, String> params) throws Exception{
		 Map maps=new HashMap();
		 String urll = "http://api.k780.com:88";
		 Map<String, String> paramss = new LinkedHashMap<String, String>();
    	 params.put("app","entry.baidu");
    	 params.put("appkey","10003");
    	 params.put("sign","b59bc3ef6191eb9f747dd4e83c99f2a4");
    	 params.put("website","qzdzzj.com");
    	 params.put("format","json");
		 String result =  "";
		 if("ok".equals(result)){
			 maps.put("code", 0000);//密码错误
			 maps.put("msg","成功！");
		     return maps; 
		 }else{
			 maps.put("code", 0010);//密码错误
			 maps.put("msg","失败！");
		     return maps; 
		 }
	}	
	
	/**
	 * 百度统计
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/networkOverview.do")
	@ResponseBody
	public Map<String, Object> networkOverview(String url,String siteId,String method,String start_date,String end_date,String metrics,String visitor,String clientDevice,String source,String viewType) throws Exception{
		 Map maps=new HashMap();
		 JSONObject header = new JSONObject();
         header.put("username", "乐清南田");//用户名
         header.put("password", "weiming");//用户密码
         header.put("token", "eee816312f6c9c3cc89e03eed3af0626");//申请到的token
         header.put("account_type", "1");
         
         JSONObject body = new JSONObject();
         body.put("siteId",siteId);
         body.put("method",method);
         SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
         String tody = sdf.format(new Date());
         body.put("start_date",start_date);
         body.put("end_date",end_date);
         body.put("metrics",metrics);
         body.put("visitor", visitor);
         body.put("clientDevice", clientDevice);
         body.put("source", source);
         body.put("viewType", viewType);
         String urlStr = "https://api.baidu.com/json/tongji/v1/ReportService/getData";
         JSONObject params = new JSONObject();
         params.put("header", header);
         params.put("body", body);
         String result = statisticsService.networkOverview(urlStr, params.toString());
         JSONObject data = JSON.parseObject(result);
		 if(result!=null){
			 maps.put("code", 0000);
			 maps.put("msg","成功！");
			 maps.put("data",data);
		     return maps; 
		 }else{
			 maps.put("code", 0010);
			 maps.put("msg","失败！");
		     return maps; 
		 }
	}	
	
	/**
	 * 百度统计
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/networkOverviewO.do")
	@ResponseBody
	public Map<String, Object> networkOverviewO(String url,String siteId,String method,String start_date,String end_date,String metrics,String visitor,String clientDevice,String source,String viewType) throws Exception{
		 Map maps=new HashMap();
		 JSONObject header = new JSONObject();
         header.put("username", "乐清南田");//用户名
         header.put("password", "weiming");//用户密码
         header.put("token", "eee816312f6c9c3cc89e03eed3af0626");//申请到的token
         header.put("account_type", "1");
         
         String urlStr = "https://api.baidu.com/json/tongji/v1/ReportService/getSiteList";
         JSONObject params = new JSONObject();
         params.put("header", header);
         String result = statisticsService.networkOverview(urlStr, params.toString());
         JSONObject data = JSON.parseObject(result);
		 if(result!=null){
			 maps.put("code", 0000);
			 maps.put("msg","成功！");
			 maps.put("data",data);
		     return maps; 
		 }else{
			 maps.put("code", 0010);
			 maps.put("msg","失败！");
		     return maps; 
		 }
	}	
	
}
