import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.css']
})
export class MarketMoversComponent {
  @Input() exchange: any;
  @Input() moverType: any;
  marketMovers: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
  ) {
    // this.apiService.marketMovers('exchange', "moverType").subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.marketMovers = res;
    //   }
    // )
  }

  ngOnInit(){
    
  }

  ngOnChanges() {
    this.apiService.marketMovers(this.exchange, this.moverType).subscribe(
      (res) => {
        this.marketMovers = res;
      }
    )
  }
}
