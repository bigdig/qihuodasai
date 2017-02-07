package com.tzdr.domain.web.entity.future;


// Generated 2015-7-23 14:20:39 by Hibernate Tools 4.3.1


import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.tzdr.common.domain.FbaseCrudEntity;

/**
 * FAccountInfo generated by hbm2java
 */
@Entity
@Table(name="f_account_info")
public class FaccountInfo extends FbaseCrudEntity implements java.io.Serializable {

	
	/**
	 *  实盘账户信息
	 */
	 @ManyToOne
	 @JoinColumn(name="f_tid")
	 private FtradeParentAccount ftradeParentAccount;

     //用户id
     private String uid;
     //账户余额
     private BigDecimal balance;
     //可提现余额
     private BigDecimal avlBalance;
     //冻结金额
     private BigDecimal freeze;
     //持仓总资产
     private BigDecimal positionAsset;
     //累计支出管理费
     private BigDecimal cumulativeTrans;
     //累计获取利润
     private BigDecimal cumulativeTotal;
     //累计盈亏
     private BigDecimal cumulativeProfit;
     //盈亏率（100%）
     private Double profitRate;
     //实盘权限【1.实盘、-1.无实盘权限】
     private Integer operationRight;
     //限制状态【1.正常、0.限制交易】
     private Integer restrictState;
     //更改限制人id
     private String restrictUid;
     //更新限制时间
     private Date restrictTime;

    public FaccountInfo() {
    }
    
    @Column(name="uid")
    public String getUid() {
        return this.uid;
    }
    
    public void setUid(String uid) {
        this.uid = uid;
    }

    
    @Column(name="balance")
    public BigDecimal getBalance() {
        return this.balance;
    }
    
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    
    @Column(name="avl_balance")
    public BigDecimal getAvlBalance() {
        return this.avlBalance;
    }
    
    public void setAvlBalance(BigDecimal avlBalance) {
        this.avlBalance = avlBalance;
    }

    
    @Column(name="freeze")
    public BigDecimal getFreeze() {
        return this.freeze;
    }
    
    public void setFreeze(BigDecimal freeze) {
        this.freeze = freeze;
    }

    
    @Column(name="position_asset")
    public BigDecimal getPositionAsset() {
        return this.positionAsset;
    }
    
    public void setPositionAsset(BigDecimal positionAsset) {
        this.positionAsset = positionAsset;
    }

    
    @Column(name="cumulative_trans")
    public BigDecimal getCumulativeTrans() {
        return this.cumulativeTrans;
    }
    
    public void setCumulativeTrans(BigDecimal cumulativeTrans) {
        this.cumulativeTrans = cumulativeTrans;
    }

    
    @Column(name="cumulative_total")
    public BigDecimal getCumulativeTotal() {
        return this.cumulativeTotal;
    }
    
    public void setCumulativeTotal(BigDecimal cumulativeTotal) {
        this.cumulativeTotal = cumulativeTotal;
    }

    
    @Column(name="cumulative_profit")
    public BigDecimal getCumulativeProfit() {
        return this.cumulativeProfit;
    }
    
    public void setCumulativeProfit(BigDecimal cumulativeProfit) {
        this.cumulativeProfit = cumulativeProfit;
    }

    
    @Column(name="profit_rate", precision=22, scale=0)
    public Double getProfitRate() {
        return this.profitRate;
    }
    
    public void setProfitRate(Double profitRate) {
        this.profitRate = profitRate;
    }

    
    @Column(name="operation_right")
    public Integer getOperationRight() {
        return this.operationRight;
    }
    
    public void setOperationRight(Integer operationRight) {
        this.operationRight = operationRight;
    }

    
    @Column(name="restrict_state")
    public Integer getRestrictState() {
        return this.restrictState;
    }
    
    public void setRestrictState(Integer restrictState) {
        this.restrictState = restrictState;
    }

    
    @Column(name="restrict_uid", length=32)
    public String getRestrictUid() {
        return this.restrictUid;
    }
    
    public void setRestrictUid(String restrictUid) {
        this.restrictUid = restrictUid;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="restrict_time", length=19)
    public Date getRestrictTime() {
        return this.restrictTime;
    }
    
    public void setRestrictTime(Date restrictTime) {
        this.restrictTime = restrictTime;
    }

	public FtradeParentAccount getFtradeParentAccount() {
		return ftradeParentAccount;
	}

	public void setFtradeParentAccount(FtradeParentAccount ftradeParentAccount) {
		this.ftradeParentAccount = ftradeParentAccount;
	}




}

