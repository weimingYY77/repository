package com.dao;

import java.util.Map;

/**
 * 百度统计接口类
 * @author Administrator
 *
 */
public interface StatisticsDao {
	
	/**
	 * 收录
	 * @param url
	 * @param params
	 * @return
	 */
	public String include(String url,Map<String,String> params);
	
	/**
	 * 权重
	 * @param url
	 * @param params
	 * @return
	 */
	public String weight(String url,Map<String,String> params);
	
	/**
	 * 关键词排名
	 * @param url
	 * @param params
	 * @return
	 */
	public String keyword(String url,Map<String,String> params);
	
	/**
	 * 网络概述
	 * @param url
	 * @return
	 * @throws Exception 
	 */
	public String networkOverview(String url,String content) throws Exception;
}
