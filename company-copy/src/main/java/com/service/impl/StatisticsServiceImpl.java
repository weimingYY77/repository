package com.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.StatisticsDao;
import com.dao.impl.StatisticsDaoImpl;
import com.service.StatisticsService;

@Repository("statisticsService")
@Transactional
public class StatisticsServiceImpl implements StatisticsService {

	private StatisticsDao statisticsDao = new StatisticsDaoImpl();
	
	/**
	 * 收录
	 * @param url
	 * @param params
	 * @return
	 */
	public String include(String url, Map<String, String> params) {
		// TODO Auto-generated method stub
		return statisticsDao.include(url, params);
	}

	/**
	 * 关键词排名
	 * @param url
	 * @param params
	 * @return
	 */
	public String keyword(String url, Map<String, String> params) {
		// TODO Auto-generated method stub
		return statisticsDao.keyword(url, params);
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
		return statisticsDao.weight(url, params);
	}

	/**
	 * 网络概述
	 * @param url
	 * @return
	 */
	@Override
	public String networkOverview(String url,String content) throws Exception{
		// TODO Auto-generated method stub
		return statisticsDao.networkOverview(url,content);
	}

}
