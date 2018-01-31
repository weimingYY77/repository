package com.controllerO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.WorkOrder;
import com.service.WorkOrderService;

/**
 * 工单控制类
 * @author Administrator
 *
 */
@RequestMapping(value = "/WordController")
@Controller
public class WorkOrderController {
	
	@Resource
	private WorkOrderService workOrderService;
	
	/*
	 * 工单信息
	 */
	@RequestMapping(value="/findWorkList.do")
	@ResponseBody
	public Map<String, Object> getMaps(Integer u_id) throws Exception{
		Map maps=new HashMap();
		List<WorkOrder> list = workOrderService.findWorkByUID(u_id);
		maps.put("code", 0000);
		maps.put("msg","保存成功！");
		maps.put("data",list);
		return maps;
	}
}
