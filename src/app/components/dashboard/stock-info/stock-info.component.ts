import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { InstrumentSearchComponent } from '../../templates/instrument-search/instrument-search.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { getMarketData } from 'src/app/reducers/market/market.selector';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css'],
})
export class StockInfoComponent {
  stockInfo: any;
  symbol: any;

  constructor(
    private apiservice: NTVoyagerApiWtp,
    private lss: LocalStorageService,
    private modalService: NgbModal,
    private store: Store
  ) {
    this.symbol = this.lss.get('siSymbol');
  }

  ngOnInit() {
    this.store.select(getMarketData).subscribe(
      (res) => {
        var siPesk = this.lss.get('siPesk');
        var siSymbol = this.lss.get('siSymbol');
        var siName = this.lss.get('siName');
        var stockInfo = instrument(siPesk, siSymbol, siName);
        this.lss.set('stockInfo', stockInfo);
        this.stockInfo = stockInfo;
        this.symbol = siSymbol;
      }
    )
    if (this.lss.get('stockInfo') === null || this.stockInfo === undefined) {
      this.stockInfo = instrument('', '', '');
    } else {
      var siPesk = this.lss.get('siPesk');
      var siSymbol = this.lss.get('siSymbol');
      var siName = this.lss.get('siName');
      var stockInfo = instrument(siPesk, siSymbol, siName);
      this.lss.set('stockInfo', stockInfo);
      this.stockInfo = stockInfo;
      this.symbol = siSymbol;
    }
    this.subscribeData();
  }

  ngOnChanges() {}

  handleStockInfoChanged() {
    var siPesk = this.lss.get('siPesk');
    var siSymbol = this.lss.get('siSymbol');
    var siName = this.lss.get('siName');

    this.stockInfo = instrument(siPesk, siSymbol, siName);
  }

  changeInstrument(pesk: any, symbol: any, name: any) {
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol);
    this.lss.set('siName', name);
    this.stockInfo = instrument(pesk, symbol, name);
    this.lss.set('stockInfo', this.stockInfo);
    // subscribeData()
    // broadcastChartData()
  }

  keypress(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.symbol !== null && this.symbol !== '') {
      this.searchInstrument();
      event.preventDefault();
    }
  }

  subscribeData() {}

  getColor(change: any, isText: any) {
    if (
      change !== null &&
      change !== '' &&
      change !== ' ' &&
      change !== '   '
    ) {
      if (change > 0) {
        if (isText) {
          return 'text-success';
        }
        return 'success';
      } else if (change < 0) {
        if (isText) {
          return 'text-danger';
        }
        return 'danger';
      } else if (isText) {
        return 'text-warning';
      }
      return 'warning';
    } else {
      return '';
    }
  }

  showChange(ltp: any) {
    // if (!angular.isDefined(ltp) || ltp === null || ltp === '' || ltp === ' ' || ltp === '  ' || ltp === 0) {
    if (
      ltp === null ||
      ltp === '' ||
      ltp === ' ' ||
      ltp === '  ' ||
      ltp === 0
    ) {
      return false;
    }
    return true;
  }

  orderDetails = function (s: any, p: any) {
    var res = {
      side: s,
      price: p,
    };
    return res;
  };

  newOrder = function (side: any, price: any) {
    // var od = new orderDetails(side, price);
    // var modalInstance = $modal.open({
    //     templateUrl: 'app/templates/orderEntry.html?',
    //     controller: 'orderentryController',
    //     backdrop: 'static',
    //     resolve: {
    //         instructionDetails: function () {
    //             return od;
    //         }
    //     }
    // });
  };

  searchAction(a: any, s: any) {
    var res = {
      action: a,
      searchString: s
    }
    return res;
  };

  searchInstrument() {
    const modalRef = this.modalService.open(InstrumentSearchComponent, {
      backdrop: 'static',
      modalDialogClass: 'modal-lg',
    });
    modalRef.componentInstance.instrumentCollection = this.searchAction('SI', this.symbol);

    modalRef.result.then(
      (selectedInstrument) => {
        // tradableInstrument = selectedInstrument;
        // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
    this.symbol = ''
  }
}

function instrument(pesk: any, symbol: any, name: any) {
  var res = {
    pesk: pesk,
    symbol: symbol,
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
