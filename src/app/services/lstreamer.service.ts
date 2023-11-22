import { Injectable } from '@angular/core';
import { lsClient } from './lightstreamer/lsClient';
import { ItemUpdate, Subscription } from 'lightstreamer-client-web/lightstreamer.esm';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class LstreamerService {
  client: any;

  constructor(private lss: LocalStorageService) {
    this.client = lsClient;
  }

  getFields(str: string): any {
    var tFlg = this.lss.get('ThreeLineDepth');
    var res: any = [];
    switch (str) {
      case 'watchlist':
        if (tFlg) {
          res = [];
        } else {
          res = ["L", "H", "BS1", "B1", "A1", "AS1", "LTP", "LTS", "LTT", "Chg", "ChgP", "Cls"];
        }
        break;
      case 'indices':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'stockInfo':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'marketMover':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'intraChart':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
    }
    return res;
  }

  getItems(str: any): any {
    var tFlg = this.lss.get('ThreeLineDepth');
    var res: any = [];
    switch (str) {
      case 'watchlist':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'indices':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'stockInfo':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'marketMover':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
      case 'intraChart':
        if (tFlg) {
          res = [];
        } else {
          res = [];
        }
        break;
    }
  }

  subscribeWatchlists(items: any) {

  }

  subscribeIndices(items: any) {}

  subscribeStockInfo() {}

  subscribeIntradayChart() {}

  subscribeMarketMover() {}

  getSubscription(items: any, fields: any, OnItemUpdateDetail: any) {
    var sub = new Subscription('MERGE', items, fields);
    sub.setDataAdapter('NTMARKETDATA');
    sub.setRequestedSnapshot('yes');
    sub.setRequestedMaxFrequency(1);
    sub.addListener({
      onItemUpdate: OnItemUpdateDetail,
    });
    this.client.subscribe(sub);
    this.client.connect();
  }

  getStockItem(update: ItemUpdate, itemPos: number, field: any, instrument: any){
    for (var f of field) {
      var val: string = update.getValue(f);
      if((val !== ' ') && (val !== null)){
        console.log(val)
        instrument[f] = val;
      } else {
        instrument[f] = '0'
      }
    }
  }
}
