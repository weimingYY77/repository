package com.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.WorkOrderDao;
import com.entity.WorkOrder;
import com.service.WorkOrderService;

@Repository("workOrderService")
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {

	@Resource
	private WorkOrderDao workOrderDao;
	
	/**
	 * 通过用户id查询工单信息
	 * @return
	 */
	@Override
	public List<WorkOrder> findWorkByUID(Integer u_id) {
		// TODO Auto-generated method stub
		return workOrderDao.findWorkByUID(u_id);
	}

}
