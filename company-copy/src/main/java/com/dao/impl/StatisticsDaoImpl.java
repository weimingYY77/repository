package com.dao.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.net.HttpURLConnection;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import com.dao.StatisticsDao;
import com.util.HttpRespons;
import com.util.HttpUtils;
import com.util.HttpUtilsLuoCopy;

public class StatisticsDaoImpl implements StatisticsDao {

	/**
	 * 收录
	 * @param url
	 * @param params
	 * @return
	 */
	public String include(String url, Map<String, String> params) {
		// TODO Auto-generated method stub
		 String s = null;  
		HttpUtils http = new HttpUtils();
		try {
			HttpURLConnection conn= (HttpURLConnection)http.sendPostRequest(url, params, null);
			int code = conn.getResponseCode();  
	        InputStream in = conn.getInputStream();  
	        byte[] data = http.read2Byte(in);
	        s = new String(data);        
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  s;
	}
	
	

	/**
	 * 关键词排名
	 * @param url
	 * @param params
	 * @return
	 */
	public String keyword(String url, Map<String, String> params) {
		// TODO Auto-generated method stub
		HttpUtils http = new HttpUtils();
		try {
			http.sendPostRequest(url, params, null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "ok";
	}


	/**
	 * 权重
	 * @param url
	 * @param params
	 * @return
	 */
	@Override
	public String weight(String url, Map<String, String> params) {
		// TODO Auto-generated method stub
		HttpUtils http = new HttpUtils();
		try {
			http.sendPostRequest(url, params, null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "ok";
	}


	/**
	 * 网络概述
	 * @param url
	 * @return
	 */
	@Override
	public String networkOverview(String url,String content) throws Exception{
		// TODO Auto-generated method stub
		HttpUtilsLuoCopy http = new HttpUtilsLuoCopy();
		byte[] res = http.post(url, content, "utf-8");
		String s = new String(res);
		return s;
	}

}
