import { Component, EventEmitter, Output } from '@angular/core';
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
    private apiService: NTVoyagerApiWtp
  ){}
  

  ngOnInit(){
    this.apiService.tradingAccounts().subscribe(
      (res: any) => {
        this.tradingAccounts = res;
        this.selectedTradingAccount = res[0]
      }
    )
  }

  handleTradingAccountChanged(){
    this.dataEvent.emit(this.selectedTradingAccount);
  }
}
