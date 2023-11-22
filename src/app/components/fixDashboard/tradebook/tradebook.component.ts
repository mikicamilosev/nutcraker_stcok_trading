import { Component, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-tradebook',
  templateUrl: './tradebook.component.html',
  styleUrls: ['./tradebook.component.css']
})
export class TradebookComponent {
  @Input() updateDate: any;
  @Input() selAcc: any;
  tradesbook: any;
  isLoading: any;
  constructor(
    private apiService: NTVoyagerApiWtp
  ){
    this.selAcc = '';
    this.isLoading = true;
  }

  ngOnInit(){
    this.apiService.trades(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res: any) => {
        this.tradesbook = res;
        this.isLoading = false;
      }
    )
  }

  convertSide (orderSide: any) {
    switch (orderSide) {
        case "B":
            return "Buy";
        case "S":
            return "Sell";
        case "OL":
            return "Open Long";
        case "CL":
            return "Close Long";
        case "OS":
            return "Open Short";
        case "CS":
            return "Close Short";
        default:
            return orderSide;
    }
};
}
