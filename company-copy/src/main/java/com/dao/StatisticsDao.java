package com.dao;

import java.util.Map;

/**
 * 百度统计接口类
 * @author Administrator
 *
 */
public interface StatisticsDao {
	
	/**
	 * 搜索排名
	 * @param url
	 * @param params
	 * @return
	 */
	public String SearchRankings(String url,String params);
	
	/**
	 * 关键词
	 * @param url
	 * @param params
	 * @return
	 */
	public String SearchRankingsO(String url,Map<String,String> param);
	
	
	/**
	 * 网络概述
	 * @param url
	 * @return
	 * @throws Exception 
	 */
	public String networkOverview(String url,String content) throws Exception;
}
