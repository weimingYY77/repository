package com.dao;

import java.util.List;

import com.entity.WorkOrder;

/**
 * 工单接口
 * @author Administrator
 *
 */
public interface WorkOrderDao {
	public List<WorkOrder> findWorkByUID(Integer u_id);
}
