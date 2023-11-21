import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-position-summary-info',
  templateUrl: './position-summary-info.component.html',
  styleUrls: ['./position-summary-info.component.css']
})
export class PositionSummaryInfoComponent {
  @Input() selAcc: any;
  @Output() dataEvent = new EventEmitter<boolean>();
  isCollapsed: any;

  constructor(
  ){
    this.isCollapsed = false;
  }

  handleClickCollapse () {
    this.isCollapsed = !this.isCollapsed;
    this.dataEvent.emit(this.isCollapsed)
    console.log(this.isCollapsed)
  }
}
