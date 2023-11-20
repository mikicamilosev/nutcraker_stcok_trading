import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { updateWatchlists } from 'src/app/reducers/market/market.action';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.css']
})
export class MarketMoversComponent {
  @Input() exchange: any;
  @Input() moverType: any;
  marketMovers: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp,
    private store: Store
  ) {
    // this.apiService.marketMovers('exchange', "moverType").subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.marketMovers = res;
    //   }
    // )
  }

  ngOnInit(){
    
  }

  ngOnChanges() {
    this.apiService.marketMovers(this.exchange, this.moverType).subscribe(
      (res) => {
        this.marketMovers = res;
      }
    )
  }

  navstockInfo(pesk: any, symbol: any, name: any){
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol);
    this.lss.set('siName', name);
    this.store.dispatch(updateWatchlists({watchlists: []}))
  }
}
