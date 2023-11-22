import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { NewOrderComponent } from '../../templates/new-order/new-order.component';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent {
  @Input() updateDate: any;
  @Input() selAcc: any;
  positions: any;
  constructor(
    private apiService: NTVoyagerApiWtp,
    private modalService: NgbModal
  ) {
    this.selAcc = ''
  }

  ngOnInit() {
    this.apiService.positions(this.selAcc?.accountNo || 'accoundId').subscribe(
      (res) => {
        this.positions = res;
      }
    )
  }

  newOrderFromPos(item: any){
    const modalRef = this.modalService.open(NewOrderComponent, { backdrop: 'static', modalDialogClass: 'modal-lg' });
    // modalRef.componentInstance.instrumentCollection = data.items;
    
    modalRef.result.then((selectedInstrument) => {
      // tradableInstrument = selectedInstrument;
      // this.openOrderEntry(od, tradableInstrument);
      },
      (dismissReason) => {
        console.log('Modal dismissed:', dismissReason);
      }
    );
  }
}
