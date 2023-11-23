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
        // if (tFlg) {
        //   res = ["L", "H", "BS1", "BP1", "AP1", "AS1", "BS2", "BP2", "AP2", "AS2", "BS3", "BP3", "AP3", "AS3", "LTP", "LTS", "LTT", "CHG", "CHGP", "CLS"];;
        // } else {
          res = ["L", "H", "BS1", "BP1", "AP1", "AS1", "LTP", "LTS", "LTT", "CHG", "CHGP", "CLS"];
        // }
        break;
      case 'indices':
          res = ["LTP", "LTT", "CHG", "CHGP", "CLS"];
        break;
      case 'stockInfo':
        if (tFlg) {
          res = ["L", "H", "BS1", "BP1", "AP1", "AS1", "BS2", "BP2", "AP2", "AS2", "BS3", "BP3", "AP3", "AS3",
          "LTP1", "LTS1", "LTT1", "LTP2", "LTS2", "LTT2", "LTP3", "LTS3", "LTT3", "LTP4", "LTS4", "LTT4", "LTP5", "LTS5", "LTT5",
          "LTP", "LTS", "LTT", "CHG1", "CHG2", "CHG3", "CHG4", "CHG5", "CHG", "CHGP", "CLS", "TVOL", "TVAL", "NTRD", "ST"];;
        } else {
          res = ["L", "H", "BS1", "BP1", "AP1", "AS1",
          "LTP1", "LTS1", "LTT1", "LTP2", "LTS2", "LTT2", "LTP3", "LTS3", "LTT3", "LTP4", "LTS4", "LTT4", "LTP5", "LTS5", "LTT5",
          "LTP", "LTS", "LTT", "CHG1", "CHG2", "CHG3", "CHG4", "CHG5", "CHG", "CHGP", "CLS", "TVOL", "TVAL", "NTRD", "ST"];
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

  subscribeWatchlists(datas: any) {
    var items = this.lss.get('subWlList');
    var fields = this.getFields('watchlist');
    this.getSubscription(items, fields, datas);
  }

  subscribeIndices(items: any) {}

  subscribeStockInfo() {}

  subscribeIntradayChart() {}

  subscribeMarketMover() {}

  getSubscription(items: any, fields: any, datas: any) {
    var sub = new Subscription('MERGE', items, fields);
    sub.setDataAdapter('NTMARKETDATA');
    sub.setRequestedSnapshot('yes');
    sub.setRequestedMaxFrequency(1);
    sub.addListener({
      onItemUpdate: (update) => {this.getStockItem(update, fields, datas)},
    });
    this.client.subscribe(sub);
    this.client.connect();
  }

  getStockItem(update: ItemUpdate, field: any, instrument: any){
    var itemPos = update.getItemPos();
    function getStockItem(update: ItemUpdate, instrument: any){
      for (var f of field) {
        var val: string = update.getValue(f);
        console.log(val)
        if((val !== ' ') && (val !== null) && parseFloat(val)){
          if(f == 'B1'){
            console.log(val)
          }
          instrument[f] = val;
        }
      }
    }
    getStockItem(update, instrument[itemPos-1]);
  }
}
