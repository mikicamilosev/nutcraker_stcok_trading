import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instrument-search',
  templateUrl: './instrument-search.component.html',
  styleUrls: ['./instrument-search.component.css']
})
export class InstrumentSearchComponent {
  constructor(private activeModal: NgbActiveModal){

  }

  cancel(){
    this.activeModal.dismiss();
  }
}
