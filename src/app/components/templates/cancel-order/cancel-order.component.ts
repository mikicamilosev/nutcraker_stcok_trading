import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent {

  constructor(
    private activeModal: NgbActiveModal
  ){

  }

  confirm() {
    this.cancel()
  }

  cancel() {
    this.activeModal.close()
  }
}
