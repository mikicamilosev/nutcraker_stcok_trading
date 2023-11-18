import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Watchlist } from '../../../models/watchlist.model';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { isArray } from '@amcharts/amcharts5/.internal/core/util/Type';
import { ToastrService } from 'ngx-toastr';
import { NewwatchlistComponent } from '../../templates/newwatchlist/newwatchlist.component';
import { Store } from '@ngrx/store';
import { watchlists } from 'src/app/reducers/market/market.action';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  selectedWatchlist: Watchlist | undefined;
  instruments: any;
  watchlists: any;  
  symbol: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp,
    private notif: ToastrService,
    private store: Store,
  ) {
    if(this.lss.get('ThreeLineDepth')){
      this.lss.set('ThreeLineDepth', false)
    }
    // if(!this.lss.get('watchlists')){
      this.apiService.v2().subscribe(
        (res) => {
          this.store.dispatch(watchlists({ watchlists: res }));
          var tempWatchlists = [];
          if(isArray(res)){
            tempWatchlists = res;
            this.lss.set('watchlists', res);
            if(tempWatchlists.length > 0){
              var defaultWatchlist = tempWatchlists.find(function(ele){
                return ele.name === "DEFAULT"
              })
              if(defaultWatchlist !== null){
                this.lss.set('watchlist', defaultWatchlist);
                this.watchlistChanged();
              } else {
                this.lss.set('watchlist', res[0]);
                this.watchlistChanged();
              }
            }
          } else {

          }
        },
        (err) => {
          console.log(err)
        }
      )
    // } 
    this.watchlists = this.lss.get('watchlist');
    this.instruments = this.lss.get('instruments')
  }

  ngOnInit() {
    if(this.lss.get('ThreeLineDepth')){
      this.lss.set('ThreeLineDepth', false)
    }
    if(!this.lss.get('watchlists')){
      this.apiService.v2().subscribe(
        (res) => {
          var tempWatchlists = [];
          this.store.dispatch(watchlists({ watchlists: res }))
          if(isArray(res)){
            tempWatchlists = res;
            this.lss.set('watchlists', res);
            if(tempWatchlists.length > 0){
              var defaultWatchlist = tempWatchlists.find(function(ele){
                return ele.name === "DEFAULT"
              })
              if(defaultWatchlist !== null){
                this.lss.set('watchlist', defaultWatchlist);
                this.watchlistChanged();
              } else {
                this.lss.set('watchlist', res[0]);
                this.watchlistChanged();
              }
            }
          } else {

          }
        },
        (err) => {
          console.log(err)
        }
      )
    } 
    this.watchlists = this.lss.get('watchlists');
    this.instruments = this.lss.get('instruments')
  }

  toggleDepth() {
    this.lss.set('ThreeLineDepth', !this.lss.get('ThreeLineDepth'));
    if(!this.lss.get('ThreeLineDepth')){
      var instruments: any = this.lss.get('instruments');
      instruments.forEach((ele: any) => {
        ele.B2 = '';
        ele.BS2 = '';
        ele.A2 = '';
        ele.AS2 = '';
        ele.B3 = '';
        ele.BS3 = '';
        ele.A3 = '';
        ele.AS3 = '';
      });
      this.lss.set('instruments', instruments);
    }
    // subscribeData
  }

  trackByFn(index: number, item: Watchlist) {
    return item.id; // Replace with the unique identifier property of your Watchlist interface or model
  }
  
  watchlistChanged() {
    if (this.selectedWatchlist) {
      this.lss.set('instruments', []);
      this.lss.set('wlSubscriptions', []);
      this.apiService.instrumentsAll(this.selectedWatchlist.id).subscribe(
        (res) => {
          if(isArray(res)){
            this.lss.set('instruments', []);
            this.lss.set('wlSubscriptions', []);
            res.forEach((ele) => {
              var temp = [];
              temp.push(instrument( String(ele.pesk), String(ele.symbol), String(ele.name)));
              this.lss.set("instruments", temp);
              // wlSubscription save
            })
          }
        },
        (err) => [
          console.log(err)
        ]
      )
    }
  }

  keypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
    // if (event.key === 'Enter' && this.symbol !== null && this.symbol !== '') {
      this.searchInstrument();
      event.preventDefault();
    }
  }

  searchInstrument(){
  }

  navstockInfo(pesk: any, symbol: any, name: any){
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol)
    this.lss.set('siName', name)
    // broadcastStockInfo

    // smaller device condition
  }

  subscribeData () {
    // TODO your code
  }

  removeInstrument(item: any){
    var updateWatchlist = {
      'id': this.selectedWatchlist?.id
    }
  }

  newWatchlist(){
    if(Array(this.lss.get('watchlists')).length > 3){
      this.notif.warning('You currently have reached your watchlist limit of 3. Cannot add more watchlists.', 'Limit reached!')
    }
    
  }

  renameWatchlist() {
    // modal issue newWatchlist
  }

  deleteWatchlist() {
    // modal issue
  }

  newOrder(side: string, price: string, pesk: string){
    try {
      var od = OrderDetails(side, price, pesk)
      // if ($rootScope.swapWatchlistBuySell) {
        if (od.Side === "B") {
            od.Side = "S";
        } else {
            od.Side = "B";
        }
    // }
      var tradableInstrument = null;
      //Find all tradable instruments by Public Exchange Symbol Key
    } catch (error) {
      this.notif.error(String(error), "Warning!")
    }
  }

  openOrderEntry () {

  }
}

  function instrument (pesk: string, symbol: string, name: string) {
    var res = {
      pesk : pesk,
      symbol : symbol,
      name : name,
      BS1 : '',
      B1 : '',
      A1 : '',
      AS1 : '',
      BS2 : '',
      B2 : '',
      A2 : '',
      AS2 : '',
      BS3 : '',
      B3 : '',
      A3 : '',
      AS3 : '',
      LTP : '',
      LTS : '',
      LTT : '',
      Chg : '',
      ChgP : '',
      Cls : '',
      L : '',
      H : '',
      chgColour : 'warning',
    }
    return res;
  }

  function OrderDetails(s: any, p: any, i: any){
    var res = {
      FixSession : '',
      Side : s,
      Price : Number(p),
      Exchange : '',
      TESK : '',
      Symbol : '',
      Quantity : 0,
      Account : '',
      OrderType : 'LO',
      TIF : 'GFD',
      Expiry : '',
      Notes : '',
      PESK : i,
      Instrument : null,
      TriggerPrice : null,
    }

    return res;
  }