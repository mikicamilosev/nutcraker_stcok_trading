import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-rename-watchlist-name',
  templateUrl: './rename-watchlist-name.component.html',
  styleUrls: ['./rename-watchlist-name.component.css'],
})
export class RenameWatchlistNameComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private lss: LocalStorageService
  ) {}

  cancel() {
    this.activeModal.dismiss();
  }
}
