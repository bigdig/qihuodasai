package com.tzdr.domain.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.tzdr.common.domain.BaseEntity;
import com.tzdr.domain.cache.CacheManager;
import com.tzdr.domain.cache.DataDicKeyConstants;

@Entity
@Table(name = "w_user_bank")
public class UserBank extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String uid;
	private String bank;
	private String provinceCity;//省市
	private String subbank;
	private String card;
	private String accountAddress;
	private short isdefault;
	private long addtime;// 添加时间
	private String bankimgpath;// 银行卡图片路径
	@Transient
	private String bankvalue;// 银行转化

	public String getBankvalue() {
		return CacheManager.getDataMapByKey(DataDicKeyConstants.BANKNAME, this.bank);

	}

	public void setBankvalue(String bankvalue) {
		this.bankvalue = bankvalue;
	}

	public String getBankimgpath() {
		return bankimgpath;
	}

	public void setBankimgpath(String bankimgpath) {
		this.bankimgpath = bankimgpath;
	}

	@Column(name = "addtime")
	public long getAddtime() {
		return addtime;
	}

	public void setAddtime(long addtime) {
		this.addtime = addtime;
	}

	@Column(name = "uid", length = 32)
	public String getUid() {
		return this.uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	@Column(name = "bank", nullable = false, length = 100)
	public String getBank() {
		return this.bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	@Column(name = "province_city", nullable = false, length = 100)
	public String getProvinceCity() {
		return this.provinceCity;
	}

	public void setProvinceCity(String provinceCity) {
		this.provinceCity = provinceCity;
	}

	@Column(name = "subbank", nullable = false)
	public String getSubbank() {
		return this.subbank;
	}

	public void setSubbank(String subbank) {
		this.subbank = subbank;
	}

	@Column(name = "card", nullable = false, length = 100)
	public String getCard() {
		return this.card;
	}

	public void setCard(String card) {
		this.card = card;
	}

	@Column(name = "isdefault")
	public short getIsdefault() {
		return this.isdefault;
	}

	public void setIsdefault(short isdefault) {
		this.isdefault = isdefault;
	}

	@Column(name = "account_Address", nullable = false, length = 100)
	public String getAccountAddress() {
		return accountAddress;
	}

	public void setAccountAddress(String accountAddress) {
		this.accountAddress = accountAddress;
	}

}