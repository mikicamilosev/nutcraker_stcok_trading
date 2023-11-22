import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-trading-account',
  templateUrl: './trading-account.component.html',
  styleUrls: ['./trading-account.component.css']
})
export class TradingAccountComponent {
  @Output() dataEvent = new EventEmitter<string>();
  selectedTradingAccount: any;
  tradingAccounts: any;

  constructor(
    private apiService: NTVoyagerApiWtp,
    private lss: LocalStorageService
  ){
  }
  
  
  ngOnInit(){
    this.apiService.tradingAccounts().subscribe(
      (res: any) => {
        this.tradingAccounts = res;
        var oldSelTradingAccount = this.lss.get('selTrdAcc');
        if(oldSelTradingAccount == null) {
          this.selectedTradingAccount = res[0]
        } else {
          this.selectedTradingAccount = oldSelTradingAccount
        }
      }
    )
  }

  handleTradingAccountChanged(){
    this.lss.set('selTrdAcc', this.selectedTradingAccount);
    this.dataEvent.emit(this.selectedTradingAccount);
  }
}
