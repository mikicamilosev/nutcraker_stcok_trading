import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {
  confirmOrDetail: any

  constructor(
    private activeModal: NgbActiveModal
  ){
    this.confirmOrDetail = true;
  }

  viewConfirmation(){
    this.confirmOrDetail = false;
  }

  viewOrderDetails(){
    this.confirmOrDetail = true;
  }

  cancel() {
    this.activeModal.close()
  }
}
