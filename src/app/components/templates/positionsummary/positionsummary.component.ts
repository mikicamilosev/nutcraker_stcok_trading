import { Component, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-positionsummary',
  templateUrl: './positionsummary.component.html',
  styleUrls: ['./positionsummary.component.css']
})
export class PositionsummaryComponent {
  @Input() selTradeAcc: any;
  positionInfo: any;
  constructor(
    private apiService: NTVoyagerApiWtp
  ){

  }

  ngOnInit(){
    this.apiService.positionSummary(this.selTradeAcc?.accountNo || 'accountId').subscribe(
      (res) => {
        console.log(res)
        this.positionInfo = res;
      }
    )
  }

  ngOnChanges(){
  }
}
