package com.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;

import com.dao.WorkOrderDao;
import com.entity.WorkOrder;

public class WorkOrderDaoImpl implements WorkOrderDao {

	@Resource
	private SqlSessionTemplate sqlSessionTemplate;  //工厂session
	
	@Override
	public List<WorkOrder> findWorkByUID(Integer u_id) {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectList("com.dao.WorkOrderDao.findWorkOrder", u_id);
	}

}
