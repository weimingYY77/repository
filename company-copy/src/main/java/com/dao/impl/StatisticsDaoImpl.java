package com.dao.impl;

import java.util.Map;

import com.dao.StatisticsDao;
import com.util.HttpUtils;
import com.util.HttpUtilsLuoCopy;

public class StatisticsDaoImpl implements StatisticsDao {

	/**
	 * 搜索排名
	 * @param url
	 * @param params
	 * @return
	 */
	public String SearchRankings(String url,String params) {
		// TODO Auto-generated method stub
		String s = null;
		try {
			HttpUtils http = new HttpUtils();
			s = http.sendGet(url, params);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return s;
	}
	
	//关键词
	@Override
	public String SearchRankingsO(String url, Map<String, String> param) {
		// TODO Auto-generated method stub
		String s = null;
		try {
			HttpUtils http = new HttpUtils();
			s = http.sendPost(url, param, "utf-8");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return s;
	}
	
	/**
	 * 网络概述
	 * @param url
	 * @return
	 */
	@Override
	public String networkOverview(String url,String content) throws Exception{
		// TODO Auto-generated method stub
		String s = null;
		try {
			HttpUtilsLuoCopy http = new HttpUtilsLuoCopy();
			byte[] res = http.post(url, content, "utf-8");
			s = new String(res);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return s;
	}

	

}
