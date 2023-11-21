import { Component } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-trading-account',
  templateUrl: './trading-account.component.html',
  styleUrls: ['./trading-account.component.css']
})
export class TradingAccountComponent {
  selectedTradingAccount: any;
  tradingAccounts: any;

  constructor(
    private apiService: NTVoyagerApiWtp
  ){}

  ngOnInit(){
    this.apiService.tradingAccounts().subscribe(
      (res) => {
        this.tradingAccounts = res;
      }
    )
  }

  handleTradingAccountChanged(){

  }
}
