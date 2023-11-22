import { isArray } from '@amcharts/amcharts5/.internal/core/util/Type';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { AppState } from 'src/app/reducers/index.reducer';
import { InstrumentSearchComponent } from '../../templates/instrument-search/instrument-search.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMarketData } from 'src/app/reducers/market/market.action';
import { getMarketData } from 'src/app/reducers/market/market.selector';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css'],
})
export class IndicesComponent {
  indexInstruments: any;

  indices: any;
  action: any;
  searchString: any;
  symbol: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp, 
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {
    this.symbol = ''
  }
  
  ngOnInit() {
    this.store.select(getMarketData).subscribe(
      (res) => {
        this.indexInstruments = this.lss.get('indexInstruments')
      }
    )
    this.indexInstruments = this.lss.get('indexInstruments')
    // this.apiService.indexInstruments().subscribe((res) => {
    //   this.indexInstruments = res;
    //   this.lss.set('indexInstruments', res);      
    // });
  }

  ngOnChanges(){
  }

  navstockInfo(pesk: any, symbol: any, name: any) {
    this.lss.set('siPesk', pesk);
    this.lss.set('siSymbol', symbol);
    this.lss.set('siName', name);
    this.store.dispatch(UpdateMarketData({data:name}))
  }

  removeInstrument(item: any) {
    console.log(item)
    var oldIdxInstruments: any = this.lss.get('indexInstruments');
    var newIdxInstruments: any = [];
    oldIdxInstruments.forEach((ele: any) => {
      if(ele.name !== item.name){
        newIdxInstruments.push(ele)
      }
    });
    this.lss.set('indexInstruments', newIdxInstruments);
    this.indexInstruments = newIdxInstruments;
    // API links contains 'put'
  }

  keypress(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.symbol !== null && this.symbol !== '') {
      this.searchInstrument();
      event.preventDefault();
    }
  }

  searchAction = function (a: any, s: any) {
    var res = {
      action: a,
      searchString: s
    }

    return res;
  };

  searchInstrument() {
    const modalRef = this.modalService.open(InstrumentSearchComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    modalRef.componentInstance.instrumentCollection = this.searchAction('IWL', this.symbol);
    
    modalRef.result.then((selectedInstrument) => {
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