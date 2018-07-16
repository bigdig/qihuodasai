import { observable } from 'mobx';
import _ from 'lodash';

export default class ContractHistory {
    @observable index;      // 序号
    @observable tradeDate;  // 成交日期
    @observable userNo;     // 客户号
    @observable currencyNo; // 币种
    @observable exchangeNo; // 交易所
    @observable commodityNo;// 品种
    @observable buyNum;     // 买
    @observable sellNum;    // 卖
    @observable tradePrice; // 成交价
    @observable free;       // 手续费

    constructor({ tradeDate, userNo, currencyNo, exchangeNo, commodityNo, buyNum, sellNum, tradePrice, free }, index) {
        this.index = index;
        this.tradeDate = tradeDate;
        this.userNo = userNo;
        this.currencyNo = currencyNo;
        this.exchangeNo = exchangeNo;
        this.commodityNo = commodityNo;
        this.buyNum = buyNum;
        this.sellNum = sellNum;
        this.tradePrice = _.toNumber((parseFloat(tradePrice).toFixed(2)));
        this.free = _.toNumber((parseFloat(free).toFixed(2)));
    }
}
