package com.service;

import java.util.List;

import com.entity.WorkOrder;

/**
 * 工单service类
 * @author Administrator
 *
 */
public interface WorkOrderService {
	/**
	 * 通过用户id查询工单信息
	 * @return
	 */
	public List<WorkOrder> findWorkByUID(Integer u_id);
}
