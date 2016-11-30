package com.tzdr.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tzdr.api.support.ApiResult;
import com.tzdr.business.service.crawler.CrawlerCalendarService;
import com.tzdr.business.service.crawler.CrawlerWallstreetnLiveContentService;
import com.tzdr.business.service.crawler.CrawlerWallstreetnLiveService;
import com.tzdr.common.utils.Page;
import com.tzdr.common.web.support.JsonResult;
import com.tzdr.domain.web.entity.CrawlerWallstreetnLive;

@Controller
@RequestMapping(value = "/crawler")
public class CrawlerController {
	private Logger logger = LoggerFactory.getLogger(CrawlerController.class);
	@Autowired
	private CrawlerWallstreetnLiveService crawlerWallstreetnLiveService;
	@Autowired
	private CrawlerCalendarService crawlerCalendarService;
	@Autowired
	private CrawlerWallstreetnLiveContentService crawlerWallstreetnLiveContentService;
	/**
	 * 获取实时新闻数据
	 * @param crawlerWallstreetnLive
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getCrawler",method = RequestMethod.GET)
	public ApiResult getCrawler(CrawlerWallstreetnLive crawlerWallstreetnLive,HttpServletRequest request){
		ApiResult result = new ApiResult(true);
		result.setData(crawlerWallstreetnLiveService.getCrawler(new Page(request)));
		return result;
	}
	/**
	 * 获取实时新闻数据
	 * @param crawlerWallstreetnLive
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getCrawlerByChannel",method = RequestMethod.GET)
	public JsonResult getCrawlerByChannel(CrawlerWallstreetnLive crawlerWallstreetnLive,HttpServletRequest request,@RequestParam("channelset")String channelset){
		JsonResult result = new JsonResult(true);
		result.appendData("data", crawlerWallstreetnLiveService.getCrawler(new Page(request),channelset));
		return result;
	}
	/**
	 * 获取日历
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getCrawlerCalendar",method = RequestMethod.GET)
	public ApiResult getCrawlerCalendar(HttpServletRequest request){
		ApiResult result = new ApiResult();
		result.setSuccess(true);
		result.setData(crawlerCalendarService.doGetCrwlerCalendar(new Page(request)));
		return result;
	}
	/**
	 * 获取日历数据
	 * @param request
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getCrawlerCalendarByTime",method = RequestMethod.GET)
	public JsonResult getCrawlerCalendarByTime(HttpServletRequest request,@RequestParam("startTime") String startTime,@RequestParam("endTime") String endTime){
		JsonResult resultJson = new JsonResult();
		resultJson.setSuccess(true);
		resultJson.appendData("data",crawlerCalendarService.doGetCrwlerCalendarByTime(new Page(request), startTime, endTime));
		return resultJson;
	}
	/**
	 * 实时数据内容
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getCrawlerLiveContent",method = RequestMethod.GET)
	public ApiResult getCrawlerLiveContent(HttpServletRequest request,@RequestParam("liveId")String liveId){
		ApiResult result = new ApiResult(true);
		result.setData(crawlerWallstreetnLiveContentService.doGetCrawlerLiveContent(liveId));
		return result;
	}
}
