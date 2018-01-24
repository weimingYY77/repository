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
	public String SearchRankings(String url,String params) {
		// TODO Auto-generated method stub
		return statisticsDao.SearchRankings(url,params);
	}

	//关键词
	@Override
	public String SearchRankingsO(String url, Map<String, String> param) {
		// TODO Auto-generated method stub
		return statisticsDao.SearchRankingsO(url, param);
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
