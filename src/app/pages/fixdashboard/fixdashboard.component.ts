import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';

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

  constructor(
    private lss: LocalStorageService
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
