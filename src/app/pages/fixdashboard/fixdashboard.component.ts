import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-fixdashboard',
  templateUrl: './fixdashboard.component.html',
  styleUrls: ['./fixdashboard.component.css']
})
export class FixdashboardComponent {
  selAcc: any;
  isCollapse: any;
  tableType: any;
  selNav: string;
  updateDate: any;
  positionSummany: any;

  constructor(
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
  ){
    var oldSubNav: string = this.lss.get('trdSubNav') as any;
    if(oldSubNav == null){
      this.selNav = 'Orderbook'
    } else {
      this.selNav = oldSubNav;
    }

    var isCollapse: any = this.lss.get('trdPosCollapse') as any;
    if(isCollapse == null ){
      this.isCollapse = true;
    } else {
      this.isCollapse = isCollapse
    }
    this.updateDate = new Date()
    this.positionSummany = null;
  }

  ngOnInit(){
    this.apiService.positionSummary('test').subscribe(
      (res) => {
        this.positionSummany = res;
      }
    )
  }

  ngOnChanges(){
    var isCollapse: any = this.lss.get('trdPosCollapse') as any;
    if(isCollapse == null ){
      this.isCollapse = true;
    } else {
      this.isCollapse = isCollapse
    }
  }

  handleNavSelect(str: string) {
    this.selNav = str;
    this.lss.set('trdSubNav', str);
    this.updateDate = new Date();
  }

  receiveColllapse(data: boolean) {
    this.isCollapse = data;
    this.lss.set('trdPosCollapse', data);
  }

  receiveSelAcc(data: string) {
    this.selAcc = data;
  }
}
