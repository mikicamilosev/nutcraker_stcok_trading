import { Injectable } from '@angular/core';
import { LightstreamerClient } from 'lightstreamer-client-web';
import { lsClient } from './lightstreamer/lsClient';
import { Subscription } from 'lightstreamer-client-web/lightstreamer.esm';

@Injectable({
  providedIn: 'root'
})
export class LstreamerService {
  lsService: any;

  constructor() { 
    this.lsService = lsClient;
  }

  subscribeWatchlist(items: any[], threeLineDepth: any, onItemUpdateFn: any) {
    const subscription = new Subscription("MERGE", items, this.watchlistFields(threeLineDepth));
    subscription.setDataAdapter(this.getDataAdapter());
    subscription.setRequestedSnapshot("yes");
    subscription.setRequestedMaxFrequency(1);
    lsClient.subscribe(subscription);
    subscription.addListener({
      onItemUpdate: onItemUpdateFn
    });
  }
  
  watchlistFields(threeLineDepth: any): any[] {
    // Implement the logic to generate the watchlist fields based on the `threeLineDepth` parameter
    // Return the generated watchlist fields as an array
    if (threeLineDepth) {
      return ["Symbol", "L", "H", "BS1", "B1", "A1", "AS1", "BS2", "B2", "A2", "AS2", "BS3", "B3", "A3", "AS3", "LTP", "LTS", "LTT", "Chg", "ChgP", "Cls"];
    } else {
      return ["Symbol", "L", "H", "BS1", "B1", "A1", "AS1", "LTP", "LTS", "LTT", "Chg", "ChgP", "Cls"];
    }
  }

  getDataAdapter () {
    return "MARKETDATA";
  }

  testWatchlist (watchlists: any){
    var items = ["Symbol", "L", "H", "BS1", "BP1", "AP1", "AS1", "LTP", "LTS", "LTT", "CHG", "CHGP", "CLS"];
    var watchlist = ["Symbol", "L", "H", "BS1", "B1", "A1", "AS1", "LTP", "LTS", "LTT", "Chg", "ChgP", "Cls"]
    var sub = new Subscription('MERGE', watchlists, watchlist);
    sub.setDataAdapter('NTMARKETDATA');
    sub.addListener({
      onItemUpdate: function (params:any) {
        console.log(params)
      }
    });
    lsClient.subscribe(sub);
    lsClient.connect()
  }
}
