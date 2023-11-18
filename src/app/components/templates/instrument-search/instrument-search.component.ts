import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-instrument-search',
  templateUrl: './instrument-search.component.html',
  styleUrls: ['./instrument-search.component.css'],
})
export class InstrumentSearchComponent {
  instruments: any;
  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService
  ) {}

  ngOnInit() {
    this.instruments = this.lss.get('instruments');
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
