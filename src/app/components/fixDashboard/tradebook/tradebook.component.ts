import { Component, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-tradebook',
  templateUrl: './tradebook.component.html',
  styleUrls: ['./tradebook.component.css']
})
export class TradebookComponent {
  @Input() selAcc: any;
  tradesbook: any
  constructor(
    private apiService: NTVoyagerApiWtp
  ){
    this.selAcc = ''
  }

  ngOnInit(){
    this.apiService.trades(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res) => {
        this.tradesbook = res;
      }
    )
  }
}
