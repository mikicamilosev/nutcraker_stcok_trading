import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Watchlist } from '../../../models/watchlist.model';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { isArray } from '@amcharts/amcharts5/.internal/core/util/Type';
import { ToastrService } from 'ngx-toastr';
import { NewwatchlistComponent } from '../../templates/newwatchlist/newwatchlist.component';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  updateWatchlists,
} from 'src/app/reducers/market/market.action';
import { RenameWatchlistNameComponent } from '../../templates/rename-watchlist-name/rename-watchlist-name.component';
import { DeleteWatchlistComponent } from '../../templates/delete-watchlist/delete-watchlist.component';
import { InstrumentSearchComponent } from '../../templates/instrument-search/instrument-search.component';
import * as fromMarket from '../../../reducers/market/market.selectors'

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  selectedWatchlist: any;
  watchlists: any;
  instruments: any;
  symbol: any;
  ThreeLineDepth: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp,
    private notif: ToastrService,
    private store: Store,
    private modalService: NgbModal
  ) {
    this.symbol = '';
    this.instruments = [];
    if(this.lss.get('ThreeLineDepth') == null){
      this.lss.set('ThreeLineDepth', false)
    }
  }

  ngOnInit() {
    this.store.select(fromMarket.getWatchlists as any).subscribe(
      (res) => {
        this.instruments = this.lss.get('instruments');
        this.watchlists = this.lss.get('watchlists');
        this.selectedWatchlist = this.lss.get('watchlist');
        this.ThreeLineDepth = this.lss.get('ThreeLineDepth');
      }
    );
    if (this.lss.get('ThreeLineDepth')) {
      this.lss.set('ThreeLineDepth', false);
    }
    this.apiService.v2().subscribe(
      (res: any) => {
        var oldWatchlists: any = this.lss.get('watchlists');
        var oldInstruments = this.lss.get('instruments');
        if(oldWatchlists == null){
          this.watchlists = res;
          this.lss.set('watchlists', res)
          this.selectedWatchlist = res[0];
          this.lss.set('watchlist', this.selectedWatchlist);
          this.apiService.instrumentsAll(res[0].id).subscribe(
            (res: any) => {
              var tempInstruments: any = [];
                res.forEach((cell: any) => {
                  tempInstruments.push(instrument(cell.pesk, cell.symbol, cell.name));                  
                });
                this.lss.set('instruments', tempInstruments)
                this.instruments = tempInstruments;
            },
            (err) => {
              console.log(err)
            }
          )
        } else {
          this.watchlists = oldWatchlists;
          this.selectedWatchlist = oldWatchlists[0];
          this.lss.set('watchlist', this.selectedWatchlist)
          if(oldInstruments == null){
            this.apiService.instrumentsAll(res[0].id).subscribe(
              (res: any) => {
                var tempInstruments: any = [];
                res.forEach((cell: any) => {
                  tempInstruments.push(instrument(cell.pesk, cell.symbol, cell.name));                  
                });
                this.lss.set('instruments', tempInstruments)
                this.instruments = tempInstruments;
              },
              (err) => {
                console.log(err)
              }
            )
          } else {
            this.instruments = oldInstruments;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleDepth() {
    this.ThreeLineDepth = !this.lss.get('ThreeLineDepth');
    this.lss.set('ThreeLineDepth', this.ThreeLineDepth);
    if (this.ThreeLineDepth) {
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
      this.lss.set('watchlist', this.selectedWatchlist)
      this.lss.set('instruments', []);
      this.lss.set('wlSubscriptions', []);
      this.apiService.instrumentsAll(this.selectedWatchlist.id).subscribe(
        (res) => {
          console.log(res);
          if (isArray(res)) {
            this.lss.set('instruments', []);
            this.lss.set('wlSubscriptions', []);
            var temp: any = [];
            res.forEach((ele: any) => {
              temp.push(
                instrument(
                  String(ele.pesk),
                  String(ele.symbol),
                  String(ele.name)
                )
              );
              this.lss.set('instruments', temp);
              // wlSubscription save
            });
            this.instruments = temp;
          }
        },
        (err) => [console.log(err)]
      );
    }
  }

  keypress(event: KeyboardEvent): void {
    this.lss.set('indexWLStr', SearchAction('WL',this.symbol))
    if (event.key === 'Enter') {
      // if (event.key === 'Enter' && this.symbol !== null && this.symbol !== '') {
      this.searchInstrument();
      event.preventDefault();
    }
  }

  searchInstrument() {
    const modalRef = this.modalService.open(InstrumentSearchComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    modalRef.componentInstance.instrumentCollection = SearchAction('WL',this.symbol)
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }

  navstockInfo(pesk: any, symbol: any, name: any) {
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol);
    this.lss.set('siName', name);
  }

  subscribeData() {
    // TODO your code
  }

  removeInstrument(item: any) {
    var oldInstruments: any = this.lss.get('instruments');
    var newInstruments: any = [];
    oldInstruments.forEach((cell:any) => {
      if(cell.pesk !== item.pesk){
        newInstruments.push(cell);
      }
    })
    console.log(newInstruments)
    this.instruments = newInstruments;
    this.lss.set('instruments', newInstruments);
    this.apiService.updatePesks2({watchlistId: this.selectedWatchlist?.id, pesks: [item.pesk]} as any).subscribe(
      (res) =>{
        console.log(res)
      }
    )
  }

  newWatchlist() {
    var temp: any = this.lss.get('watchlists')
    if (temp.length === 3) {
      this.notif.warning(
        'You currently have reached your watchlist limit of 3. Cannot add more watchlists.',
        'Limit reached!',
        {
          positionClass: 'toast-top-right'
        }
      );
      return ;
    }

    const modalRef = this.modalService.open(NewwatchlistComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    // modalRef.componentInstance.instrumentCollection = data.items;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }

  renameWatchlist() {
    // modal issue newWatchlist
    if(!this.lss.get('watchlist') || this.lss.get('watchlist') == "" || this.lss.get('watchlist') == undefined){
      this.notif.warning('Please select a watchlist to rename.', 'Rename', {
        positionClass: 'toast-top-right'
      })
      return ;
    }
    const modalRef = this.modalService.open(RenameWatchlistNameComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    modalRef.componentInstance.instrumentCollection = this.selectedWatchlist;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }

  deleteWatchlist() {
    if(!this.lss.get('watchlist') || this.lss.get('watchlist') == "" || this.lss.get('watchlist') == undefined){
      this.notif.warning('Please select a watchlist to delete.', 'Warning', {
        positionClass: 'toast-top-right'
      })
      return ;
    }
    const modalRef = this.modalService.open(DeleteWatchlistComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    // modalRef.componentInstance.instrumentCollection = data.items;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }

  newOrder(side: string, price: string, pesk: string) {
    try {
      var od = OrderDetails(side, price, pesk);
      // if ($rootScope.swapWatchlistBuySell) {
      if (od.Side === 'B') {
        od.Side = 'S';
      } else {
        od.Side = 'B';
      }
      // }
      var tradableInstrument = null;
      //Find all tradable instruments by Public Exchange Symbol Key
    } catch (error) {
      this.notif.error(String(error), 'Warning!');
    }
  }

  openOrderEntry() {}

  openModal(content: any) {
    this.modalService.open(content);
  }

  dismissAll(){
    this.modalService.dismissAll()
  }
}

function instrument(pesk: string, symbol: string, name: string) {
  var res = {
    pesk: pesk,
    symbol: symbol,
    name: name,
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
    LTP: '',
    LTS: '',
    LTT: '',
    Chg: '',
    ChgP: '',
    Cls: '',
    L: '',
    H: '',
    chgColour: 'warning',
  };
  return res;
}

function OrderDetails(s: any, p: any, i: any) {
  var res = {
    FixSession: '',
    Side: s,
    Price: Number(p),
    Exchange: '',
    TESK: '',
    Symbol: '',
    Quantity: 0,
    Account: '',
    OrderType: 'LO',
    TIF: 'GFD',
    Expiry: '',
    Notes: '',
    PESK: i,
    Instrument: null,
    TriggerPrice: null,
  };

  return res;
}

function SearchAction(a: any, s: any) {
  var res = {
    action : a,
    searchString : s
  }
  return res;
};