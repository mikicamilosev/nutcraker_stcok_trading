import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {
  

  constructor(
    private activeModal: NgbActiveModal
  ){

  }

  cancel() {
    this.activeModal.close()
  }
}
