import { isArray } from '@amcharts/amcharts5/.internal/core/util/Type';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { getWatchlists } from 'src/app/reducers/market/market.selectors';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import * as fromMarket from '../../../reducers/market/market.selectors'
import { AppState } from 'src/app/reducers/index.reducer';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css'],
})
export class IndicesComponent {
  indices: any;
  action: any;
  searchString: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp, 
    private store: Store<AppState>
  ) {
    // this.indices = [];
    // this.lss.set('indexWatchlistId', 0)
  }

  ngOnInit() {
    var red_watchlists = this.store.select(getWatchlists).subscribe(
      (res) => {
        console.log(res)
      }
    );
    console.log(red_watchlists)
    this.lss.set('indexSubscriptions', []);
    this.apiService.v2().subscribe((res) => {
      if (isArray(res)) {
        res.forEach((ele: any) => {
          if (this.lss.get('indexWatchlistId') === 0) {
            this.lss.set('indexWatchlistId', ele.id);
            this.apiService.instrumentsAll(ele.id).subscribe((res) => {
              if (isArray(res)) {
                var temp: any = [];
                var temp2: any = [];
                res.forEach((cell: any) => {
                  console.log(cell.symbol);
                  temp.push(instrument(cell.symbol, cell.value, cell.name));
                  temp2.push(cell.symbol);
                });
                this.lss.set('indices', temp);
                this.indices = temp;
                this.lss.set('indexSubscriptions', temp2);
                // subscribeData()
                if (this.lss.get('indexWatchlistId') === 0) {
                  var newIndexWatchlist = {
                    name: 'My Index Watchlist',
                    type: 'Index',
                    exchangeSymbolKeys: [],
                  };
                }
              }
            });
          }
        });
      }
    });
  }

  navstockInfo(pesk: any, symbol: any, name: any) {
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol);
    this.lss.set('siName', name);
    // broadcastingStockInfo()
  }

  removeInstrument(item: any) {
    var updateIndexWatchlist = {
      id: this.lss.get('indexWatchlistId'),
      type: 'Index',
      exchangeSymbolKeys: [],
    };
    var temp = [];
    Array(this.lss.get('indices')).forEach((element: any) => {
      if (element.pesk === item.pesk) {
        temp.push(element.pesk);
      }
    });
    // API links contains 'put'
  }

  keypress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.searchInstrument();
      event.preventDefault();
    }
  }

  searchAction = function (a: any, s: any) {
    // this.action = a;
    // this.searchString = s;
  };

  searchInstrument() {
    //  add serchAction & modal open()
  }
}

function instrument(pesk: any, symbol: any, name: any) {
  var res = {
    pesk: pesk,
    symbol: symbol,
    name: name,
    LTP: '',
    LTT: '',
    Chg: '',
    ChgP: '',
    Cls: '',
    chgColour: 'warning',
  };
  return res;
}
