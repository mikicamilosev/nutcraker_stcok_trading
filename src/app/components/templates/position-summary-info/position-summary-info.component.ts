import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-position-summary-info',
  templateUrl: './position-summary-info.component.html',
  styleUrls: ['./position-summary-info.component.css']
})
export class PositionSummaryInfoComponent {
  @Input() posSumm: any;
  @Input() selAcc: any;
  @Output() dataEvent = new EventEmitter<boolean>();
  isCollapsed: any;

  constructor(
    private lss: LocalStorageService
  ){
    var isCollapse: any = this.lss.get('trdPosCollapse') as any;
    if(isCollapse == null ){
      this.isCollapsed = true;
    } else {
      this.isCollapsed = isCollapse
    }
  }

  handleClickCollapse () {
    this.isCollapsed = !this.isCollapsed;
    this.dataEvent.emit(this.isCollapsed)
    console.log(this.isCollapsed)
  }
}
