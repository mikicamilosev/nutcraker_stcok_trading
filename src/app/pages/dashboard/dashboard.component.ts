import { Component, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import * as fromMarket from '../../reducers/market/market.selectors'
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  exchange: any;
  moverType: any;

  active: any;
  stockInfo: any;
  selectedTab: any;

  constructor(private lss: LocalStorageService,private store: Store, private apiService: NTVoyagerApiWtp) {
    this.exchange = 'Up'
    this.moverType = 'Gainers'
    this.stockInfo = this.lss.get('stockInfo');
  }

  ngOnInit() {
    this.store.select(fromMarket.getWatchlists as any).subscribe(
      (res: any) => {
        this.stockInfo = this.instrument(res.siPesk, res.siSymbol, res.siName);
      }
    )
    var siSymbol = this.lss.get('siSymbol');
    var siPesk = this.lss.get('siPesk');
    var siName = this.lss.get('siName');
    this.stockInfo = this.instrument(siPesk, siSymbol, siName);
    console.log(this.stockInfo)
  }

  ngOnChanges() {
    this.stockInfo = this.lss.get('stockInfo');
  }

  isSelectedTab(tabName: string): boolean {
    return this.selectedTab === tabName;
  }

  handleNavSelect(exchange: string, moverType: string){
    this.exchange = exchange;
    this.moverType = moverType;
  }

  instrument(pesk: any, symbol: any, name: any) {
    var res = {
      pesk: pesk,
      Symbol: symbol,
      Name: name,

      //Depth
      BS1: '',
      B1: '',
      A1: '',
      AS1: '',
      BS2: '',
      B2: '',
      A2: '',
      AS2: '',
      BS3: '',
      B3: '',
      A3: '',
      AS3: '',

      // Last 5 Trades
      LTP1: '',
      LTS1: '',
      LTT1: '',
      Chg1: '',
      LTP2: '',
      LTS2: '',
      LTT2: '',
      Chg2: '',
      LTP3: '',
      LTS3: '',
      LTT3: '',
      Chg3: '',
      LTP4: '',
      LTS4: '',
      LTT4: '',
      Chg4: '',
      LTP5: '',
      LTS5: '',
      LTT5: '',
      Chg5: '',

      Chg: '',
      ChgP: '',
      Cls: '',
      L: '',
      H: '',
      TVol: '',
      TVal: '',
      NTrd: '',
      St: '',

      //chgColour is used for changing the row's css class
      //('warning', 'danger', 'success') - (yellow, red, green)
      chgColour: '',
    };
    return res;
  }
}

