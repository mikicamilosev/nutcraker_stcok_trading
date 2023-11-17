import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage'
import { NTVoyagerApiWtp } from './api.service';

interface StoredObject {
  id: number;
  name: string;
}

class Instrument {
  pesk: string;
  Symbol: string;
  name: string;
  BS1: string;
  B1: string;
  A1: string;
  AS1: string;
  BS2: string;
  B2: string;
  A2: string;
  AS2: string;
  BS3: string;
  B3: string;
  A3: string;
  AS3: string;
  LTP: string;
  LTS: string;
  LTT: string;
  Chg: string;
  ChgP: string;
  Cls: string;
  L: string;
  H: string;
  chgColour: string;

  constructor(pesk: string, symbol: string, name: string) {
    this.pesk = pesk;
    this.Symbol = symbol;
    this.name = name;
    this.BS1 = '';
    this.B1 = '';
    this.A1 = '';
    this.AS1 = '';
    this.BS2 = '';
    this.B2 = '';
    this.A2 = '';
    this.AS2 = '';
    this.BS3 = '';
    this.B3 = '';
    this.A3 = '';
    this.AS3 = '';
    this.LTP = '';
    this.LTS = '';
    this.LTT = '';
    this.Chg = '';
    this.ChgP = '';
    this.Cls = '';
    this.L = '';
    this.H = '';
    this.chgColour = 'warning';
  }
}

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlists: any;
  instruments: any;
  constructor(private lss: LocalStorageService, private apiService: NTVoyagerApiWtp) {
    if(!this.lss.get('ThreeLineDepth')){
      this.lss.set('ThreeLineDepth', false);
    }
  }

  getWatchLists() {
    // if(this.lss.get<StoredObject>('watchlist')){
    //   this.watchlists = this.lss.get<StoredObject>('watchlist');
    //   return this.watchlists;
    // } else {
      this.apiService.v2().subscribe(
        (res) => {
          this.lss.set('watchlist', res)
          return res;
        },
        (err) => {
          console.log(err)
        }
      )
    // }
  }

  getInstrumentByWatchListId(id: string) {
    this.apiService.instrumentsAll(id).subscribe(
      (res) => {
        this.lss.set('instruments',res);
      },
      (err) => [
        console.log(err)
      ]
    )
  }

  searchInstrument() {
    var searchKeySet = {

    }
  }

  navstockInfo(pesk: any, Symbol: any, name: any){
    this.lss.set('siPesk', pesk)
    this.lss.set('siSymbol', Symbol)
    this.lss.set('siName', name)
  }
}
