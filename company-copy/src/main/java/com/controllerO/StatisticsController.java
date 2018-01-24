package com.controllerO;

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
	 * 搜索排名
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/SearchRankings.do")
	@ResponseBody
	public Map<String, Object> SearchRankings(String params) throws Exception{
		 String url = "http://api.k780.com/";
		 String result = statisticsService.SearchRankings(url,params);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * 百度权重
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/seo.do")
	@ResponseBody
	public Map<String, Object> seo(String params) throws Exception{
		 String url = "http://api.91cha.com/br";
		 String result = statisticsService.SearchRankings(url,params);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * 同ip域名
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/WithIP.do")
	@ResponseBody
	public Map<String, Object> WithIP(String params) throws Exception{
		 String url = "http://api.91cha.com/ipsame";
		 String result = statisticsService.SearchRankings(url,params);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * 域名注册和过期时间
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/register.do")
	@ResponseBody
	public Map<String, Object> register(String params) throws Exception{
		 String url = "http://api.91cha.com/whois";
		 String result = statisticsService.SearchRankings(url,params);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * alexa
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/alexa.do")
	@ResponseBody
	public Map<String, Object> alexa(String params) throws Exception{
		 String url = "http://api.91cha.com/alexa";
		 String result = statisticsService.SearchRankings(url,params);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * 添加关键词
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/addKeyword.do")
	@ResponseBody
	public Map<String, Object> addKeyword(String params) throws Exception{
		 String url = "http://api.91cha.com/index";
		 Map<String,String> header = new HashMap<String, String>();
	     header.put("key", "0105b8caa8234079aed55106eb15477d");//用户名
	     header.put("kws", params);//用户密码
	        
		 String result = statisticsService.SearchRankingsO(url,header);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
	 * 关键词排名
	 * @param sysuser
	 * @return
	 */
	@RequestMapping(value="/keyTop.do")
	@ResponseBody
	public Map<String, Object> keyTop(String host,String params) throws Exception{
		 String url = "http://api.91cha.com/bdsort";
		 Map<String,String> header = new HashMap<String, String>();
	     header.put("key", "23ce818388ad4f35b60391c92e734676");//用户名
	     header.put("host", host);//用户密码
	     header.put("wd", params);//用户密码
		 String result = statisticsService.SearchRankingsO(url,header);
		 JSONObject data = JSON.parseObject(result);
		 Map maps=new HashMap();
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
