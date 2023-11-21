import { Component, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent {
  @Input() selAcc: any;
  positions: any;
  constructor(
    private apiService: NTVoyagerApiWtp
  ) {
    this.selAcc = ''
  }

  ngOnInit() {
    this.apiService.positions(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res) => {
        console.log(res)
        this.positions = res;
      }
    )
  }
}
