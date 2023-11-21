import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-instrument-search',
  templateUrl: './instrument-search.component.html',
  styleUrls: ['./instrument-search.component.css'],
})
export class InstrumentSearchComponent {
  instrumentCollection: any;
  indexInstruments: any;
  loading: any;
  action: any;

  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp,
    private store: Store
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.action = this.instrumentCollection.action;
    this.apiService.search(this.instrumentCollection.searchString).subscribe(
      (res) => {
        this.indexInstruments = res;
        console.log(res)
        this.loading = false;
      }
    )
  }

  doAction(action: any,symbolkey: any,symbol: any, name: any){
    if(this.action === 'WL'){
      var oldInstrumentsList: any = this.lss.get('instruments');
      oldInstrumentsList.push(this.wlInstrument(symbolkey, symbol, name));
      this.lss.set('instruments', oldInstrumentsList);
    } else if(this.action === 'IWL') {
      var oldIndexInstruments: any = this.lss.get('indexInstruments');
      oldIndexInstruments.push(this.idcInstrument(symbolkey, symbol, name));
      this.lss.set('indexInstruments', oldIndexInstruments);
    } else if(this.action === 'SI'){
      
    }
    this.cancel()
  }
  
  selectedInstrument(wlInstruments: any){
    return wlInstruments
  }

  cancel() {
    this.activeModal.dismiss();
  }

  wlInstrument(pesk: string, symbol: string, name: string) {
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

  idcInstrument(pesk: any, symbol: any, name: any) {
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
  
}