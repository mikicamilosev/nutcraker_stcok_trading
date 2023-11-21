import { Component, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.css']
})
export class OrderbookComponent {
  @Input() selAcc: any
  orderbook: any;
  openOrdersOnly: any;
  
  constructor(
    private apiService: NTVoyagerApiWtp
  ) {
    this.selAcc = '';
    this.openOrdersOnly = false;
  }

  ngOnInit(){
    this.apiService.orders(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res) => {
        this.orderbook = res;
      }
    )
  }

  handleOpenOrdersOnly() {
    this.openOrdersOnly = !this.openOrdersOnly
  }
}
