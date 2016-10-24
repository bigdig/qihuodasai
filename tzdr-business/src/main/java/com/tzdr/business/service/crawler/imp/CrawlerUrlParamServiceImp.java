package com.tzdr.business.service.crawler.imp;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tzdr.business.service.crawler.CrawlerUrlParamService;
import com.tzdr.common.baseservice.BaseServiceImpl;
import com.tzdr.domain.dao.crawler.CrawlerUrlParamDao;
import com.tzdr.domain.web.entity.CrawlerUrlParam;

@Service("crawlerUrlParamService")
@Transactional
public class CrawlerUrlParamServiceImp extends BaseServiceImpl<CrawlerUrlParam, CrawlerUrlParamDao> implements CrawlerUrlParamService{

}
